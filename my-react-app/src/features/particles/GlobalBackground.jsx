import Particles from '@/reactbits/Particles';

export default function GlobalBackground() {
  return (
    <>
      {/* gradient nền */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1200px 600px at 50% -200px, rgba(90,110,255,.10), transparent 60%), linear-gradient(180deg,#0B0F1A 0%, #0B1220 60%, #0B0F1A 100%)',
        }}
      />
      {/* particles */}
      <Particles
        className="fixed inset-0 z-0 pointer-events-none"
        particleCount={260}
        particleSpread={8}
        speed={0.12}
        particleColors={['#ffffff','#a7b5ff','#7dd3fc']}
        alphaParticles
        particleBaseSize={95}
        sizeRandomness={1}
        cameraDistance={22}
      />
    </>
  );
}
