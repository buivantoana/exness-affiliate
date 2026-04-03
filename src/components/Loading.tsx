import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const T = {
  navy: "#0a0f1e",
  navy2: "#111827",
  yellow: "#FFDE02",
  white: "#ffffff",
  dim: "rgba(255,255,255,.4)",
  border: "rgba(255,255,255,.07)",
};

// ─── SPINNER RING ─────────────────────────────────────────
export function SpinnerRing({ size = 56 }: { size?: number }) {
  return (
    <Box sx={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `${size > 32 ? 2 : 1.5}px solid rgba(255,222,2,.1)`,
          borderTopColor: T.yellow,
          animation: "spin .9s cubic-bezier(.6,.1,.4,.9) infinite",
          "@keyframes spin": { to: { transform: "rotate(360deg)" } },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: size > 32 ? 8 : 5,
          borderRadius: "50%",
          border: `${size > 32 ? 1.5 : 1}px solid rgba(255,222,2,.06)`,
          borderBottomColor: "rgba(255,222,2,.3)",
          animation: "spin-rev 1.4s cubic-bezier(.6,.1,.4,.9) infinite reverse",
          "@keyframes spin-rev": { to: { transform: "rotate(360deg)" } },
        }}
      />
    </Box>
  );
}

// ─── DOT PULSE ────────────────────────────────────────────
export function DotPulse() {
  return (
    <Stack direction="row" gap="6px" alignItems="center">
      {[0, 160, 320].map((delay) => (
        <Box
          key={delay}
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: T.yellow,
            animation: "dot-bounce 1.1s ease-in-out infinite",
            animationDelay: `${delay}ms`,
            "@keyframes dot-bounce": {
              "0%,80%,100%": { transform: "scale(.5)", opacity: 0.25 },
              "40%": { transform: "scale(1)", opacity: 1 },
            },
          }}
        />
      ))}
    </Stack>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────
export function ProgressBar({ width = 180 }: { width?: number }) {
  return (
    <Box
      sx={{
        width,
        height: 3,
        background: "rgba(255,255,255,.06)",
        borderRadius: "100px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          borderRadius: "100px",
          background: T.yellow,
          animation: "progress 2s ease-in-out infinite",
          "@keyframes progress": {
            "0%": { width: "0%", marginLeft: "0%" },
            "60%": { width: "70%" },
            "100%": { width: "5%", marginLeft: "100%" },
          },
        }}
      />
    </Box>
  );
}

// ─── SKELETON LINE ────────────────────────────────────────
function SkeletonLine({ w = "100%", h = 10 }: { w?: string | number; h?: number }) {
  return (
    <Box
      sx={{
        width: w,
        height: h,
        borderRadius: "6px",
        background: "rgba(255,255,255,.06)",
        animation: "shimmer 1.6s ease-in-out infinite",
        "@keyframes shimmer": {
          "0%,100%": { opacity: 0.4 },
          "50%": { opacity: 0.8 },
        },
      }}
    />
  );
}

// ─── SKELETON CARD ────────────────────────────────────────
export function SkeletonCard() {
  return (
    <Box
      sx={{
        background: T.navy2,
        border: `1px solid ${T.border}`,
        borderRadius: "12px",
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
        width: "100%",
      }}
    >
      <SkeletonLine w="55%" h={16} />
      <SkeletonLine w="80%" />
      <SkeletonLine />
      <SkeletonLine w="50%" />
      <Box
        sx={{
          width: 120,
          height: 36,
          borderRadius: "8px",
          background: "rgba(255,255,255,.06)",
          mt: 0.5,
          animation: "shimmer 1.6s ease-in-out infinite",
        }}
      />
    </Box>
  );
}

// ─── LOADING LABEL ────────────────────────────────────────
function LoadingLabel({ text }: { text: string }) {
  return (
    <Typography
      sx={{
        fontSize: 13,
        color: T.dim,
        fontFamily: "'Outfit',sans-serif",
        letterSpacing: ".3px",
        animation: "pulse-label 1.8s ease-in-out infinite",
        "@keyframes pulse-label": {
          "0%,100%": { opacity: 0.4 },
          "50%": { opacity: 0.75 },
        },
      }}
    >
      {text}
    </Typography>
  );
}

