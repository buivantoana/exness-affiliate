import { useEffect, useRef } from "react";

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Chip,
  Stack,
  Divider,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
} from "@mui/material";
import { useCountdown, useLiveCounter } from "../../hooks/useCountdown";
import { useLanguage } from "../../hooks/useLanguage";
import { useTranslation } from "react-i18next";
import { useLinks } from "../../hooks/useLinks";

// ─── LANGUAGE CONFIG ─────────────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "vi", label: "VI", name: "Tiếng Việt" },
  { code: "ar", label: "AR", name: "العربية" },
  { code: "ja", label: "JA", name: "日本語" },
  { code: "th", label: "TH", name: "ภาษาไทย" },
  { code: "zh", label: "ZH", name: "中文" },
  { code: "id", label: "ID", name: "Indonesia" },
];

// ─── THEME TOKENS ──────────────────────────────────────────────
const T = {
  navy: "#0a0f1e",
  navy2: "#111827",
  navy3: "#1f2937",
  navy4: "#374151",
  yellow: "#FFDE02",
  yellow2: "#FFE94D",
  yellow3: "rgba(255,222,2,.12)",
  green: "#1D9E75",
  green2: "#4ade80",
  blue: "#185FA5",
  blue2: "#93c5fd",
  amber: "#EF9F27",
  white: "#ffffff",
  dim: "rgba(255,255,255,.65)",
  dimmer: "rgba(255,255,255,.35)",
  border: "rgba(255,255,255,.08)",
};

// ─── HELPERS ──────────────────────────────────────────────────
const navTo = (path: string) => {
  window.location.href = path;
};

const TagChip = ({
  label,
  color,
}: {
  label: string;
  color: "green" | "yellow" | "blue";
}) => {
  const styles = {
    green: {
      bg: "rgba(29,158,117,.2)",
      text: "#4ade80",
      border: "rgba(29,158,117,.3)",
    },
    yellow: {
      bg: "rgba(255,222,2,.15)",
      text: T.yellow,
      border: "rgba(255,222,2,.25)",
    },
    blue: {
      bg: "rgba(24,95,165,.3)",
      text: "#93c5fd",
      border: "rgba(24,95,165,.4)",
    },
  };
  const s = styles[color];
  return (
    <Box
      component='span'
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.5,
        py: 0.5,
        borderRadius: "100px",
        fontSize: 11,
        fontWeight: 700,
        fontFamily: "'Outfit',sans-serif",
        letterSpacing: ".3px",
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
      }}>
      {label}
    </Box>
  );
};

