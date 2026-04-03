import { useState, useEffect, useRef } from "react";

import { Box, Typography, Stack } from "@mui/material";
import { useLanguage } from "../../hooks/useLanguage";

// ─── THEME TOKENS ──────────────────────────────────────────
const T = {
  navy: "#0a0f1e",
  navy2: "#111827",
  navy3: "#1f2937",
  yellow: "#FFDE02",
  green: "#1D9E75",
  green2: "#4ade80",
  white: "#ffffff",
  dim: "rgba(255,255,255,.65)",
  dimmer: "rgba(255,255,255,.35)",
  dimmest: "rgba(255,255,255,.2)",
  border: "rgba(255,255,255,.08)",
  borderLight: "rgba(255,255,255,.1)",
};

type CheckState = "idle" | "checking" | "done";

// ─── SHIELD ICON ──────────────────────────────────────────
function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1L2 3.5V8c0 3.3 2.5 5.7 6 7 3.5-1.3 6-3.7 6-7V3.5L8 1z"
        fill={T.yellow}
        fillOpacity=".9"
      />
    </svg>
  );
}

// ─── CLOCK ICON ──────────────────────────────────────────
function ClockIcon({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke={color} strokeWidth="1.2" strokeOpacity=".7" />
      <path d="M6 3.5v3l2 1.2" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity=".7" />
    </svg>
  );
}

// ─── CHECK ICON ──────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
      <path
        d="M1.5 5L5 8.5L11.5 1.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── SMALL CHECK ICON ────────────────────────────────────
function SmallCheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M1.5 5L4 7.5L8.5 2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── SPINNER ────────────────────────────────────────────
function Spinner() {
  return (
    <Box
      sx={{
        width: 14,
        height: 14,
        border: `2px solid rgba(255,222,2,.25)`,
        borderTopColor: T.yellow,
        borderRadius: "50%",
        animation: "spin .7s linear infinite",
        "@keyframes spin": { to: { transform: "rotate(360deg)" } },
      }}
    />
  );
}

// ─── DOT PULSE ──────────────────────────────────────────
function DotPulse({ color }: { color: string }) {
  return (
    <Stack direction="row" gap="3px" alignItems="center">
      {[0, 200, 400].map((delay) => (
        <Box
          key={delay}
          sx={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: color,
            animation: "dotpulse 1.2s ease-in-out infinite",
            animationDelay: `${delay}ms`,
            "@keyframes dotpulse": {
              "0%,80%,100%": { transform: "scale(.5)", opacity: 0.3 },
              "40%": { transform: "scale(1)", opacity: 1 },
            },
          }}
        />
      ))}
    </Stack>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────
function ProgressBar({ progress, done }: { progress: number; done: boolean }) {
  return (
    <Box sx={{ height: 3, background: "rgba(255,255,255,.06)", borderRadius: "100px", overflow: "hidden" }}>
      <Box
        sx={{
          height: "100%",
          width: `${progress}%`,
          background: done ? T.green : T.yellow,
          borderRadius: "100px",
          transition: "width .05s linear, background .3s ease",
        }}
      />
    </Box>
  );
}

// ─── STATUS BAR ─────────────────────────────────────────
function StatusBar({ state }: { state: CheckState }) {
  const { t } = useLanguage();

  const styles = {
    idle: {
      bg: "rgba(255,255,255,.03)",
      border: "transparent",
      color: "rgba(255,255,255,.35)",
    },
    checking: {
      bg: "rgba(255,222,2,.07)",
      border: "rgba(255,222,2,.18)",
      color: "rgba(255,222,2,.8)",
    },
    done: {
      bg: "rgba(29,158,117,.08)",
      border: "rgba(29,158,117,.25)",
      color: T.green2,
    },
  };

  const s = styles[state];

  const labels = {
    idle: t("botcheck.status.idle"),
    checking: t("botcheck.status.checking"),
    done: t("botcheck.status.done"),
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{
        px: 1.75,
        py: 1.25,
        borderRadius: "8px",
        background: s.bg,
        border: `1px solid ${s.border}`,
        transition: "all .35s ease",
        minHeight: 38,
      }}
    >
      <Box sx={{ color: s.color, display: "flex", alignItems: "center", flexShrink: 0 }}>
        {state === "done" ? <SmallCheckIcon /> : <ClockIcon color={s.color} />}
      </Box>
      <Typography
        sx={{
          fontSize: 12,
          fontFamily: "'Outfit',sans-serif",
          color: s.color,
          flex: 1,
          transition: "color .35s",
        }}
      >
        {labels[state]}
      </Typography>
      {state === "checking" && <DotPulse color="rgba(255,222,2,.7)" />}
    </Stack>
  );
}

