import { useEffect, useRef } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';

// ===== Shaders =====
const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.z *= 10.0;

    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));

    if(uAlphaParticles < 0.5) {
      if(d > 0.5) discard;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

// ===== Helper =====
const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const int = parseInt(hex, 16);
  return [((int>>16)&255)/255, ((int>>8)&255)/255, (int&255)/255];
};

export default function Particles({
  particleCount = 260,
  particleSpread = 8,
  speed = 0.12,
  particleColors = ['#ffffff', '#a7b5ff', '#7dd3fc'],
  moveParticlesOnHover = false,
  particleHoverFactor = 0.6,
  alphaParticles = true,
  particleBaseSize = 95,
  sizeRandomness = 1,
  cameraDistance = 22,
  disableRotation = false,
  className = '',          // 👉 bạn sẽ truyền "fixed inset-0 z-0 pointer-events-none" từ ngoài
}) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ depth: false, alpha: true, antialias: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);
renderer.dpr = Math.min(2, window.devicePixelRatio || 1);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.perspective({ aspect: w / h });
    };
    window.addEventListener('resize', resize);
    resize();

    const onMove = (e) => {
      if (!moveParticlesOnHover) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseRef.current = { x, y };
    };
    if (moveParticlesOnHover) window.addEventListener('mousemove', onMove);

    const positions = new Float32Array(particleCount * 3);
    const randoms   = new Float32Array(particleCount * 4);
    const colors    = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      let x, y, z, len;
      do {
        x = Math.random()*2 - 1;
        y = Math.random()*2 - 1;
        z = Math.random()*2 - 1;
        len = x*x + y*y + z*z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x*r, y*r, z*r], i*3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i*4);

      const c = hexToRgb(particleColors[Math.floor(Math.random()*particleColors.length)]);
      colors.set(c, i*3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random:   { size: 4, data: randoms   },
      color:    { size: 3, data: colors    },
    });

    const program = new Program(gl, {
      vertex, fragment,
      uniforms: {
        uTime:           { value: 0 },
        uSpread:         { value: particleSpread },
        uBaseSize:       { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    });

    const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let raf, last = performance.now(), elapsed = 0;
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      const dt = t - last; last = t; elapsed += dt * speed;
      program.uniforms.uTime.value = elapsed * 0.001;

      if (moveParticlesOnHover) {
        mesh.position.x = -mouseRef.current.x * particleHoverFactor;
        mesh.position.y = -mouseRef.current.y * particleHoverFactor;
      } else {
        mesh.position.x = 0; mesh.position.y = 0;
      }
      if (!disableRotation) {
        mesh.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        mesh.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        mesh.rotation.z += 0.01 * speed;
      }
      renderer.render({ scene: mesh, camera });
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      if (moveParticlesOnHover) window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
    };
  }, [
    particleCount, particleSpread, speed,
    moveParticlesOnHover, particleHoverFactor,
    alphaParticles, particleBaseSize, sizeRandomness,
    cameraDistance, disableRotation
  ]);

  // ❗ Không thêm class mặc định gây ảnh hưởng layout
  return <div ref={containerRef} className={className} />;
}