// ─── TOPBAR ──────────────────────────────────────────────────
function TopBar() {
  const { t } = useLanguage();
  const { h, m, s } = useCountdown();
  const { navTo, isLoading /* registerLink, signInLink, ... */ } = useLinks();
  const numStyle = {
    background: T.navy,
    color: T.yellow,
    px: 0.8,
    py: 0.25,
    borderRadius: "4px",
    fontSize: 13,
    fontWeight: 800,
    fontFamily: "'Outfit',sans-serif",
    minWidth: 28,
    textAlign: "center",
  };
  return (
    <Box
      sx={{
        background: T.yellow,
        py: 1,
        px: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.25,
        flexWrap: "wrap",
      }}>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "'Outfit',sans-serif",
          color: T.navy,
        }}>
        {t("topbar.text")}
      </Typography>
      <Stack direction='row' alignItems='center' gap={0.75}>
        <Box sx={numStyle}>{h}</Box>
        <Typography sx={{ color: T.navy, fontWeight: 800 }}>:</Typography>
        <Box sx={numStyle}>{m}</Box>
        <Typography sx={{ color: T.navy, fontWeight: 800 }}>:</Typography>
        <Box sx={numStyle}>{s}</Box>
      </Stack>
      <Box
        onClick={() => navTo("register")}
        sx={{
          background: T.navy,
          color: T.yellow,
          px: 1.75,
          py: 0.5,
          borderRadius: "100px",
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "'Outfit',sans-serif",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}>
        {t("topbar.cta")}
      </Box>
    </Box>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────
function NavBar() {
  const { t, changeLanguage, currentLanguage } = useLanguage();
  const { navTo, isLoading /* registerLink, signInLink, ... */ } = useLinks();
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <Box
      component='nav'
      sx={{
        background: "rgba(10,15,30,.92)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${T.border}`,
        px: 3,
        height: 56,
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
      <Box
        sx={{
          maxWidth: 960,
          mx: "auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 2.5,
        }}>
        {/* Logo */}
        <Stack direction='row' alignItems='center' gap={1}>
          <Box
            sx={{
              background: T.yellow,
              color: T.navy,
              width: 30,
              height: 30,
              borderRadius: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 800,
              fontFamily: "'Outfit',sans-serif",
            }}>
            Ex
          </Box>
          <Typography
            sx={{
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: T.white,
            }}>
            ExTradeFX
          </Typography>
        </Stack>

        {/* Right side */}
        <Stack
          direction='row'
          alignItems='center'
          gap={1.25}
          sx={{ ml: "auto" }}>
          {/* Language selector */}
          <Select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            size='small'
            variant='outlined'
            sx={{
              fontSize: 12,
              color: T.dim,
              height: 30,
              minWidth: 80,
              fontFamily: "'Outfit',sans-serif",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
              "& .MuiSvgIcon-root": { color: T.dim },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,.3)",
              },
              "& .MuiSelect-select": {
                py: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: { background: T.navy2, border: `1px solid ${T.border}` },
              },
            }}>
            {LANGUAGES.map((lang) => (
              <MenuItem
                key={lang.code}
                value={lang.code}
                sx={{
                  fontSize: 12,
                  color: T.dim,
                  fontFamily: "'Outfit',sans-serif",
                  "&:hover": { background: "rgba(255,255,255,.06)" },
                }}>
                🌐 {lang.label}
              </MenuItem>
            ))}
          </Select>

          {!isMobile && (
            <Button
              onClick={() => navTo("register")}
              sx={{
                color: "rgba(255,255,255,.8)",
                border: "1.5px solid rgba(255,255,255,.2)",
                px: 2.5,
                py: 0.75,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "'Outfit',sans-serif",
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "rgba(255,255,255,.5)",
                  color: T.white,
                  background: "transparent",
                },
              }}>
              {t("nav1.signIn")}
            </Button>
          )}

          <Button
            onClick={() => navTo("register")}
            sx={{
              background: T.yellow,
              color: T.navy,
              px: isMobile ? 1.5 : 2.5,
              py: 0.75,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'Outfit',sans-serif",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": { background: T.yellow2 },
            }}>
            {t("nav1.openAccount")}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

// ─── LIVE STRIP ──────────────────────────────────────────────
function LiveStrip() {
  const { t } = useLanguage();
  const { viewers, openers } = useLiveCounter();
  return (
    <Box
      sx={{
        background: "rgba(29,158,117,.1)",
        borderBottom: "1px solid rgba(29,158,117,.2)",
        py: 1.125,
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}>
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: T.green2,
          flexShrink: 0,
          animation: "pulse 1.5s infinite",
          "@keyframes pulse": {
            "0%,100%": { opacity: 1, transform: "scale(1)" },
            "50%": { opacity: 0.5, transform: "scale(.8)" },
          },
        }}
      />
      <Typography
        sx={{
          fontSize: 12,
          color: T.green2,
          fontFamily: "'Outfit',sans-serif",
          fontWeight: 600,
        }}>
        <strong>{viewers}</strong>{" "}
        {t("live.text", { viewers: "", openers }).replace(/^\d+\s*/, "")}
      </Typography>
    </Box>
  );
}