// ─── CHECKBOX ROW ────────────────────────────────────────
function CheckboxRow({
  state,
  subLabel,
  onClick,
}: {
  state: CheckState;
  subLabel: string;
  onClick: () => void;
}) {
  const { t } = useLanguage();

  const rowBorder = {
    idle: T.border,
    checking: "rgba(255,222,2,.3)",
    done: "rgba(29,158,117,.4)",
  }[state];

  const rowBg = {
    idle: "rgba(255,255,255,.03)",
    checking: "rgba(255,222,2,.04)",
    done: "rgba(29,158,117,.06)",
  }[state];

  const boxBg = state === "done" ? T.green : T.navy3;
  const boxBorder = state === "checking" ? T.yellow : "rgba(255,255,255,.25)";

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1.75}
      onClick={state === "idle" ? onClick : undefined}
      sx={{
        px: 2,
        py: 1.75,
        background: rowBg,
        border: `1px solid ${rowBorder}`,
        borderRadius: "8px",
        cursor: state === "idle" ? "pointer" : "default",
        transition: "border-color .2s, background .2s",
        "&:hover": state === "idle" ? { borderColor: "rgba(255,222,2,.3)", background: "rgba(255,222,2,.04)" } : {},
      }}
    >
      {/* Checkbox box */}
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: "4px",
          border: state === "done" ? "none" : `2px solid ${boxBorder}`,
          background: boxBg,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all .25s",
        }}
      >
        {state === "idle" && null}
        {state === "checking" && <Spinner />}
        {state === "done" && <CheckIcon />}
      </Box>

      {/* Label */}
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: T.white, fontFamily: "'Outfit',sans-serif", lineHeight: 1.3 }}>
          {t("botcheck.label")}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,.4)", mt: 0.25 }}>
          {subLabel}
        </Typography>
      </Box>

      {/* reCAPTCHA brand */}
      <Stack alignItems="center" gap="2px" flexShrink={0}>
        <Box
          sx={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "rgba(255,255,255,.05)",
            border: `1px solid rgba(255,255,255,.1)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke={T.yellow} strokeWidth="1.2" strokeOpacity=".5" />
            <path d="M7 4v3.5l2 1.2" stroke={T.yellow} strokeWidth="1.2" strokeLinecap="round" strokeOpacity=".5" />
          </svg>
        </Box>
        <Typography sx={{ fontSize: 8, color: "rgba(255,255,255,.25)", fontFamily: "'Outfit',sans-serif", letterSpacing: ".3px" }}>
          reCAPTCHA
        </Typography>
      </Stack>
    </Stack>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────
export default function BotCheckPage() {
  const { t } = useLanguage();
  const [checkState, setCheckState] = useState<CheckState>("idle");
  const [progress, setProgress] = useState(0);
  const [subLabel, setSubLabel] = useState("");
  const [redirectCount, setRedirectCount] = useState(3);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSubLabel(t("botcheck.sublabel.idle"));
  }, [t]);

  useEffect(() => {
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const handleCheck = () => {
    if (checkState !== "idle") return;
    setCheckState("checking");
    setSubLabel(t("botcheck.sublabel.checking1"));

    const msgs = [
      t("botcheck.sublabel.checking1"),
      t("botcheck.sublabel.checking2"),
      t("botcheck.sublabel.checking3"),
      t("botcheck.sublabel.checking4"),
    ];
    let mi = 0;
    const msgTimer = setInterval(() => {
      mi++;
      if (mi < msgs.length) setSubLabel(msgs[mi]);
      else clearInterval(msgTimer);
    }, 450);

    let prog = 0;
    progressRef.current = setInterval(() => {
      prog += Math.random() * 4 + 1;
      if (prog >= 100) {
        prog = 100;
        if (progressRef.current) clearInterval(progressRef.current);
      }
      setProgress(prog);
    }, 60);

    setTimeout(() => {
      if (progressRef.current) clearInterval(progressRef.current);
      setProgress(100);
      setCheckState("done");
      setSubLabel(t("botcheck.sublabel.done"));
      clearInterval(msgTimer);

      let n = 3;
      setRedirectCount(n);
      const countdown = setInterval(() => {
        n--;
        setRedirectCount(n);
        if (n <= 0) {
          clearInterval(countdown);
          // In production: window.location.href = botCheckRedirectUrl
          // from useLinks() hook
        }
      }, 1000);
    }, 2200);
  };

  return (
    <Box
      sx={{
        background: T.navy,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        gap: 4,
      }}
    >
      {/* Logo */}
      <Stack direction="row" alignItems="center" gap={1.25}>
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
        <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 20, color: T.white }}>
          ExTradeFX
        </Typography>
      </Stack>

      {/* Card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 380,
          background: T.navy2,
          border: `1px solid ${T.borderLight}`,
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Card header */}
        <Stack
          direction="row"
          alignItems="center"
          gap={1.25}
          sx={{
            background: T.navy3,
            borderBottom: `1px solid ${T.border}`,
            px: 2.5,
            py: 2,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              background: "rgba(255,222,2,.12)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ShieldIcon />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: T.white, fontFamily: "'Outfit',sans-serif" }}>
              {t("botcheck.title")}
            </Typography>
            <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,.4)", mt: 0.25 }}>
              {t("botcheck.subtitle")}
            </Typography>
          </Box>
        </Stack>

        {/* Card body */}
        <Stack gap={2.5} sx={{ px: 2.5, py: 3 }}>
          <ProgressBar progress={progress} done={checkState === "done"} />
          <CheckboxRow state={checkState} subLabel={subLabel} onClick={handleCheck} />
          <StatusBar state={checkState} />

          {/* Redirect countdown */}
          {checkState === "done" && (
            <Typography
              sx={{
                fontSize: 13,
                color: "rgba(255,255,255,.45)",
                textAlign: "center",
                fontFamily: "'Outfit',sans-serif",
                animation: "fadeIn .4s ease",
                "@keyframes fadeIn": { from: { opacity: 0, transform: "translateY(4px)" }, to: { opacity: 1 } },
              }}
            >
              {t("botcheck.redirect.prefix")}{" "}
              <Box component="span" sx={{ color: T.yellow, fontWeight: 700 }}>
                {redirectCount}s
              </Box>
              {t("botcheck.redirect.suffix")}
            </Typography>
          )}
        </Stack>

        {/* Card footer */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2.5, py: 1.5, borderTop: `1px solid ${T.border}` }}
        >
          <Stack direction="row" gap={1.5}>
            {(["privacy", "terms", "help"] as const).map((key) => (
              <Typography
                key={key}
                onClick={() => {}}
                sx={{
                  fontSize: 10,
                  color: "rgba(255,255,255,.3)",
                  cursor: "pointer",
                  "&:hover": { color: "rgba(255,255,255,.6)" },
                  transition: "color .2s",
                }}
              >
                {t(`botcheck.footer.${key}`)}
              </Typography>
            ))}
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 0.5L1 2.3V5.5c0 2 1.5 3.4 4 4.2 2.5-.8 4-2.2 4-4.2V2.3L5 0.5z" fill="rgba(255,255,255,.2)" />
            </svg>
            <Typography sx={{ fontSize: 10, color: "rgba(255,255,255,.25)", fontFamily: "'Outfit',sans-serif" }}>
              {t("botcheck.footer.brand")}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Page footer note */}
      <Typography
        sx={{
          fontSize: 11,
          color: "rgba(255,255,255,.2)",
          textAlign: "center",
          lineHeight: 1.7,
          maxWidth: 320,
          fontFamily: "'Outfit',sans-serif",
        }}
      >
        {t("botcheck.pageNote")}
      </Typography>
    </Box>
  );
}