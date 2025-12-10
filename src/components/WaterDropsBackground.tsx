import { useEffect, useRef } from "react";

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
  const p5InstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let isMounted = true;

    // Dynamic import to avoid React instance conflicts
    import("p5").then((p5Module) => {
      if (!isMounted || !containerRef.current) return;
      
      const p5 = p5Module.default;

      const sketch = (p: InstanceType<typeof p5>) => {
        const drops: WaterDrop[] = [];
        const numDrops = 40;

        p.setup = () => {
          const canvas = p.createCanvas(
            containerRef.current?.offsetWidth || window.innerWidth,
            containerRef.current?.offsetHeight || window.innerHeight
          );
          canvas.style("display", "block");

          for (let i = 0; i < numDrops; i++) {
            drops.push(createDrop(p));
          }
        };

        const createDrop = (p: InstanceType<typeof p5>): WaterDrop => ({
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

            drop.wobble += drop.wobbleSpeed;
            drop.x += drop.speedX + Math.sin(drop.wobble) * 0.3;
            drop.y += drop.speedY;

            if (drop.y < -20 || drop.x < -20 || drop.x > p.width + 20) {
              drops[i] = {
                ...createDrop(p),
                y: p.height + 20,
                x: p.random(p.width),
              };
            }

            p.push();
            p.translate(drop.x, drop.y);

            p.noStroke();
            
            p.fill(135, 206, 250, drop.opacity * 0.3);
            p.ellipse(0, 0, drop.size * 1.8, drop.size * 2.2);
            
            p.fill(173, 216, 230, drop.opacity);
            p.ellipse(0, 0, drop.size, drop.size * 1.4);
            
            p.triangle(
              -drop.size * 0.4, -drop.size * 0.2,
              drop.size * 0.4, -drop.size * 0.2,
              0, -drop.size * 1.2
            );

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
    });

    return () => {
      isMounted = false;
      if (p5InstanceRef.current) {
        (p5InstanceRef.current as { remove: () => void }).remove();
      }
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