// ─── HERO ────────────────────────────────────────────────────
function Hero() {
  const { t } = useLanguage();
  const isMobile = useMediaQuery("(max-width:640px)");
  const { navTo, isLoading /* registerLink, signInLink, ... */ } = useLinks();
  return (
    <Box
      sx={{
        py: { xs: 7, md: 9 },
        px: 3,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle,rgba(255,222,2,.06) 0%,transparent 65%)",
          pointerEvents: "none",
        },
      }}>
      <Box sx={{ maxWidth: 960, mx: "auto", textAlign: "center" }}>
        {/* Tags */}
        <Stack
          direction='row'
          justifyContent='center'
          gap={1}
          mb={2.75}
          flexWrap='wrap'
          sx={{
            animation: "fadeUp .6s ease forwards .05s",
            opacity: 0,
            "@keyframes fadeUp": {
              from: { opacity: 0, transform: "translateY(20px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}>
          <TagChip label={t("hero1.tag1")} color='green' />
          <TagChip label={t("hero1.tag2")} color='yellow' />
          <TagChip label={t("hero1.tag3")} color='blue' />
        </Stack>

        {/* H1 */}
        <Typography
          component='h1'
          sx={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 800,
            fontSize: { xs: 28, md: 52 },
            lineHeight: 1.15,
            mb: 2.5,
            animation: "fadeUp .6s ease forwards .12s",
            opacity: 0,
          }}>
          {t("hero1.title1")}
          <br />
          {t("hero1.title2")}{" "}
          <Box component='span' sx={{ color: T.yellow }}>
            {t("hero1.titleHighlight")}
          </Box>
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: { xs: 15, md: 18 },
            color: T.dim,
            maxWidth: 580,
            mx: "auto",
            mb: 4,
            lineHeight: 1.7,
            animation: "fadeUp .6s ease forwards .2s",
            opacity: 0,
          }}>
          {t("hero1.sub")}
        </Typography>

        {/* CTAs */}
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent='center'
          gap={1.5}
          mb={2}
          sx={{ animation: "fadeUp .6s ease forwards .28s", opacity: 0 }}>
          <Button
            onClick={() => navTo("register")}
            sx={{
              background: T.yellow,
              color: T.navy,
              fontSize: 16,
              px: 4.5,
              py: 2,
              fontWeight: 700,
              fontFamily: "'Outfit',sans-serif",
              textTransform: "none",
              borderRadius: "10px",
              "&:hover": {
                background: T.yellow2,
                transform: "translateY(-1px)",
              },
              transition: "all .2s",
            }}>
            {t("hero1.cta1")}
          </Button>
          <Button
            onClick={() => navTo("register")}
            sx={{
              color: "rgba(255,255,255,.8)",
              border: "1.5px solid rgba(255,255,255,.2)",
              fontSize: 16,
              px: 4.5,
              py: 2,
              fontWeight: 700,
              fontFamily: "'Outfit',sans-serif",
              textTransform: "none",
              borderRadius: "10px",
              "&:hover": {
                borderColor: "rgba(255,255,255,.5)",
                color: T.white,
              },
              transition: "all .2s",
            }}>
            {t("hero1.cta2")}
          </Button>
        </Stack>

        <Typography
          sx={{
            fontSize: 12,
            color: T.dimmer,
            fontFamily: "'Outfit',sans-serif",
            animation: "fadeUp .6s ease forwards .28s",
            opacity: 0,
          }}>
          {t("hero1.note")}
        </Typography>

        {/* Trust row */}
        <Stack
          direction='row'
          justifyContent='center'
          gap={0.75}
          mt={2.5}
          flexWrap='wrap'
          sx={{ animation: "fadeUp .6s ease forwards .28s", opacity: 0 }}>
          {(["trust1", "trust2", "trust3", "trust4"] as const).map((key, i) => (
            <Box
              key={key}
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography
                sx={{
                  fontSize: 11,
                  color: T.dim,
                  fontFamily: "'Outfit',sans-serif",
                }}>
                {t(`hero1.${key}`)}
              </Typography>
              {i < 3 && (
                <Box
                  sx={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: T.dimmer,
                  }}
                />
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// ─── METRICS STRIP ──────────────────────────────────────────
function MetricsStrip() {
  const { t } = useLanguage();
  const metrics = [
    {
      val: t("metrics.m1val"),
      lbl: t("metrics.m1lbl"),
      sub: t("metrics.m1sub"),
      green: false,
    },
    {
      val: t("metrics.m2val"),
      lbl: t("metrics.m2lbl"),
      sub: t("metrics.m2sub"),
      green: true,
    },
    {
      val: t("metrics.m3val"),
      lbl: t("metrics.m3lbl"),
      sub: t("metrics.m3sub"),
      green: false,
    },
    {
      val: t("metrics.m4val"),
      lbl: t("metrics.m4lbl"),
      sub: t("metrics.m4sub"),
      green: false,
    },
  ];
  return (
    <Box
      sx={{
        background: T.navy2,
        borderTop: `1px solid ${T.border}`,
        borderBottom: `1px solid ${T.border}`,
        py: 3.5,
        px: 3,
      }}>
      <Grid container sx={{ maxWidth: 960, mx: "auto" }}>
        {metrics.map((m, i) => (
          <Grid
            item
            xs={6}
            md={3}
            key={i}
            sx={{
              textAlign: "center",
              px: { xs: 0, md: 2.5 },
              py: { xs: 2, md: 0 },
              borderRight: { md: i < 3 ? `1px solid ${T.border}` : "none" },
            }}>
            <Typography
              sx={{
                fontSize: { xs: 24, md: 36 },
                fontWeight: 800,
                fontFamily: "'Outfit',sans-serif",
                color: m.green ? T.green2 : T.yellow,
                lineHeight: 1,
              }}>
              {m.val}
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                color: T.dim,
                mt: 0.75,
                fontFamily: "'Outfit',sans-serif",
              }}>
              {m.lbl}
            </Typography>
            <Typography sx={{ fontSize: 10, color: T.dimmer, mt: 0.25 }}>
              {m.sub}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ─── MARQUEE ────────────────────────────────────────────────
function Marquee() {
  const { t } = useLanguage();
  const items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"].map((k) =>
    t(`marquee.${k}`)
  );
  const doubled = [...items, ...items];
  return (
    <Box
      sx={{
        overflow: "hidden",
        py: 1.75,
        borderTop: `1px solid ${T.border}`,
        borderBottom: `1px solid ${T.border}`,
        background: "rgba(255,255,255,.02)",
      }}>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          width: "max-content",
          animation: "marquee 22s linear infinite",
          "@keyframes marquee": {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(-50%)" },
          },
        }}>
        {doubled.map((item, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "'Outfit',sans-serif",
              color: T.dim,
              whiteSpace: "nowrap",
            }}>
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "rgba(255,222,2,.4)",
                flexShrink: 0,
              }}
            />
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ─── WHY SECTION ────────────────────────────────────────────
function WhySection() {
  const { t } = useLanguage();
  const cards = [
    {
      icon: "⚡",
      iconBg: "rgba(255,222,2,.12)",
      titleKey: "c1title",
      textKey: "c1text",
      statKey: "c1stat",
      lblKey: "c1lbl",
    },
    {
      icon: "📊",
      iconBg: "rgba(29,158,117,.12)",
      titleKey: "c2title",
      textKey: "c2text",
      statKey: "c2stat",
      lblKey: "c2lbl",
    },
    {
      icon: "🛡",
      iconBg: "rgba(24,95,165,.15)",
      titleKey: "c3title",
      textKey: "c3text",
      statKey: "c3stat",
      lblKey: "c3lbl",
    },
    {
      icon: "💰",
      iconBg: "rgba(239,159,39,.12)",
      titleKey: "c4title",
      textKey: "c4text",
      statKey: "c4stat",
      lblKey: "c4lbl",
    },
    {
      icon: "🌐",
      iconBg: "rgba(74,222,128,.08)",
      titleKey: "c5title",
      textKey: "c5text",
      statKey: "c5stat",
      lblKey: "c5lbl",
    },
    {
      icon: "📱",
      iconBg: "rgba(255,222,2,.08)",
      titleKey: "c6title",
      textKey: "c6text",
      statKey: "c6stat",
      lblKey: "c6lbl",
    },
  ];

  return (
    <Box sx={{ py: 7.5, px: 3, background: T.navy2 }}>
      <Box sx={{ maxWidth: 960, mx: "auto" }}>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "'Outfit',sans-serif",
            color: T.yellow,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            mb: 1.25,
          }}>
          {t("why.eyebrow")}
        </Typography>
        <Typography
          component='h2'
          sx={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 800,
            fontSize: { xs: 20, md: 32 },
            mb: 5,
          }}>
          {t("why.title")}
        </Typography>
        <Grid container spacing={2}>
          {cards.map((c, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <AnimatedCard>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    mb: 1.75,
                    background: c.iconBg,
                  }}>
                  {c.icon}
                </Box>
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: "'Outfit',sans-serif",
                    color: T.white,
                    mb: 1,
                  }}>
                  {t(`why.${c.titleKey}`)}
                </Typography>
                <Typography
                  sx={{ fontSize: 13, color: T.dim, lineHeight: 1.7 }}>
                  {t(`why.${c.textKey}`)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 800,
                    fontFamily: "'Outfit',sans-serif",
                    color: T.yellow,
                    mt: 1.5,
                  }}>
                  {t(`why.${c.statKey}`)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 11,
                    color: T.dimmer,
                    fontFamily: "'Outfit',sans-serif",
                  }}>
                  {t(`why.${c.lblKey}`)}
                </Typography>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// ─── INSTRUMENTS ────────────────────────────────────────────
function InstrumentsSection() {
  const { t } = useLanguage();
  const { navTo, isLoading /* registerLink, signInLink, ... */ } = useLinks();
  const items = [
    { icon: "🥇", nameKey: "i1name", countKey: "i1count" },
    { icon: "💱", nameKey: "i2name", countKey: "i2count" },
    { icon: "📈", nameKey: "i3name", countKey: "i3count" },
    { icon: "🛢", nameKey: "i4name", countKey: "i4count" },
    { icon: "₿", nameKey: "i5name", countKey: "i5count" },
  ];
  return (
    <Box sx={{ py: 7.5, px: 3 }}>
      <Box sx={{ maxWidth: 960, mx: "auto" }}>
        <SectionHeader
          eyebrow={t("instruments1.eyebrow")}
          title={t("instruments1.title")}
          sub={t("instruments1.sub")}
        />
        <Grid container spacing={1.25} mt={0}>
          {items.map((item, i) => (
            <Grid item xs={4} sm={2.4} key={i}>
              <AnimatedCard
                onClick={() => navTo("register")}
                sx={{
                  textAlign: "center",
                  p: 2,
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "rgba(255,222,2,.3)",
                    background: "rgba(255,222,2,.05)",
                    transform: "translateY(-2px)",
                  },
                }}>
                <Typography sx={{ fontSize: 24, mb: 1 }}>
                  {item.icon}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'Outfit',sans-serif",
                    color: T.white,
                    mb: 0.375,
                  }}>
                  {t(`instruments1.${item.nameKey}`)}
                </Typography>
                <Typography sx={{ fontSize: 10, color: T.dimmer }}>
                  {t(`instruments1.${item.countKey}`)}
                </Typography>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// ─── ACCOUNTS ────────────────────────────────────────────────
function AccountsSection() {
  const { t } = useLanguage();
  const { navTo, isLoading /* registerLink, signInLink, ... */ } = useLinks();
  const accounts = [
    {
      badgeKey: "a1badge",
      nameKey: "a1name",
      descKey: "a1desc",
      deposit: "$10",
      spread: "0.3 pip",
      commColor: T.green2,
      featured: false,
    },
    {
      badgeKey: "a2badge",
      nameKey: "a2name",
      descKey: "a2desc",
      deposit: null,
      spread: "0.3 pip",
      commColor: T.green2,
      featured: true,
    },
    {
      badgeKey: "a3badge",
      nameKey: "a3name",
      descKey: "a3desc",
      deposit: "$200",
      spread: "0.1 pip",
      commColor: T.green2,
      featured: false,
    },
  ];
  return (
    <Box sx={{ py: 7.5, px: 3, background: T.navy2 }}>
      <Box sx={{ maxWidth: 960, mx: "auto" }}>
        <SectionHeader
          eyebrow={t("accounts1.eyebrow")}
          title={t("accounts1.title")}
          sub={t("accounts1.sub")}
        />
        <Grid container spacing={1.75} mt={0}>
          {accounts.map((acc, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <AnimatedCard
                sx={
                  acc.featured
                    ? {
                        background: "rgba(255,222,2,.06)",
                        borderColor: "rgba(255,222,2,.4)",
                        cursor: "pointer",
                      }
                    : { cursor: "pointer" }
                }>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "'Outfit',sans-serif",
                    color: T.yellow,
                    letterSpacing: ".5px",
                    mb: 1,
                    display: "block",
                  }}>
                  {t(`accounts1.${acc.badgeKey}`)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 800,
                    fontFamily: "'Outfit',sans-serif",
                    color: T.white,
                    mb: 0.75,
                  }}>
                  {t(`accounts1.${acc.nameKey}`)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: T.dim,
                    lineHeight: 1.6,
                    mb: 1.75,
                  }}>
                  {t(`accounts1.${acc.descKey}`)}
                </Typography>
                <Stack gap={0.625}>
                  {[
                    {
                      lbl: t("accounts1.specDeposit"),
                      val:
                        acc.deposit === null
                          ? t("accounts1.none")
                          : acc.deposit,
                      valColor: acc.deposit === null ? T.yellow : T.white,
                    },
                    {
                      lbl: t("accounts1.specSpread"),
                      val: acc.spread,
                      valColor: T.white,
                    },
                    {
                      lbl: t("accounts1.specComm"),
                      val: "$0",
                      valColor: acc.commColor,
                    },
                  ].map((spec, j) => (
                    <Box
                      key={j}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 11,
                        py: 0.5,
                        borderBottom: j < 2 ? `1px solid ${T.border}` : "none",
                      }}>
                      <Typography
                        sx={{
                          fontSize: 11,
                          color: T.dimmer,
                          fontFamily: "'Outfit',sans-serif",
                        }}>
                        {spec.lbl}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 11,
                          fontWeight: 600,
                          fontFamily: "'Outfit',sans-serif",
                          color: spec.valColor,
                        }}>
                        {spec.val}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: "center", mt: 2.5 }}>
          <Button
            onClick={() => navTo("register")}
            sx={{
              background: T.yellow,
              color: T.navy,
              fontSize: 16,
              px: 4.5,
              py: 2,
              fontWeight: 700,
              fontFamily: "'Outfit',sans-serif",
              textTransform: "none",
              borderRadius: "10px",
              "&:hover": { background: T.yellow2 },
            }}>
            {t("accounts1.openBtn")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// ─── STEPS ────────────────────────────────────────────────────
function StepsSection() {
  const { t } = useLanguage();
  const isMobile = useMediaQuery("(max-width:640px)");
  const { navTo, isLoading /* registerLink, signInLink, ... */ } = useLinks();
  const steps = [
    {
      num: "1",
      titleKey: "s1title",
      textKey: "s1text",
      ctaKey: "s1cta",
      hasCta: true,
    },
    { num: "2", titleKey: "s2title", textKey: "s2text", hasCta: false },
    { num: "3", titleKey: "s3title", textKey: "s3text", hasCta: false },
  ];
  return (
    <Box sx={{ py: 7.5, px: 3 }}>
      <Box sx={{ maxWidth: 960, mx: "auto" }}>
        <SectionHeader
          eyebrow={t("steps.eyebrow")}
          title={t("steps.title")}
          sub={t("steps.sub")}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
            gap: isMobile ? 3 : 0,
            mt: 5,
            position: "relative",
            "&::before": !isMobile
              ? {
                  content: '""',
                  mt: 2.5,
                  position: "absolute",
                  top: 28,
                  left: "16.5%",
                  right: "16.5%",
                  height: "2px",
                  background: `linear-gradient(90deg,${T.border},rgba(255,222,2,.3),${T.border})`,
                }
              : {},
          }}>
          {steps.map((step, i) => (
            <AnimatedCard
              key={i}
              sx={{
                textAlign: "center",
                background: "transparent",
                border: "none",
                px: 2.5,
                "&:hover": {
                  background: "transparent",
                  border: "none",
                  transform: "none",
                },
              }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: T.yellow3,
                  border: "2px solid rgba(255,222,2,.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 800,
                  fontFamily: "'Outfit',sans-serif",
                  color: T.yellow,
                  mx: "auto",
                  mb: 2,
                  position: "relative",
                  zIndex: 2,
                }}>
                {step.num}
              </Box>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  color: T.white,
                  mb: 1,
                }}>
                {t(`steps.${step.titleKey}`)}
              </Typography>
              <Typography sx={{ fontSize: 12, color: T.dim, lineHeight: 1.7 }}>
                {t(`steps.${step.textKey}`)}
              </Typography>
              {step.hasCta && (
                <Box mt={1.5}>
                  <Button
                    onClick={() => navTo("register")}
                    sx={{
                      background: T.yellow,
                      color: T.navy,
                      px: 2.5,
                      py: 1.25,
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "'Outfit',sans-serif",
                      textTransform: "none",
                      borderRadius: "8px",
                      "&:hover": { background: T.yellow2 },
                    }}>
                    {t(`steps.${step.ctaKey}`)}
                  </Button>
                </Box>
              )}
            </AnimatedCard>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────
function TestimonialsSection() {
  const { t } = useLanguage();
  const testimonialsData = [
    {
      textKey: "t1text",
      nameKey: "t1name",
      metaKey: "t1meta",
      initials: "AS",
      avatarBg: "rgba(24,95,165,.3)",
      avatarColor: T.blue2,
      stars: 5,
    },
    {
      textKey: "t2text",
      nameKey: "t2name",
      metaKey: "t2meta",
      initials: "KP",
      avatarBg: "rgba(29,158,117,.2)",
      avatarColor: T.green2,
      stars: 4,
    },
    {
      textKey: "t3text",
      nameKey: "t3name",
      metaKey: "t3meta",
      initials: "MR",
      avatarBg: "rgba(239,159,39,.2)",
      avatarColor: "#fbbf24",
      stars: 5,
    },
    {
      textKey: "t4text",
      nameKey: "t4name",
      metaKey: "t4meta",
      initials: "RP",
      avatarBg: "rgba(226,75,74,.2)",
      avatarColor: "#fca5a5",
      stars: 4.5,
    },
  ];
  const Star = ({ filled }: { filled: boolean }) => (
    <Box
      sx={{
        width: 11,
        height: 11,
        background: filled ? T.amber : "#555",
        clipPath:
          "polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
      }}
    />
  );
  return (
    <Box sx={{ py: 7.5, px: 3, background: T.navy2 }}>
      <Box sx={{ maxWidth: 960, mx: "auto" }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
          flexWrap='wrap'
          gap={1.5}
          mb={4.5}>
          <Box>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'Outfit',sans-serif",
                color: T.yellow,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                mb: 1.25,
              }}>
              {t("testimonials1.eyebrow")}
            </Typography>
            <Typography
              component='h2'
              sx={{
                fontFamily: "'Outfit',sans-serif",
                fontWeight: 800,
                fontSize: { xs: 20, md: 32 },
              }}>
              {t("testimonials1.title")}
            </Typography>
          </Box>
          <Stack direction='row' alignItems='center' gap={1}>
            <Stack direction='row' gap={0.25}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} filled />
              ))}
            </Stack>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 800,
                fontFamily: "'Outfit',sans-serif",
                color: T.yellow,
              }}>
              4.8
            </Typography>
            <Typography sx={{ fontSize: 12, color: T.dimmer }}>
              {t("testimonials1.reviews")}
            </Typography>
          </Stack>
        </Stack>
        <Grid container spacing={1.75}>
          {testimonialsData.map((t2, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <AnimatedCard sx={{ borderLeft: `3px solid ${T.yellow}` }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: T.dim,
                    lineHeight: 1.8,
                    fontStyle: "italic",
                    mb: 1.75,
                  }}>
                  {t(`testimonials1.${t2.textKey}`)}
                </Typography>
                <Stack direction='row' alignItems='center' gap={1.25}>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 800,
                      fontFamily: "'Outfit',sans-serif",
                      background: t2.avatarBg,
                      color: t2.avatarColor,
                      flexShrink: 0,
                    }}>
                    {t2.initials}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: "'Outfit',sans-serif",
                        color: T.white,
                      }}>
                      {t(`testimonials1.${t2.nameKey}`)}
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: T.dimmer }}>
                      {t(`testimonials1.${t2.metaKey}`)}
                    </Typography>
                  </Box>
                  <Stack direction='row' gap={0.25} sx={{ ml: "auto" }}>
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} filled={j < Math.floor(t2.stars)} />
                    ))}
                  </Stack>
                </Stack>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// ─── PLATFORMS ──────────────────────────────────────────────
