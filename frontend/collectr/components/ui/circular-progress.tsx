"use client";

import { Check } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  onChange?: (next: number) => void;
  size?: number;
  strokeWidth?: number; 
  className?: string;
  readOnly?: boolean;
};

export function CircularProgress({
  value,
  onChange,
  size = 24,
  strokeWidth = 3,
  className,
  readOnly,
}: Props) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  const completed = v >= 100;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - v / 100);

  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const setFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!ref.current || !onChange) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      angle = (angle + 90 + 360) % 360;
      const next = Math.max(0, Math.min(100, Math.round((angle / 360) * 100)));
      onChange(next);
    },
    [onChange]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (readOnly || !onChange) return;
      setDragging(true);
      (e.target as Element).setPointerCapture?.(e.pointerId);
      setFromPointer(e.clientX, e.clientY);
    },
    [readOnly, onChange, setFromPointer]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      setFromPointer(e.clientX, e.clientY);
    },
    [dragging, setFromPointer]
  );

  const onPointerUp = useCallback(() => setDragging(false), []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (readOnly || !onChange) return;
      let next = v;
      const step = e.shiftKey ? 10 : 1;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = Math.min(100, v + step);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = Math.max(0, v - step);
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = 100;
          break;
        case "PageUp":
          next = Math.min(100, v + 10);
          break;
        case "PageDown":
          next = Math.max(0, v - 10);
          break;
        default:
          return;
      }
      e.preventDefault();
      onChange(next);
    },
    [readOnly, onChange, v]
  );

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full select-none",
        className
      )}
      style={{ width: size, height: size }}
      role={onChange ? "slider" : undefined}
      aria-valuemin={onChange ? 0 : undefined}
      aria-valuemax={onChange ? 100 : undefined}
      aria-valuenow={onChange ? v : undefined}
      tabIndex={onChange && !readOnly ? 0 : -1}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="text-muted stroke-current"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          style={{ opacity: 0.4 }}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={cn(
            "stroke-current",
            completed ? "text-green-500 dark:text-green-400" : "text-primary"
          )}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {completed ? (
          <Check className="h-5 w-5 stroke-3 text-green-600 dark:text-green-400" />
        ) : (
          <span className="text-[10px] font-medium text-muted-foreground">{v}</span>
        )}
      </div>
    </div>
  );
}

export default CircularProgress;
