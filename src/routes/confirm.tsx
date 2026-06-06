import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Phone, BookOpen } from "lucide-react";
import { HOTEL } from "@/data/menu";
import { useMemo, useEffect } from "react";
import { playSuccessChime } from "@/lib/sounds";

const search = z.object({
  name: z.union([z.string(), z.number()]).transform(String).optional(),
  room: z.union([z.string(), z.number()]).transform(String).optional(),
});

export const Route = createFileRoute("/confirm")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Order Sent — Baniya Hotel" },
      { name: "description", content: "Your order has been sent to reception." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmPage,
});

/* ─── Confetti pieces ─── */
const CONFETTI_COLORS = [
  "oklch(0.78 0.13 75)", // gold
  "oklch(0.41 0.135 25)", // crimson
  "oklch(0.985 0.018 85)", // cream white
  "oklch(0.55 0.16 145)", // green
  "oklch(0.72 0.18 60)", // warm orange
  "oklch(0.65 0.20 340)", // rose
];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: `${(i * 2.1 + (i % 7) * 1.3) % 100}%`,
        delay: `${(i * 0.07) % 2}s`,
        duration: `${1.8 + (i % 5) * 0.35}s`,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        width: `${5 + (i % 4) * 2.5}px`,
        height: i % 3 === 0 ? `${10 + (i % 3) * 3}px` : `${5 + (i % 4) * 2.5}px`,
        borderRadius: i % 3 === 2 ? "50%" : "2px",
        rotate: `${(i * 37) % 360}deg`,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: p.left,
            top: "-25px",
            width: p.width,
            height: p.height,
            borderRadius: p.borderRadius,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotate})`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated checkmark SVG ─── */
function CheckmarkCircle() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Pulsing rings */}
      <div
        className="absolute w-32 h-32 rounded-full animate-ring"
        style={{ background: "oklch(0.78 0.13 75 / 0.18)" }}
      />
      <div
        className="absolute w-32 h-32 rounded-full animate-ring"
        style={{
          background: "oklch(0.78 0.13 75 / 0.10)",
          animationDelay: "0.4s",
        }}
      />

      {/* Main circle */}
      <div
        className="relative w-28 h-28 rounded-full flex items-center justify-center animate-success-icon z-10 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, oklch(0.82 0.14 78) 0%, oklch(0.68 0.15 70) 100%)",
          boxShadow: "0 15px 40px oklch(0.78 0.13 75 / 0.5)",
        }}
      >
        {/* Checkmark */}
        <svg
          viewBox="0 0 52 52"
          className="w-14 h-14"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline
            points="12 26 22 36 40 17"
            stroke="oklch(0.20 0.08 25)"
            strokeWidth="4.5"
            strokeDasharray="45"
            strokeDashoffset="0"
            style={{
              animation: "dash-draw 0.5s ease 0.7s both",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

/* ─── Confirm Page ─── */
function ConfirmPage() {
  const { name, room } = Route.useSearch();

  useEffect(() => {
    playSuccessChime();
  }, []);

  return (
    <>
      <Confetti />

      <style>{`
        @keyframes dash-draw {
          from { stroke-dashoffset: 45; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, oklch(0.18 0.025 58) 0%, oklch(0.12 0.018 55) 100%)",
        }}
      >
        {/* Decorative background glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, oklch(0.78 0.13 75 / 0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-sm text-center">
          {/* Checkmark */}
          <div className="flex justify-center mb-8">
            <CheckmarkCircle />
          </div>

          {/* Text content — staggered fade up */}
          <h1
            className="font-display text-4xl font-bold text-white mb-3 animate-fade-up-1"
            style={{ color: "oklch(0.985 0.018 85)" }}
          >
            Order Sent! 🎉
          </h1>

          <p
            className="text-base leading-relaxed mb-2 animate-fade-up-2"
            style={{ color: "oklch(0.985 0.018 85 / 0.75)" }}
          >
            {name ? (
              <>
                Thank you,{" "}
                <span className="font-semibold" style={{ color: "oklch(0.82 0.14 78)" }}>
                  {name}
                </span>
                !
              </>
            ) : (
              "Thank you for your order!"
            )}
          </p>

          <p
            className="text-sm animate-fade-up-2"
            style={{ color: "oklch(0.985 0.018 85 / 0.65)" }}
          >
            {room ? `Room ${room} — ` : ""}
            Our kitchen has received your order. Reception will confirm shortly on WhatsApp.
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7 animate-fade-up-3">
            <div className="flex-1 h-px" style={{ background: "oklch(0.78 0.13 75 / 0.3)" }} />
            <span style={{ color: "oklch(0.78 0.13 75 / 0.6)" }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "oklch(0.78 0.13 75 / 0.3)" }} />
          </div>

          {/* Estimated time badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-7 text-sm font-medium animate-fade-up-3"
            style={{
              background: "oklch(0.78 0.13 75 / 0.15)",
              border: "1px solid oklch(0.78 0.13 75 / 0.3)",
              color: "oklch(0.82 0.14 78)",
            }}
          >
            ⏱ Estimated delivery: 20–30 mins
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 animate-fade-up-4">
            <a
              href={`tel:${HOTEL.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full py-4 font-semibold text-sm transition hover:brightness-110 active:scale-[0.98] shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.82 0.14 78) 0%, oklch(0.68 0.15 70) 100%)",
                color: "oklch(0.20 0.08 25)",
                boxShadow: "0 8px 28px oklch(0.78 0.13 75 / 0.4)",
              }}
            >
              <Phone className="h-4 w-4" />
              Call Reception
            </a>

            <Link
              to="/"
              search={room ? { room } : undefined}
              className="inline-flex items-center justify-center gap-2 rounded-full border py-4 font-semibold text-sm transition active:scale-[0.98]"
              style={{
                borderColor: "oklch(0.985 0.018 85 / 0.25)",
                background: "oklch(0.985 0.018 85 / 0.06)",
                color: "oklch(0.985 0.018 85 / 0.85)",
              }}
            >
              <BookOpen className="h-4 w-4" />
              Back to menu
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
