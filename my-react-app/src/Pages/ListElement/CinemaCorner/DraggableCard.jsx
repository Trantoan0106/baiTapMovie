import * as React from "react";
import { motion, useMotionValue, useDragControls } from "framer-motion";

/**
 * DraggableCardBody:
 * - Dùng MotionValue cho x/y/rotate (khởi tạo theo style.* nếu có).
 * - Dùng dragControls để chủ động bắt đầu kéo, tránh bị anchor/overlay cản.
 */
export function DraggableCardBody({
  className = "",
  style = {},
  children,
  drag = true,
  dragElastic = 0.12,
  dragMomentum = true,
  // callback ngoài vẫn nhận được (bringToFront, vv.)
  onPointerDown,
  ...rest
}) {
  const mvX = useMotionValue(style.x ?? 0);
  const mvY = useMotionValue(style.y ?? 0);
  const mvR = useMotionValue(style.rotate ?? 0);

  const controls = useDragControls();

  React.useEffect(() => {
    if (typeof style.x === "number") mvX.set(style.x);
    if (typeof style.y === "number") mvY.set(style.y);
    if (typeof style.rotate === "number") mvR.set(style.rotate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style.x, style.y, style.rotate]);

  const handlePointerDown = (e) => {
    // Ngăn browser chọn chữ/drag ảnh
    e.preventDefault();
    // Bắt đầu kéo bằng controls, đảm bảo mọi bề mặt đều kéo được
    controls.start(e);
    onPointerDown?.(e);
  };

  return (
    <motion.div
      className={`draggable-card ${className}`}
      style={{
        x: mvX,
        y: mvY,
        rotate: mvR,
        zIndex: style.zIndex,
        userSelect: "none",
      }}
      drag={drag}
      dragElastic={dragElastic}
      dragMomentum={dragMomentum}
      dragControls={controls}
      dragListener={false}        // <— dùng controls thay vì listener mặc định
      onPointerDown={handlePointerDown}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default DraggableCardBody;