function PlatformsSection() {
  const { t } = useLanguage();
  const platforms = [
    { icon: "🖥", nameKey: "p1name", descKey: "p1desc" },
    { icon: "📊", nameKey: "p2name", descKey: "p2desc" },
    { icon: "🌐", nameKey: "p3name", descKey: "p3desc" },
    { icon: "📱", nameKey: "p4name", descKey: "p4desc" },
  ];
  const badges = ["b1", "b2", "b3", "b4", "b5", "b6"];
  const badgeIcons = ["🏆", "🛡", "⚡", "💳", "🔒", "📱"];
  return (
    <Box sx={{ py: 7.5, px: 3 }}>
      <Box sx={{ maxWidth: 960, mx: "auto" }}>
        <SectionHeader
          eyebrow={t("platforms1.eyebrow")}
          title={t("platforms1.title")}
        />
        <Grid container spacing={1.5} mt={0}>
          {platforms.map((p, i) => (
            <Grid item xs={6} md={3} key={i}>
              <AnimatedCard sx={{ textAlign: "center", p: 2 }}>
                <Typography sx={{ fontSize: 28, mb: 1 }}>{p.icon}</Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'Outfit',sans-serif",
                    color: T.white,
                    mb: 0.375,
                  }}>
                  {t(`platforms1.${p.nameKey}`)}
                </Typography>
                <Typography sx={{ fontSize: 10, color: T.dimmer }}>
                  {t(`platforms1.${p.descKey}`)}
                </Typography>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
        <Stack
          direction='row'
          flexWrap='wrap'
          gap={1.25}
          mt={3.5}
          justifyContent='center'>
          {badges.map((b, i) => (
            <Stack
              key={b}
              direction='row'
              alignItems='center'
              gap={1}
              sx={{
                background: "rgba(255,255,255,.05)",
                border: `1px solid ${T.border}`,
                borderRadius: "8px",
                px: 2,
                py: 1.25,
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "'Outfit',sans-serif",
                color: T.white,
              }}>
              <Typography sx={{ fontSize: 16 }}>{badgeIcons[i]}</Typography>
              {t(`platforms1.${b}`)}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// ─── FINAL CTA ──────────────────────────────────────────────
function FinalCta() {
  const { t } = useLanguage();
  const isMobile = useMediaQuery("(max-width:640px)");
  const features = ["f1", "f2", "f3", "f4"];
  const { navTo, isLoading /* registerLink, signInLink, ... */ } = useLinks();
  return (
    <Box
      sx={{
        background: T.yellow3,
        borderTop: "1px solid rgba(255,222,2,.15)",
        borderBottom: "1px solid rgba(255,222,2,.15)",
        py: 7.5,
        px: 3,
        textAlign: "center",
      }}>
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <TagChip label={t("finalCta.tag")} color='yellow' />
        <Typography
          component='h2'
          sx={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 800,
            fontSize: { xs: 22, md: 38 },
            mt: 2.5,
            mb: 1.5,
          }}>
          {t("finalCta.title1")}{" "}
          <Box component='span' sx={{ color: T.yellow }}>
            {t("finalCta.titleHighlight")}
          </Box>{" "}
          {t("finalCta.title2")}
        </Typography>
        <Typography sx={{ fontSize: 15, color: T.dim, mb: 4 }}>
          {t("finalCta.sub")}
        </Typography>
        <Button
          onClick={() => navTo("register")}
          sx={{
            background: T.yellow,
            color: T.navy,
            fontSize: 18,
            px: 5.5,
            py: 2.25,
            fontWeight: 700,
            fontFamily: "'Outfit',sans-serif",
            textTransform: "none",
            borderRadius: "10px",
            "&:hover": { background: T.yellow2 },
          }}>
          {t("finalCta.btn")}
        </Button>
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent='center'
          gap={isMobile ? 1 : 2.5}
          mt={2.5}
          flexWrap='wrap'>
          {features.map((f) => (
            <Stack key={f} direction='row' alignItems='center' gap={0.625}>
              <Typography
                sx={{ color: T.green2, fontSize: 13, fontWeight: 700 }}>
                ✓
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  color: T.dim,
                  fontFamily: "'Outfit',sans-serif",
                }}>
                {t(`finalCta.${f}`)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// ─── DISCLAIMER ─────────────────────────────────────────────
function Disclaimer() {
  const { t } = useLanguage();
  return (
    <Box
      sx={{
        background: T.navy,
        py: 2.5,
        px: 3,
        borderTop: `1px solid ${T.border}`,
      }}>
      <Typography
        sx={{
          maxWidth: 960,
          mx: "auto",
          fontSize: 11,
          color: T.dimmer,
          lineHeight: 1.7,
        }}>
        <strong>Risk warning:</strong> {t("disclaimer1")}
      </Typography>
    </Box>
  );
}

// ─── STICKY BOTTOM MOBILE ──────────────────────────────────
function StickyBottom() {
  const { t } = useLanguage();
  const { navTo, isLoading /* registerLink, signInLink, ... */ } = useLinks();
  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(10,15,30,.98)",
        borderTop: `1px solid ${T.border}`,
        py: 1.5,
        px: 2.5,
        zIndex: 200,
        backdropFilter: "blur(10px)",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1.5,
      }}>
      <Box>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "'Outfit',sans-serif",
          }}>
          {t("sticky1.title")}
        </Typography>
        <Typography sx={{ fontSize: 10, color: T.dimmer }}>
          {t("sticky1.sub")}
        </Typography>
      </Box>
      <Button
        onClick={() => navTo("register")}
        sx={{
          background: T.yellow,
          color: T.navy,
          px: 2.5,
          py: 1.25,
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "'Outfit',sans-serif",
          textTransform: "none",
          borderRadius: "8px",
          "&:hover": { background: T.yellow2 },
          flexShrink: 0,
        }}>
        {t("sticky1.btn")}
      </Button>
    </Box>
  );
}

// ─── SHARED COMPONENTS ──────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <Box mb={4.5}>
      {eyebrow && (
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "'Outfit',sans-serif",
            color: T.yellow,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            mb: 1.25,
          }}>
          {eyebrow}
        </Typography>
      )}
      <Typography
        component='h2'
        sx={{
          fontFamily: "'Outfit',sans-serif",
          fontWeight: 800,
          fontSize: { xs: 20, md: 32 },
          mb: 1.75,
        }}>
        {title}
      </Typography>
      {sub && (
        <Typography
          sx={{ fontSize: 15, color: T.dim, maxWidth: 560, lineHeight: 1.8 }}>
          {sub}
        </Typography>
      )}
    </Box>
  );
}

