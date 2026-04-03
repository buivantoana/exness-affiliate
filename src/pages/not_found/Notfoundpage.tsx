
import { Box, Typography, Button, Stack } from "@mui/material";
import { useLanguage } from "../../hooks/useLanguage";

const T = {
  navy: "#0a0f1e",
  yellow: "#FFDE02",
  yellow2: "#FFE94D",
  white: "#ffffff",
  dim: "rgba(255,255,255,.45)",
  dimmer: "rgba(255,255,255,.35)",
  border: "rgba(255,255,255,.15)",
};

const navTo = (path: string) => { window.location.href = path; };

export default function NotFoundPage() {
  const { t } = useLanguage();

  const quickLinks = [
    { labelKey: "notFound.quickLinks.trading", path: "/go/trading" },
    { labelKey: "notFound.quickLinks.accounts", path: "/go/register" },
    { labelKey: "notFound.quickLinks.platforms", path: "/go/platforms" },
    { labelKey: "notFound.quickLinks.support", path: "/go/livechat" },
  ];

  return (
    <Box
      sx={{
        background: T.navy,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 6,
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        gap: 0,
        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-60%)",
          width: 600,
          height: 600,
          background: "radial-gradient(circle,rgba(255,222,2,.045) 0%,transparent 65%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Logo */}
      <Stack direction="row" alignItems="center" gap={1} mb={1} sx={{ zIndex: 1 }}>
        <Box sx={{ width: 28, height: 28, background: T.yellow, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: T.navy, fontFamily: "'Outfit',sans-serif" }}>
          Ex
        </Box>
        <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 16, color: T.white }}>
          ExTradeFX
        </Typography>
      </Stack>

      {/* 404 big number */}
      <Typography
        sx={{
          fontSize: { xs: 96, md: 160 },
          fontWeight: 800,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(255,222,2,.2)",
          letterSpacing: "-4px",
          fontFamily: "'Outfit',sans-serif",
          userSelect: "none",
          position: "relative",
          zIndex: 1,
          "&::after": {
            content: '"404"',
            position: "absolute",
            inset: 0,
            color: T.yellow,
            opacity: 0.06,
            filter: "blur(18px)",
            WebkitTextStroke: "0",
          },
        }}
      >
        404
      </Typography>

      {/* Icon */}
      <Box
        sx={{
          width: 72,
          height: 72,
          background: "rgba(255,222,2,.08)",
          border: "1px solid rgba(255,222,2,.15)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
          mb: 3.5,
          zIndex: 1,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 6C10.477 6 6 10.477 6 16s4.477 10 10 10 10-4.477 10-10S21.523 6 16 6z" stroke={T.yellow} strokeWidth="1.5" strokeOpacity=".7" />
          <path d="M16 12v5" stroke={T.yellow} strokeWidth="2" strokeLinecap="round" strokeOpacity=".9" />
          <circle cx="16" cy="21" r="1.25" fill={T.yellow} fillOpacity=".9" />
        </svg>
      </Box>

      {/* Title + sub */}
      <Box sx={{ zIndex: 1, mb: 4 }}>
        <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: { xs: 20, md: 28 }, color: T.white, mb: 1.25 }}>
          {t("notFound.title")}
        </Typography>
        <Typography sx={{ fontSize: 14, color: T.dim, maxWidth: 340, mx: "auto", lineHeight: 1.7 }}>
          {t("notFound.sub")}
        </Typography>
      </Box>

      {/* Action buttons */}
      <Stack direction="row" gap={1.25} justifyContent="center" flexWrap="wrap" sx={{ zIndex: 1, mb: 3.5 }}>
        <Button
          onClick={() => navTo("/")}
          sx={{ background: T.yellow, color: T.navy, px: 3.5, py: 1.625, fontSize: 14, fontWeight: 700, fontFamily: "'Outfit',sans-serif", textTransform: "none", borderRadius: "10px", "&:hover": { background: T.yellow2, transform: "translateY(-1px)" }, transition: "all .2s" }}
        >
          {t("notFound.cta.home")}
        </Button>
        <Button
          onClick={() => navTo("/go/register")}
          sx={{ color: "rgba(255,255,255,.65)", border: `1.5px solid ${T.border}`, px: 3.5, py: 1.625, fontSize: 14, fontWeight: 600, fontFamily: "'Outfit',sans-serif", textTransform: "none", borderRadius: "10px", "&:hover": { borderColor: "rgba(255,255,255,.4)", color: T.white }, transition: "all .2s" }}
        >
          {t("notFound.cta.openAccount")}
        </Button>
      </Stack>

      {/* Quick links */}
      <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap" justifyContent="center" sx={{ zIndex: 1 }}>
        {quickLinks.map((link, i) => (
          <Box key={link.labelKey} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              onClick={() => navTo(link.path)}
              sx={{ fontSize: 12, color: "rgba(255,255,255,.35)", cursor: "pointer", transition: "color .2s", whiteSpace: "nowrap", "&:hover": { color: "rgba(255,255,255,.75)" } }}
            >
              {t(link.labelKey)}
            </Typography>
            {i < quickLinks.length - 1 && (
              <Box sx={{ width: 1, height: 16, background: "rgba(255,255,255,.1)" }} />
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}