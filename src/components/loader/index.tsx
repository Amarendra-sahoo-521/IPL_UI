import { useEffect, useState } from "react";

const SIZES:any = { sm: 40, md: 64, lg: 96 };

const DEFAULT_MESSAGES = [
  "Setting the field...",
  "Fetching live scores...",
  "Loading squads & stats...",
  "Reviewing the DRS...",
  "Almost there...",
];

const Loader = ({
  size = "md", // "sm" | "md" | "lg"
  text, // fixed text; if omitted, cycles through `messages`
  messages = DEFAULT_MESSAGES,
  interval = 1800,
  fullScreen = false,
}:any) => {
  const px = SIZES[size] ?? SIZES.md;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (text || messages.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % messages.length),
      interval
    );
    return () => clearInterval(id);
  }, [text, messages, interval]);

  const label = text ?? messages[index];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-5 ${
        fullScreen
          ? "fixed inset-0 z-[9999] bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50"
          : "w-full py-12"
      }`}
    >
      <style>{`
        @keyframes ipl-bounce {
          0%, 100% { transform: translateY(0) scale(1, 1); animation-timing-function: cubic-bezier(.3,0,.7,1); }
          45%      { transform: translateY(-${px * 1.1}px) scale(.96, 1.04); animation-timing-function: cubic-bezier(.3,0,.7,1); }
          90%      { transform: translateY(0) scale(1.1, .9); }
        }
        @keyframes ipl-spin   { to { transform: rotate(360deg); } }
        @keyframes ipl-shadow {
          0%, 100% { transform: scaleX(1);  opacity: .45; }
          45%      { transform: scaleX(.45); opacity: .15; }
        }
        @keyframes ipl-ripple {
          0%   { transform: scale(.4); opacity: .6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes ipl-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        @keyframes ipl-fade {
          0%   { opacity: 0; transform: translateY(6px); }
          15%, 85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ipl-anim { animation: none !important; }
        }
      `}</style>

      {/* Ball + pitch */}
      <div
        className="relative flex items-end justify-center"
        style={{ width: px * 2.2, height: px * 2.4 }}
      >
        {/* ripple on impact */}
        <span
          className="ipl-anim absolute bottom-1 rounded-full border-2 border-orange-400/70"
          style={{
            width: px,
            height: px * 0.3,
            animation: "ipl-ripple 1.2s ease-out infinite",
          }}
        />

        {/* shadow */}
        <span
          className="ipl-anim absolute bottom-0 rounded-full bg-black/60 blur-[2px]"
          style={{
            width: px * 0.9,
            height: px * 0.16,
            animation: "ipl-shadow 1.2s infinite",
          }}
        />

        {/* bouncing ball */}
        <div
          className="ipl-anim relative mb-2"
          style={{
            width: px,
            height: px,
            animation: "ipl-bounce 1.2s infinite",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="ipl-anim h-full w-full drop-shadow-[0_6px_12px_rgba(220,38,38,.45)]"
            style={{ animation: "ipl-spin 1.2s linear infinite" }}
          >
            <defs>
              <radialGradient id="ipl-ball" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="55%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#ipl-ball)" />
            {/* seam */}
            <path
              d="M18 18 C 42 40, 42 60, 18 82"
              fill="none"
              stroke="#fde68a"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              strokeLinecap="round"
            />
            <path
              d="M82 18 C 58 40, 58 60, 82 82"
              fill="none"
              stroke="#fde68a"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              strokeLinecap="round"
            />
            <circle cx="35" cy="28" r="10" fill="white" opacity=".18" />
          </svg>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
        <span
          className="ipl-anim absolute inset-y-0 left-0 w-2/5 rounded-full bg-gradient-to-r from-indigo-500 via-orange-400 to-amber-300"
          style={{ animation: "ipl-bar 1.4s ease-in-out infinite" }}
        />
      </div>

      {/* Label */}
      <p
        key={label}
        className="ipl-anim text-sm font-semibold tracking-wide text-indigo-950"
        style={{
          animation: text ? "none" : `ipl-fade ${interval}ms ease-in-out`,
        }}
      >
        {label}
      </p>

      <span className="sr-only">Loading</span>
    </div>
  );
};

export default Loader;