import { useEffect, useRef } from "react";
import p5 from "p5";

interface WaterDrop {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

const WaterDropsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const drops: WaterDrop[] = [];
      const numDrops = 40;

      p.setup = () => {
        const canvas = p.createCanvas(
          containerRef.current?.offsetWidth || window.innerWidth,
          containerRef.current?.offsetHeight || window.innerHeight
        );
        canvas.style("display", "block");

        // Initialize water drops
        for (let i = 0; i < numDrops; i++) {
          drops.push(createDrop(p));
        }
      };

      const createDrop = (p: p5): WaterDrop => ({
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(4, 12),
        speedX: p.random(-0.5, 0.5),
        speedY: p.random(-1.5, -0.3),
        opacity: p.random(80, 180),
        wobble: p.random(p.TWO_PI),
        wobbleSpeed: p.random(0.02, 0.05),
      });

      p.draw = () => {
        p.clear();

        for (let i = 0; i < drops.length; i++) {
          const drop = drops[i];

          // Update position with wobble effect
          drop.wobble += drop.wobbleSpeed;
          drop.x += drop.speedX + Math.sin(drop.wobble) * 0.3;
          drop.y += drop.speedY;

          // Reset drop if it goes off screen
          if (drop.y < -20 || drop.x < -20 || drop.x > p.width + 20) {
            drops[i] = {
              ...createDrop(p),
              y: p.height + 20,
              x: p.random(p.width),
            };
          }

          // Draw water drop
          p.push();
          p.translate(drop.x, drop.y);

          // Main drop body with gradient effect
          p.noStroke();
          
          // Outer glow
          p.fill(135, 206, 250, drop.opacity * 0.3);
          p.ellipse(0, 0, drop.size * 1.8, drop.size * 2.2);
          
          // Main drop (teardrop shape using ellipse)
          p.fill(173, 216, 230, drop.opacity);
          p.ellipse(0, 0, drop.size, drop.size * 1.4);
          
          // Drop tail
          p.triangle(
            -drop.size * 0.4, -drop.size * 0.2,
            drop.size * 0.4, -drop.size * 0.2,
            0, -drop.size * 1.2
          );

          // Highlight
          p.fill(255, 255, 255, drop.opacity * 0.6);
          p.ellipse(-drop.size * 0.15, -drop.size * 0.1, drop.size * 0.3, drop.size * 0.4);

          p.pop();
        }
      };

      p.windowResized = () => {
        if (containerRef.current) {
          p.resizeCanvas(
            containerRef.current.offsetWidth,
            containerRef.current.offsetHeight
          );
        }
      };
    };

    p5InstanceRef.current = new p5(sketch, containerRef.current);

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default WaterDropsBackground;
