"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CELL = 16;
const TICK_MS = 110;

interface SnakeGameProps {
  onExit?: () => void;
}

interface Point {
  x: number;
  y: number;
}

type Direction = "up" | "down" | "left" | "right";

const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const DELTA: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

function initialSnake(): Point[] {
  return [
    { x: 5, y: 4 },
    { x: 4, y: 4 },
    { x: 3, y: 4 },
  ];
}

/** Snake game that fills its parent: the grid is derived from the measured
 * container size, so the terminal body itself becomes the play surface. */
export function SnakeGame({ onExit }: SnakeGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeRef = useRef<Point[]>(initialSnake());
  const directionRef = useRef<Direction>("right");
  const queuedRef = useRef<Direction | null>(null);
  const foodRef = useRef<Point>({ x: 12, y: 4 });
  const colsRef = useRef(20);
  const rowsRef = useRef(12);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [runId, setRunId] = useState(0);

  const placeFood = useCallback((snake: Point[]) => {
    const cols = colsRef.current;
    const rows = rowsRef.current;
    const total = cols * rows;
    const head = snake[0];
    const offset = (snake.length * 7 + head.x * 3 + head.y * 5) % total;
    for (let i = 0; i < total; i += 1) {
      const index = (offset + i) % total;
      const point = { x: index % cols, y: Math.floor(index / cols) };
      if (!snake.some((s) => s.x === point.x && s.y === point.y)) {
        return point;
      }
    }
    return { x: 0, y: 0 };
  }, []);

  const reset = useCallback(() => {
    snakeRef.current = initialSnake();
    directionRef.current = "right";
    queuedRef.current = null;
    foodRef.current = placeFood(snakeRef.current);
    setScore(0);
    setIsGameOver(false);
    setRunId((id) => id + 1);
  }, [placeFood]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const next = KEY_TO_DIRECTION[event.key];
      if (!next) {
        return;
      }
      event.preventDefault();
      const current = queuedRef.current ?? directionRef.current;
      if (next !== OPPOSITE[current]) {
        queuedRef.current = next;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Size the canvas to its container and recompute the grid on resize.
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }
    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = container.clientWidth;
      const height = container.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const context = canvas.getContext("2d");
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);
      colsRef.current = Math.max(8, Math.floor(width / CELL));
      rowsRef.current = Math.max(6, Math.floor(height / CELL));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isGameOver) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    const draw = () => {
      const cols = colsRef.current;
      const rows = rowsRef.current;
      const width = cols * CELL;
      const height = rows * CELL;

      context.fillStyle = "#090d12";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "rgba(0, 230, 138, 0.05)";
      for (let x = 0; x < cols; x += 1) {
        for (let y = 0; y < rows; y += 1) {
          context.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 1, 1);
        }
      }

      const food = foodRef.current;
      context.fillStyle = "#ffb703";
      context.fillRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6);

      snakeRef.current.forEach((segment, index) => {
        context.fillStyle = index === 0 ? "#00e68a" : "rgba(0, 230, 138, 0.5)";
        context.fillRect(
          segment.x * CELL + 1,
          segment.y * CELL + 1,
          CELL - 2,
          CELL - 2,
        );
      });

      // Void the area beyond the last full cell so nothing looks clipped.
      context.fillStyle = "#090d12";
      context.fillRect(width, 0, canvas.width - width, canvas.height);
      context.fillRect(0, height, canvas.width, canvas.height - height);
    };

    const tick = () => {
      const queued = queuedRef.current;
      if (queued) {
        directionRef.current = queued;
        queuedRef.current = null;
      }
      const delta = DELTA[directionRef.current];
      const head = snakeRef.current[0];
      const nextHead = { x: head.x + delta.x, y: head.y + delta.y };

      const hitWall =
        nextHead.x < 0 ||
        nextHead.y < 0 ||
        nextHead.x >= colsRef.current ||
        nextHead.y >= rowsRef.current;
      const hitSelf = snakeRef.current.some(
        (segment) => segment.x === nextHead.x && segment.y === nextHead.y,
      );
      if (hitWall || hitSelf) {
        setIsGameOver(true);
        return;
      }

      const ateFood =
        nextHead.x === foodRef.current.x && nextHead.y === foodRef.current.y;
      const nextSnake = [nextHead, ...snakeRef.current];
      if (ateFood) {
        setScore((value) => value + 1);
        foodRef.current = placeFood(nextSnake);
      } else {
        nextSnake.pop();
      }
      snakeRef.current = nextSnake;
      draw();
    };

    draw();
    const interval = setInterval(tick, TICK_MS);
    return () => clearInterval(interval);
  }, [isGameOver, runId, placeFood]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 py-2 text-xs">
        <span className="text-slate-400">
          <span className="text-neon">score</span> {score}
        </span>
        <span className="text-slate-500">↑ ↓ ← → move · Esc exit</span>
      </div>

      {isGameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-hacker-bg/85 backdrop-blur-sm">
          <p className="text-lg font-bold text-neon text-glow">GAME OVER</p>
          <p className="text-xs text-slate-400">score: {score}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer rounded border border-neon px-4 py-2 text-xs font-bold text-neon transition-all hover:bg-neon hover:text-hacker-bg active:scale-95"
            >
              {"<Play_again/>"}
            </button>
            {onExit && (
              <button
                type="button"
                onClick={onExit}
                className="cursor-pointer rounded border border-hacker-border px-4 py-2 text-xs font-bold text-slate-400 transition-all hover:border-neon/50 hover:text-neon active:scale-95"
              >
                {"<Exit/>"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
