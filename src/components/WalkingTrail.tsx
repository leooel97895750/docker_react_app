import React, { useEffect, useRef } from 'react';

// 定義 enum 建議放在外層
enum TrailIndex {
  PREVIOUS,
  CURRENT,
}

// 定義每個軌跡點的型別
interface Point {
  x: number;
  y: number;
}

// 定義 walker 物件型別
interface Walker {
  x: number;
  y: number;
  color: string;
  trail: Point[];
}

export default function WalkingTrailGame() {
  // 指定 canvasRef 是 HTMLCanvasElement 或 null
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // 防呆

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // 防呆

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const numWalkers = 5; // 幾個角色
    const trailLength = 2;
    const deviation = 0.8;
    const speed = 4;

    // 初始化 walkers，指定型別
    const walkers: Walker[] = [];

    for (let i = 0; i < numWalkers; i++) {
      const walker: Walker = {
        x: Math.random() * width,
        y: Math.random() * height,
        color: `hsl(${Math.random() * 360}, 80%, 50%)`,
        trail: [],
      };
      // 初始化 trail，先放第一個點
      walker.trail.push({ x: walker.x, y: walker.y });
      walkers.push(walker);
      console.log("create walker ! ", i);
    }

    function update() {
      walkers.forEach(walker => {
        // 記錄目前位置
        walker.trail.push({ x: walker.x, y: walker.y });
        if (walker.trail.length > trailLength) {
          walker.trail.shift();
        }

        const dx = walker.trail[TrailIndex.CURRENT].x - walker.trail[TrailIndex.PREVIOUS].x;
        const dy = walker.trail[TrailIndex.CURRENT].y - walker.trail[TrailIndex.PREVIOUS].y;
        let direction = {'dx': dx, 'dy': dy};
        console.log()
        direction = normalize(direction);

        // 偏移
        direction.dx += (Math.random() * 2 - 1) * deviation;
        direction.dy += (Math.random() * 2 - 1) * deviation;

        // 更新位置
        direction.dx *= speed;
        direction.dy *= speed;
        walker.x += direction.dx;
        walker.y += direction.dy;

        // 碰牆反彈
        if (walker.x < 0 || walker.x > width) walker.x += (direction.dx *= -2);
        if (walker.y < 0 || walker.y > height) walker.y += (direction.dy *= -2);
      });
    }

    function normalize(direction: {dx: number, dy: number}) {
      const length = Math.hypot(direction.dx, direction.dy);
      if (length !== 0) {
        direction.dx /= length;
        direction.dy /= length;
      }

      return {
        'dx': direction.dx, 
        'dy': direction.dy
      };
    }

    function draw() {
      walkers.forEach(walker => {
        // 防止 trail 長度不夠
        if (walker.trail.length < 2) return;
        if (!ctx) return; // 防呆

        ctx.beginPath();
        ctx.moveTo(walker.trail[TrailIndex.PREVIOUS].x, walker.trail[TrailIndex.PREVIOUS].y);
        ctx.lineTo(walker.trail[TrailIndex.CURRENT].x, walker.trail[TrailIndex.CURRENT].y);
        ctx.strokeStyle = walker.color;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }

    function loop() {
      update();
      draw();
      requestAnimationFrame(loop);
    }

    loop();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black" style={{ backgroundColor: 'black' }}>
      <canvas ref={canvasRef} className="border-2 border-white" />
    </div>
  );
}
