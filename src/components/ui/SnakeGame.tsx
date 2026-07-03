"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GRID = 20;
const CELL = 16;
const TICK_MS = 110;
const CANVAS_SIZE = GRID * CELL;

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

function randomFood(snake: Point[]): Point {
  // Deterministic-enough placement without Math.random (blocked in this env):
  // walk the grid from a shifting offset until a free cell is found.
  const offset = (snake.length * 7 + snake[0].x * 3 + snake[0].y * 5) % (GRID * GRID);
  for (let i = 0; i < GRID * GRID; i += 1) {
    const index = (offset + i) % (GRID * GRID);
    const point = { x: index % GRID, y: Math.floor(index / GRID) };
    if (!snake.some((segment) => segment.x === point.x && segment.y === point.y)) {
      return point;
    }
  }
  return { x: 0, y: 0 };
}

const INITIAL_SNAKE: Point[] = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
  { x: 6, y: 10 },
];

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeRef = useRef<Point[]>(INITIAL_SNAKE);
  const directionRef = useRef<Direction>("right");
  const queuedRef = useRef<Direction | null>(null);
  const foodRef = useRef<Point>({ x: 14, y: 10 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [runId, setRunId] = useState(0);

  const reset = useCallback(() => {
    snakeRef.current = INITIAL_SNAKE.map((p) => ({ ...p }));
    directionRef.current = "right";
    queuedRef.current = null;
    foodRef.current = { x: 14, y: 10 };
    setScore(0);
    setIsGameOver(false);
    setRunId((id) => id + 1);
  }, []);

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
      context.fillStyle = "#090d12";
      context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // Grid dots.
      context.fillStyle = "rgba(0, 230, 138, 0.06)";
      for (let x = 0; x < GRID; x += 1) {
        for (let y = 0; y < GRID; y += 1) {
          context.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 1, 1);
        }
      }

      // Food.
      const food = foodRef.current;
      context.fillStyle = "#ffb703";
      context.fillRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6);

      // Snake.
      snakeRef.current.forEach((segment, index) => {
        const isHead = index === 0;
        context.fillStyle = isHead ? "#00e68a" : "rgba(0, 230, 138, 0.55)";
        context.fillRect(
          segment.x * CELL + 1,
          segment.y * CELL + 1,
          CELL - 2,
          CELL - 2,
        );
      });
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
        nextHead.x >= GRID ||
        nextHead.y >= GRID;
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
        foodRef.current = randomFood(nextSnake);
      } else {
        nextSnake.pop();
      }
      snakeRef.current = nextSnake;
      draw();
    };

    draw();
    const interval = setInterval(tick, TICK_MS);
    return () => clearInterval(interval);
  }, [isGameOver, runId]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between text-xs text-slate-400">
        <span>
          <span className="text-neon">score</span> {score}
        </span>
        <span className="text-slate-500">↑ ↓ ← → to move · Esc to close</span>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="rounded border border-neon/30 shadow-neon"
        />
        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded bg-hacker-bg/85 backdrop-blur-sm">
            <p className="text-lg font-bold text-neon text-glow">GAME OVER</p>
            <p className="text-xs text-slate-400">score: {score}</p>
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer rounded border border-neon px-4 py-2 text-xs font-bold text-neon transition-all hover:bg-neon hover:text-hacker-bg active:scale-95"
            >
              {"<Play_again/>"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