function AnimatedCard({
  children,
  onClick,
  sx,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  sx?: object;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity .5s ease, transform .5s ease";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Box
      ref={ref}
      onClick={onClick}
      sx={{
        background: "rgba(255,255,255,.04)",
        border: `1px solid ${T.border}`,
        borderRadius: "14px",
        p: 3,
        transition: "border-color .3s, background .3s, transform .25s",
        "&:hover": { borderColor: "rgba(255,255,255,.2)" },
        height: "100%",
        ...sx,
      }}>
      {children}
    </Box>
  );
}

// ─── ROOT COMPONENT ─────────────────────────────────────────
export default function LandingPageView() {
  return (
    <Box
      sx={{
        background: T.navy,
        color: T.white,
        fontFamily: "'DM Sans',sans-serif",
        fontSize: 15,
        lineHeight: 1.7,
        minHeight: "100vh",
        pb: { xs: 9, sm: 0 },
      }}>
      <TopBar />
      <NavBar />
      <LiveStrip />
      <Hero />
      <MetricsStrip />
      <Marquee />
      <WhySection />
      <InstrumentsSection />
      <AccountsSection />
      <StepsSection />
      <TestimonialsSection />
      <PlatformsSection />
      <FinalCta />
      <Disclaimer />
      <StickyBottom />
    </Box>
  );
}