// ─── VARIANT 1: FULLSCREEN ────────────────────────────────
// dùng cho: Suspense fallback, trang đang load lần đầu
export function LoadingFullscreen() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        background: T.navy,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3.5,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-60%)",
          width: 400,
          height: 400,
          background: "radial-gradient(circle,rgba(255,222,2,.04) 0%,transparent 65%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Logo */}
      <Stack direction="row" alignItems="center" gap={1.25} sx={{ zIndex: 1 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            background: T.yellow,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 800,
            color: T.navy,
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          Ex
        </Box>
        <Typography
          sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 20, color: T.white }}
        >
          ExTradeFX
        </Typography>
      </Stack>

      {/* Spinner */}
      <SpinnerRing size={56} />

      {/* Dots + label */}
      <Stack alignItems="center" gap={1.25} sx={{ zIndex: 1 }}>
        <DotPulse />
        <LoadingLabel text={t("loading.label", "Loading…")} />
      </Stack>

      {/* Progress bar */}
      <ProgressBar width={180} />
    </Box>
  );
}

// ─── VARIANT 2: INLINE CENTERED ──────────────────────────
// dùng cho: lazy loaded section, data đang fetch
export function LoadingInline({
  size = 32,
  label,
}: {
  size?: number;
  label?: string;
}) {
  const { t } = useTranslation();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={1.5}
      sx={{ py: 6, width: "100%" }}
    >
      <SpinnerRing size={size} />
      {label !== undefined && (
        <LoadingLabel text={label || t("loading.label", "Loading…")} />
      )}
    </Stack>
  );
}

// ─── VARIANT 3: SKELETON PAGE ────────────────────────────
// dùng cho: CatchAllPage đang chờ /api/sub-paths
export function LoadingSkeleton() {
  return (
    <Box
      sx={{
        background: T.navy,
        minHeight: "100vh",
        py: 4,
        px: 3,
      }}
    >
      {/* Fake navbar */}
      <Box
        sx={{
          maxWidth: 960,
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 5,
        }}
      >
        <Box
          sx={{
            width: 120,
            height: 28,
            borderRadius: "6px",
            background: "rgba(255,222,2,.12)",
            animation: "shimmer 1.6s ease-in-out infinite",
            "@keyframes shimmer": { "0%,100%": { opacity: 0.4 }, "50%": { opacity: 0.8 } },
          }}
        />
        <Stack direction="row" gap={1}>
          {[80, 100].map((w) => (
            <Box
              key={w}
              sx={{
                width: w,
                height: 32,
                borderRadius: "8px",
                background: "rgba(255,255,255,.05)",
                animation: "shimmer 1.6s ease-in-out infinite",
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Fake hero */}
      <Box
        sx={{
          maxWidth: 960,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mb: 5,
        }}
      >
        <SkeletonLine w="40%" h={12} />
        <SkeletonLine w="65%" h={28} />
        <SkeletonLine w="55%" h={28} />
        <SkeletonLine w="70%" h={14} />
        <Stack direction="row" gap={1.5} mt={1}>
          <Box sx={{ width: 160, height: 48, borderRadius: "10px", background: "rgba(255,222,2,.12)", animation: "shimmer 1.6s ease-in-out infinite" }} />
          <Box sx={{ width: 140, height: 48, borderRadius: "10px", background: "rgba(255,255,255,.05)", animation: "shimmer 1.6s ease-in-out infinite" }} />
        </Stack>
      </Box>

      {/* Fake cards row */}
      <Box sx={{ maxWidth: 960, mx: "auto", display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3,1fr)" }, gap: 2 }}>
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </Box>
    </Box>
  );
}

// ─── DEFAULT EXPORT (dùng trong Suspense) ─────────────────
export default LoadingFullscreen;