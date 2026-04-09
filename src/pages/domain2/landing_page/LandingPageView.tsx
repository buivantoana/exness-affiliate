import { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Select,
  MenuItem,
  useMediaQuery,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLanguage } from "../../../hooks/useLanguage";
import { useLinks } from "../../../hooks/useLinks";

// ─── LANGUAGE CONFIG ──────────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "vi", label: "VI", name: "Tiếng Việt" },
  { code: "ar", label: "AR", name: "العربية" },
  { code: "ja", label: "JA", name: "日本語" },
  { code: "th", label: "TH", name: "ภาษาไทย" },
  { code: "zh", label: "ZH", name: "中文" },
  { code: "id", label: "ID", name: "Indonesia" },
];

// ─── THEME TOKENS ─────────────────────────────────────────────
// Exness palette: white page, dark navy hero/sections, green accent
const T = {
  white: "#ffffff",
  bg: "#f7f8fa",
  bgDark: "#0c1220",
  bgMid: "#111827",
  bgCard: "#1a2437",

  textPrimary: "#0d1117",
  textSecondary: "#4b5563",
  textLight: "rgba(255,255,255,.92)",
  textDim: "rgba(255,255,255,.58)",
  textDimmer: "rgba(255,255,255,.32)",

  green: "#06b96f",
  green2: "#04a663",
  greenBg: "rgba(6,185,111,.1)",
  greenBorder: "rgba(6,185,111,.28)",

  borderLight: "#e5e7eb",
  borderDark: "rgba(255,255,255,.09)",
};

// ─── CATEGORY CHIP STYLES ─────────────────────────────────────
const CAT_MAP: Record<string, { bg: string; text: string; border: string }> = {
  // EN
  Metals: { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
  Forex: { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  Crypto: { bg: "#f3e8ff", text: "#6b21a8", border: "#d8b4fe" },
  Indices: { bg: "#dcfce7", text: "#14532d", border: "#86efac" },
  Energy: { bg: "#ffedd5", text: "#9a3412", border: "#fdba74" },
  // VI
  "Kim loại": { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
  "Chỉ số": { bg: "#dcfce7", text: "#14532d", border: "#86efac" },
  "Năng lượng": { bg: "#ffedd5", text: "#9a3412", border: "#fdba74" },
  // AR
  معادن: { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
  فوركس: { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  كريبتو: { bg: "#f3e8ff", text: "#6b21a8", border: "#d8b4fe" },
  مؤشرات: { bg: "#dcfce7", text: "#14532d", border: "#86efac" },
  طاقة: { bg: "#ffedd5", text: "#9a3412", border: "#fdba74" },
  // JA
  貴金属: { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
  FX: { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  暗号通貨: { bg: "#f3e8ff", text: "#6b21a8", border: "#d8b4fe" },
  指数: { bg: "#dcfce7", text: "#14532d", border: "#86efac" },
  エネルギー: { bg: "#ffedd5", text: "#9a3412", border: "#fdba74" },
  // TH
  โลหะ: { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
  ฟอเร็กซ์: { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  คริปโต: { bg: "#f3e8ff", text: "#6b21a8", border: "#d8b4fe" },
  ดัชนี: { bg: "#dcfce7", text: "#14532d", border: "#86efac" },
  พลังงาน: { bg: "#ffedd5", text: "#9a3412", border: "#fdba74" },
  // ZH
  贵金属: { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
  外汇: { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  加密货币: { bg: "#f3e8ff", text: "#6b21a8", border: "#d8b4fe" },
  能源: { bg: "#ffedd5", text: "#9a3412", border: "#fdba74" },
  // ID
  Logam: { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
  Kripto: { bg: "#f3e8ff", text: "#6b21a8", border: "#d8b4fe" },
  Indeks: { bg: "#dcfce7", text: "#14532d", border: "#86efac" },
  Energi: { bg: "#ffedd5", text: "#9a3412", border: "#fdba74" },
};
function getCatStyle(cat: string) {
  return CAT_MAP[cat] ?? { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" };
}

// ─── FADE-UP ANIMATION (IntersectionObserver) ─────────────────
function FadeUp({
  children,
  delay = 0,
  sx,
}: {
  children: React.ReactNode;
  delay?: number;
  sx?: object;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(22px)";
    el.style.transition = `opacity .55s ease ${delay}s, transform .55s ease ${delay}s`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <Box ref={ref} sx={sx}>
      {children}
    </Box>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────
function Eyebrow({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <Typography
      sx={{
        display: "block",
        fontSize: 11,
        fontWeight: 700,
        fontFamily: "'Outfit',sans-serif",
        color: T.green,
        letterSpacing: "1.6px",
        textTransform: "uppercase",
        mb: 1.5,
      }}>
      {text}
    </Typography>
  );
}

function SectionTitle({
  text,
  dark = false,
}: {
  text: string;
  dark?: boolean;
}) {
  return (
    <Typography
      component='h2'
      sx={{
        fontFamily: "'Outfit',sans-serif",
        fontWeight: 800,
        fontSize: { xs: 22, md: 34 },
        lineHeight: 1.2,
        color: dark ? T.textLight : T.textPrimary,
        whiteSpace: "pre-line",
        mb: 1.5,
      }}>
      {text}
    </Typography>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────
function NavBar() {
  const { t, changeLanguage, currentLanguage } = useLanguage("domain2");
  const { navTo, isLoading /* registerLink, signInLink */ } = useLinks();
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <Box
      component='nav'
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: T.white,
        borderBottom: `1px solid ${T.borderLight}`,
        px: { xs: 2, md: 4 },
        height: 58,
        display: "flex",
        alignItems: "center",
        boxShadow: "0 1px 4px rgba(0,0,0,.06)",
      }}>
      <Box
        sx={{
          maxWidth: 1140,
          mx: "auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}>
        {/* Logo */}
        <Stack
          direction='row'
          alignItems='center'
          gap={0.75}
          sx={{ mr: "auto" }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "8px",
              background: T.bgDark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 800,
              fontFamily: "'Outfit',sans-serif",
              color: T.white,
            }}>
            Ex
          </Box>
          <Typography
            sx={{
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: T.bgDark,
              letterSpacing: "-.3px",
            }}>
            {t("nav.logo")}
          </Typography>
        </Stack>

        {/* Language select */}
        <Select
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          size='small'
          variant='outlined'
          sx={{
            fontSize: 12,
            color: T.textSecondary,
            height: 32,
            minWidth: 76,
            fontFamily: "'Outfit',sans-serif",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: T.borderLight,
            },
            "& .MuiSvgIcon-root": { color: T.textSecondary },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#9ca3af",
            },
            "& .MuiSelect-select": { py: 0.5 },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                background: T.white,
                border: `1px solid ${T.borderLight}`,
                boxShadow: "0 4px 16px rgba(0,0,0,.1)",
              },
            },
          }}>
          {LANGUAGES.map((lang) => (
            <MenuItem
              key={lang.code}
              value={lang.code}
              sx={{
                fontSize: 12,
                color: T.textPrimary,
                fontFamily: "'Outfit',sans-serif",
                "&:hover": { background: T.bg },
              }}>
              🌐 {lang.label}
            </MenuItem>
          ))}
        </Select>

        {!isMobile && (
          <Button
            onClick={() => navTo("register")}
            sx={{
              color: T.textPrimary,
              border: `1px solid ${T.borderLight}`,
              px: 2.5,
              py: 0.7,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'Outfit',sans-serif",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": { borderColor: "#9ca3af", background: T.bg },
            }}>
            {t("nav.signIn")}
          </Button>
        )}

        <Button
          onClick={() => navTo("register")}
          disabled={isLoading}
          sx={{
            background: T.bgDark,
            color: T.white,
            px: isMobile ? 1.75 : 2.5,
            py: 0.7,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "'Outfit',sans-serif",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": { background: "#1a2d4a" },
          }}>
          {t("nav.register")}
        </Button>
      </Box>
    </Box>
  );
}

// ─── HERO (dark navy bg) ──────────────────────────────────────
function Hero() {
  const { t } = useLanguage("domain2");
  const { navTo, isLoading /* registerLink, signInLink */ } = useLinks();
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <Box sx={{ background: T.bgDark, overflow: "hidden" }}>
      <Box sx={{ maxWidth: 1140, mx: "auto", px: { xs: 2, md: 4 } }}>
        {/* Main hero */}
        <Box
          sx={{
            textAlign: "center",
            pt: { xs: 8, md: 10 },
            pb: { xs: 5, md: 7 },
          }}>
          {/* H1 */}
          <Typography
            component='h1'
            sx={{
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 800,
              fontSize: { xs: 36, md: 58 },
              lineHeight: 1.1,
              color: T.textLight,
              letterSpacing: "-.5px",
              mb: 2.5,
              animation: "hFade .6s ease forwards",
              "@keyframes hFade": {
                from: { opacity: 0, transform: "translateY(18px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}>
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              fontSize: { xs: 15, md: 18 },
              color: T.textDim,
              maxWidth: 500,
              mx: "auto",
              lineHeight: 1.7,
              mb: 4,
              animation: "hFade .6s ease forwards .1s",
              opacity: 0,
            }}>
            {t("hero.subtitle")}
          </Typography>

          {/* CTA row */}
          <Stack
            direction={isMobile ? "column" : "row"}
            justifyContent='center'
            gap={1.5}
            mb={3.5}
            sx={{ animation: "hFade .6s ease forwards .18s", opacity: 0 }}>
            <Button
              onClick={() => navTo("register")}
              disabled={isLoading}
              sx={{
                background: T.green,
                color: T.white,
                fontSize: 15,
                px: 4.5,
                py: 1.75,
                fontWeight: 700,
                fontFamily: "'Outfit',sans-serif",
                textTransform: "none",
                borderRadius: "10px",
                "&:hover": {
                  background: T.green2,
                  transform: "translateY(-1px)",
                },
                transition: "all .2s",
              }}>
              {t("hero.cta1")}
            </Button>
            <Button
              onClick={() => navTo("register")}
              sx={{
                color: T.textDim,
                border: "1.5px solid rgba(255,255,255,.18)",
                fontSize: 15,
                px: 4.5,
                py: 1.75,
                fontWeight: 600,
                fontFamily: "'Outfit',sans-serif",
                textTransform: "none",
                borderRadius: "10px",
                "&:hover": {
                  borderColor: "rgba(255,255,255,.45)",
                  color: T.textLight,
                },
                transition: "all .2s",
              }}>
              {t("hero.cta2")}
            </Button>
          </Stack>

          {/* Badges */}
          <Stack
            direction='row'
            justifyContent='center'
            flexWrap='wrap'
            gap={1}
            sx={{ animation: "hFade .6s ease forwards .26s", opacity: 0 }}>
            {(["badge1", "badge2", "badge3", "badge4"] as const).map((b) => (
              <Stack
                key={b}
                direction='row'
                alignItems='center'
                gap={0.75}
                sx={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "100px",
                  px: 1.75,
                  py: 0.6,
                }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: T.green,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'Outfit',sans-serif",
                    color: "rgba(255,255,255,.75)",
                    whiteSpace: "nowrap",
                  }}>
                  {t(`hero.${b}`)}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Platform strip – white bg at bottom of hero */}
      <Box
        sx={{
          background: T.white,
          borderTop: `1px solid ${T.borderLight}`,
          py: 2,
          px: { xs: 2, md: 4 },
        }}>
        <Stack
          direction='row'
          justifyContent='center'
          flexWrap='wrap'
          gap={{ xs: 2.5, md: 5 }}
          sx={{ maxWidth: 1140, mx: "auto" }}>
          {(["mt4", "mt5", "web", "mobile", "social"] as const).map((p) => (
            <Typography
              key={p}
              sx={{
                fontSize: 12,
                color: T.textSecondary,
                fontFamily: "'Outfit',sans-serif",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}>
              {t(`platform.${p}`)}
            </Typography>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// ─── GOLD & OIL (white bg) ────────────────────────────────────
function GoldOilSection() {
  const { t } = useLanguage("domain2");
  const { navTo, isLoading /* registerLink */ } = useLinks();

  const features = [
    { key: "f1", icon: "📉" },
    { key: "f2", icon: "🎧" },
    { key: "f3", icon: "⚡" },
    { key: "f4", icon: "🎁" },
    { key: "f5", icon: "📊" },
  ] as const;

  return (
    <Box
      sx={{ background: T.white, py: { xs: 7, md: 9 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <FadeUp>
          <Eyebrow text={t("goldoil.eyebrow")} />
          <Typography
            sx={{ fontSize: 14, color: T.textSecondary, mb: 5, maxWidth: 520 }}>
            {t("goldoil.subtitle")}
          </Typography>
        </FadeUp>

        <Grid container spacing={2}>
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={i < 3 ? 4 : 6} key={f.key}>
              <FadeUp delay={i * 0.07}>
                <Box
                  sx={{
                    border: `1px solid ${T.borderLight}`,
                    borderRadius: "14px",
                    p: 3,
                    height: "100%",
                    transition: "box-shadow .25s, border-color .25s",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(0,0,0,.07)",
                      borderColor: T.green,
                    },
                  }}>
                  <Typography sx={{ fontSize: 28, mb: 1.5 }}>
                    {f.icon}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: "'Outfit',sans-serif",
                      color: T.textPrimary,
                      mb: 0.75,
                    }}>
                    {t(`goldoil.${f.key}.title`)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: T.textSecondary,
                      lineHeight: 1.7,
                    }}>
                    {t(`goldoil.${f.key}.text`)}
                  </Typography>
                </Box>
              </FadeUp>
            </Grid>
          ))}
        </Grid>

        <FadeUp delay={0.35}>
          <Box sx={{ mt: 4 }}>
            <Button
              onClick={() => navTo("register")}
              disabled={isLoading}
              sx={{
                background: T.bgDark,
                color: T.white,
                px: 4,
                py: 1.5,
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Outfit',sans-serif",
                textTransform: "none",
                borderRadius: "9px",
                "&:hover": { background: "#1a2d4a" },
              }}>
              {t("goldoil.cta")}
            </Button>
          </Box>
        </FadeUp>
      </Box>
    </Box>
  );
}

// ─── MARKETS TABLE (light grey bg) ───────────────────────────
function MarketsSection() {
  const { t } = useLanguage("domain2");
  const { navTo, isLoading /* registerLink */ } = useLinks();

  const rows = ["r1", "r2", "r3", "r4", "r5"] as const;

  return (
    <Box sx={{ background: T.bg, py: { xs: 7, md: 9 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <FadeUp>
          <Eyebrow text={t("markets.eyebrow")} />
          <Typography
            sx={{ fontSize: 14, color: T.textSecondary, mb: 4, maxWidth: 520 }}>
            {t("markets.subtitle")}
          </Typography>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Box
            sx={{
              background: T.white,
              border: `1px solid ${T.borderLight}`,
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,.05)",
            }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: T.bg }}>
                  {(
                    [
                      "col.symbol",
                      "col.category",
                      "col.spread",
                      "col.action",
                    ] as const
                  ).map((c) => (
                    <TableCell
                      key={c}
                      sx={{
                        color: T.textSecondary,
                        fontSize: 11,
                        fontWeight: 700,
                        fontFamily: "'Outfit',sans-serif",
                        letterSpacing: ".8px",
                        textTransform: "uppercase",
                        borderBottom: `1px solid ${T.borderLight}`,
                        py: 1.5,
                      }}>
                      {t(`markets.${c}`)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((r, i) => {
                  const cat = t(`markets.${r}.cat`);
                  const cs = getCatStyle(cat);
                  return (
                    <TableRow
                      key={r}
                      sx={{
                        "&:hover": { background: T.bg },
                        borderBottom:
                          i < 4 ? `1px solid ${T.borderLight}` : "none",
                      }}>
                      <TableCell
                        sx={{
                          color: T.textPrimary,
                          fontSize: 14,
                          fontWeight: 700,
                          fontFamily: "'Outfit',sans-serif",
                          border: "none",
                          py: 2,
                        }}>
                        {t(`markets.${r}.name`)}
                      </TableCell>
                      <TableCell sx={{ border: "none", py: 2 }}>
                        <Box
                          sx={{
                            display: "inline-block",
                            px: 1.25,
                            py: 0.3,
                            borderRadius: "6px",
                            fontSize: 11,
                            fontWeight: 700,
                            fontFamily: "'Outfit',sans-serif",
                            background: cs.bg,
                            color: cs.text,
                            border: `1px solid ${cs.border}`,
                          }}>
                          {cat}
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          color: T.green,
                          fontSize: 14,
                          fontWeight: 700,
                          fontFamily: "'Outfit',sans-serif",
                          border: "none",
                          py: 2,
                        }}>
                        {t(`markets.${r}.spread`)}
                      </TableCell>
                      <TableCell sx={{ border: "none", py: 2 }}>
                        <Button
                          onClick={() => navTo("register")}
                          disabled={isLoading}
                          size='small'
                          sx={{
                            background: T.greenBg,
                            color: T.green,
                            border: `1px solid ${T.greenBorder}`,
                            px: 2,
                            py: 0.5,
                            fontSize: 12,
                            fontWeight: 700,
                            fontFamily: "'Outfit',sans-serif",
                            textTransform: "none",
                            borderRadius: "7px",
                            "&:hover": { background: "rgba(6,185,111,.18)" },
                          }}>
                          {t("markets.trade")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </FadeUp>

        <FadeUp delay={0.2}>
          <Stack direction='row' gap={2} mt={3} flexWrap='wrap'>
            <Button
              onClick={() => navTo("register")}
              disabled={isLoading}
              sx={{
                background: T.green,
                color: T.white,
                px: 3.5,
                py: 1.25,
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Outfit',sans-serif",
                textTransform: "none",
                borderRadius: "9px",
                "&:hover": { background: T.green2 },
              }}>
              {t("markets.cta1")}
            </Button>
            <Button
              onClick={() => navTo("register")}
              sx={{
                color: T.textPrimary,
                border: `1px solid ${T.borderLight}`,
                px: 3.5,
                py: 1.25,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'Outfit',sans-serif",
                textTransform: "none",
                borderRadius: "9px",
                "&:hover": { borderColor: "#9ca3af", background: T.white },
              }}>
              {t("markets.cta2")}
            </Button>
          </Stack>
        </FadeUp>
      </Box>
    </Box>
  );
}

// ─── OPPORTUNITY (dark bg) ────────────────────────────────────
function OpportunitySection() {
  const { t } = useLanguage("domain2");
  const { navTo, isLoading /* registerLink */ } = useLinks();

  return (
    <Box
      sx={{ background: T.bgDark, py: { xs: 7, md: 9 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <Grid container spacing={5} alignItems='center'>
          <Grid item xs={12} md={5}>
            <FadeUp>
              <Eyebrow text={t("opportunity.eyebrow")} />
              <SectionTitle text={t("opportunity.subtitle")} dark />
              <Stack gap={1.75} mt={3} mb={4}>
                {(["f1", "f2", "f3"] as const).map((f) => (
                  <Stack key={f} direction='row' alignItems='center' gap={1.25}>
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: T.greenBg,
                        border: `1px solid ${T.greenBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        color: T.green,
                        fontWeight: 800,
                        flexShrink: 0,
                      }}>
                      ✓
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: T.textDim,
                        fontFamily: "'Outfit',sans-serif",
                      }}>
                      {t(`opportunity.${f}`)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Button
                onClick={() => navTo("register")}
                disabled={isLoading}
                sx={{
                  background: T.green,
                  color: T.white,
                  px: 3.5,
                  py: 1.25,
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  textTransform: "none",
                  borderRadius: "9px",
                  "&:hover": { background: T.green2 },
                }}>
                {t("opportunity.cta")}
              </Button>
            </FadeUp>
          </Grid>

          {/* Chart visual */}
          <Grid item xs={12} md={7}>
            <FadeUp delay={0.15}>
              <Box
                sx={{
                  background: "#111827",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  aspectRatio: { xs: "16/9", md: "16/8" },
                }}>
                <svg
                  width='100%'
                  height='100%'
                  viewBox='0 0 560 280'
                  preserveAspectRatio='none'>
                  <defs>
                    <linearGradient id='oppG' x1='0' y1='0' x2='0' y2='1'>
                      <stop
                        offset='0%'
                        stopColor='#06b96f'
                        stopOpacity='0.22'
                      />
                      <stop offset='100%' stopColor='#06b96f' stopOpacity='0' />
                    </linearGradient>
                  </defs>
                  {[80, 160, 240, 320, 400, 480].map((x, i) => (
                    <line
                      key={i}
                      x1={x}
                      y1='0'
                      x2={x}
                      y2='280'
                      stroke='rgba(255,255,255,0.04)'
                      strokeWidth='1'
                    />
                  ))}
                  {[70, 140, 210].map((y, i) => (
                    <line
                      key={i}
                      x1='0'
                      y1={y}
                      x2='560'
                      y2={y}
                      stroke='rgba(255,255,255,0.04)'
                      strokeWidth='1'
                    />
                  ))}
                  <polyline
                    points='0,240 60,220 110,205 170,185 220,160 270,140 320,115 370,90 420,100 480,65 560,40'
                    fill='none'
                    stroke='#06b96f'
                    strokeWidth='2.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <polygon
                    points='0,240 60,220 110,205 170,185 220,160 270,140 320,115 370,90 420,100 480,65 560,40 560,280 0,280'
                    fill='url(#oppG)'
                  />
                  <circle cx='560' cy='40' r='5' fill='#06b96f' />
                  <rect
                    x='450'
                    y='16'
                    width='100'
                    height='24'
                    rx='5'
                    fill='rgba(6,185,111,.15)'
                  />
                  <text
                    x='460'
                    y='32'
                    fill='#06b96f'
                    fontSize='12'
                    fontFamily='Outfit,sans-serif'
                    fontWeight='bold'>
                    +24.6%
                  </text>
                  {/* Row labels */}
                  {[
                    ["XAUUSD", "2,345.80", "40"],
                    ["EURUSD", "1.0812", "62"],
                    ["BTCUSD", "68,420", "84"],
                  ].map(([sym, price, y], i) => (
                    <g key={i}>
                      <text
                        x='16'
                        y={Number(y)}
                        fill='rgba(255,255,255,.38)'
                        fontSize='10'
                        fontFamily='Outfit,sans-serif'>
                        {sym}
                      </text>
                      <text
                        x='80'
                        y={Number(y)}
                        fill='rgba(255,255,255,.7)'
                        fontSize='10'
                        fontFamily='Outfit,sans-serif'
                        fontWeight='bold'>
                        {price}
                      </text>
                    </g>
                  ))}
                </svg>
              </Box>
            </FadeUp>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// ─── SECURITY (light grey bg) ─────────────────────────────────
function SecuritySection() {
  const { t } = useLanguage("domain2");

  return (
    <Box sx={{ background: T.bg, py: { xs: 7, md: 9 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <Grid container spacing={5} alignItems='center' direction='row-reverse'>
          {/* Text */}
          <Grid item xs={12} md={6}>
            <FadeUp>
              <Eyebrow text={t("security.eyebrow")} />
              <SectionTitle text={t("security.title")} />
              <Typography
                sx={{
                  fontSize: 15,
                  color: T.textSecondary,
                  lineHeight: 1.75,
                  mb: 3.5,
                  maxWidth: 460,
                }}>
                {t("security.subtitle")}
              </Typography>
              <Stack direction='row' flexWrap='wrap' gap={1.5}>
                {(["b1", "b2", "b3"] as const).map((b) => (
                  <Stack
                    key={b}
                    direction='row'
                    alignItems='center'
                    gap={0.75}
                    sx={{
                      border: `1px solid ${T.borderLight}`,
                      borderRadius: "8px",
                      px: 2,
                      py: 1,
                      background: T.white,
                      boxShadow: "0 1px 4px rgba(0,0,0,.04)",
                    }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: T.green,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: "'Outfit',sans-serif",
                        color: T.textPrimary,
                      }}>
                      {t(`security.${b}`)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </FadeUp>
          </Grid>

          {/* Visual */}
          <Grid item xs={12} md={6}>
            <FadeUp delay={0.12}>
              <Box
                sx={{
                  background: T.bgDark,
                  borderRadius: "18px",
                  height: { xs: 240, md: 300 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  position: "relative",
                  overflow: "hidden",
                }}>
                <Box
                  sx={{
                    position: "absolute",
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    border: "1px solid rgba(6,185,111,.12)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    border: "1px solid rgba(6,185,111,.08)",
                  }}
                />
                <Typography
                  sx={{ fontSize: 52, position: "relative", zIndex: 1 }}>
                  🛡️
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Outfit',sans-serif",
                    fontWeight: 800,
                    fontSize: 30,
                    color: T.green,
                    position: "relative",
                    zIndex: 1,
                  }}>
                  100%
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: T.textDimmer,
                    position: "relative",
                    zIndex: 1,
                  }}>
                  Segregated client funds
                </Typography>
              </Box>
            </FadeUp>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// ─── PODCAST (dark bg) ────────────────────────────────────────
function PodcastSection() {
  const { t } = useLanguage("domain2");
  const { navTo, isLoading /* registerLink */ } = useLinks();

  return (
    <Box
      sx={{ background: T.bgDark, py: { xs: 7, md: 9 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <Grid container spacing={5} alignItems='center'>
          <Grid item xs={12} md={6}>
            <FadeUp>
              <Eyebrow text={t("podcast.eyebrow")} />
              <SectionTitle text={t("podcast.title")} dark />
              <Typography
                sx={{
                  fontSize: 15,
                  color: T.textDim,
                  lineHeight: 1.75,
                  mb: 3.5,
                  maxWidth: 440,
                }}>
                {t("podcast.subtitle")}
              </Typography>
              <Button
                onClick={() => navTo("register")}
                disabled={isLoading}
                sx={{
                  background: T.green,
                  color: T.white,
                  px: 3.5,
                  py: 1.25,
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  textTransform: "none",
                  borderRadius: "9px",
                  "&:hover": { background: T.green2 },
                }}>
                {t("podcast.cta")}
              </Button>
            </FadeUp>
          </Grid>

          <Grid item xs={12} md={6}>
            <FadeUp delay={0.15}>
              <Box
                sx={{
                  background: T.bgCard,
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: "18px",
                  p: 3.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}>
                <Box
                  sx={{
                    width: 88,
                    height: 88,
                    borderRadius: "12px",
                    background: T.bgDark,
                    border: `1px solid ${T.greenBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    flexShrink: 0,
                  }}>
                  🎙️
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: T.green,
                      fontFamily: "'Outfit',sans-serif",
                      letterSpacing: "1.2px",
                      textTransform: "uppercase",
                      mb: 0.5,
                    }}>
                    New Episode
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: "'Outfit',sans-serif",
                      color: T.textLight,
                      mb: 0.5,
                    }}
                    noWrap>
                    Born to Trade
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: T.textDimmer, mb: 2 }}>
                    Exness Podcast
                  </Typography>
                  <Stack direction='row' alignItems='center' gap={0.4}>
                    {[6, 14, 10, 20, 8, 18, 12, 22, 8, 16, 10, 18, 6].map(
                      (h, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 3,
                            height: h,
                            borderRadius: "2px",
                            background:
                              i < 7 ? T.green : "rgba(255,255,255,.18)",
                          }}
                        />
                      )
                    )}
                  </Stack>
                </Box>
              </Box>
            </FadeUp>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// ─── NEWS / BLOG (white bg) ────────────────────────────────────
function NewsSection() {
  const { t } = useLanguage("domain2");
  const { navTo, isLoading /* registerLink */ } = useLinks();

  const news = [
    { key: "n1", emoji: "👤", tagColor: "#1e40af", tagBg: "#dbeafe" },
    { key: "n2", emoji: "📱", tagColor: "#065f46", tagBg: "#d1fae5" },
    { key: "n3", emoji: "🤝", tagColor: "#92400e", tagBg: "#fef3c7" },
  ] as const;

  return (
    <Box
      sx={{ background: T.white, py: { xs: 7, md: 9 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <FadeUp>
          <Eyebrow text={t("news.eyebrow")} />
          <SectionTitle text={t("news.title")} />
        </FadeUp>

        <Grid container spacing={2.5} mt={1}>
          {news.map((n, i) => (
            <Grid item xs={12} sm={4} key={n.key}>
              <FadeUp delay={i * 0.09}>
                <Box
                  onClick={() => navTo("register")}
                  sx={{
                    border: `1px solid ${T.borderLight}`,
                    borderRadius: "14px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "box-shadow .25s, transform .25s",
                    "&:hover": {
                      boxShadow: "0 6px 24px rgba(0,0,0,.09)",
                      transform: "translateY(-3px)",
                    },
                  }}>
                  <Box
                    sx={{
                      height: 170,
                      background:
                        i === 0
                          ? "linear-gradient(135deg,#1e3a5f 0%,#0c1220 100%)"
                          : i === 1
                          ? "linear-gradient(135deg,#064e3b 0%,#0c1220 100%)"
                          : "linear-gradient(135deg,#3b2200 0%,#0c1220 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 52,
                    }}>
                    {n.emoji}
                  </Box>
                  <Box sx={{ p: 2.5 }}>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1.25,
                        py: 0.3,
                        borderRadius: "5px",
                        fontSize: 10,
                        fontWeight: 800,
                        fontFamily: "'Outfit',sans-serif",
                        background: n.tagBg,
                        color: n.tagColor,
                        mb: 1.5,
                        letterSpacing: ".5px",
                      }}>
                      {t(`news.${n.key}.tag`)}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        fontFamily: "'Outfit',sans-serif",
                        color: T.textPrimary,
                        lineHeight: 1.55,
                        mb: 2,
                      }}>
                      {t(`news.${n.key}.title`)}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: T.green,
                        fontWeight: 700,
                        fontFamily: "'Outfit',sans-serif",
                      }}>
                      {t("news.readMore")} →
                    </Typography>
                  </Box>
                </Box>
              </FadeUp>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// ─── FINAL CTA (dark navy) ────────────────────────────────────
function FinalCta() {
  const { t } = useLanguage("domain2");
  const { navTo, isLoading /* registerLink */ } = useLinks();
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <Box
      sx={{
        background: T.bgMid,
        py: { xs: 8, md: 10 },
        px: { xs: 2, md: 4 },
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,.06)",
      }}>
      <FadeUp>
        <Box sx={{ maxWidth: 580, mx: "auto" }}>
          <Typography
            component='h2'
            sx={{
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 800,
              fontSize: { xs: 24, md: 40 },
              color: T.textLight,
              lineHeight: 1.2,
              mb: 1.5,
            }}>
            {t("finalcta.title")}
          </Typography>
          <Typography sx={{ fontSize: 15, color: T.textDim, mb: 4.5 }}>
            {t("finalcta.subtitle")}
          </Typography>
          <Stack
            direction={isMobile ? "column" : "row"}
            justifyContent='center'
            gap={2}
            flexWrap='wrap'>
            <Button
              onClick={() => navTo("register")}
              disabled={isLoading}
              sx={{
                background: T.green,
                color: T.white,
                fontSize: 15,
                px: 5,
                py: 1.75,
                fontWeight: 700,
                fontFamily: "'Outfit',sans-serif",
                textTransform: "none",
                borderRadius: "10px",
                "&:hover": {
                  background: T.green2,
                  transform: "translateY(-1px)",
                },
                transition: "all .2s",
              }}>
              {t("finalcta.cta1")}
            </Button>
            <Button
              onClick={() => navTo("register")}
              sx={{
                color: T.textDim,
                border: "1.5px solid rgba(255,255,255,.18)",
                fontSize: 15,
                px: 5,
                py: 1.75,
                fontWeight: 600,
                fontFamily: "'Outfit',sans-serif",
                textTransform: "none",
                borderRadius: "10px",
                "&:hover": {
                  borderColor: "rgba(255,255,255,.45)",
                  color: T.textLight,
                },
                transition: "all .2s",
              }}>
              {t("finalcta.cta2")}
            </Button>
          </Stack>
        </Box>
      </FadeUp>
    </Box>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────
function Footer() {
  const { t } = useLanguage("domain2");

  const cols = [
    {
      titleKey: "footer.col1",
      items: ["footer.p1", "footer.p2", "footer.p3", "footer.p4"],
    },
    {
      titleKey: "footer.col2",
      items: ["footer.c1", "footer.c2", "footer.c3", "footer.c4"],
    },
    { titleKey: "footer.col3", items: ["footer.l1", "footer.l2", "footer.l3"] },
    { titleKey: "footer.col4", items: ["footer.s1", "footer.s2", "footer.s3"] },
  ] as const;

  return (
    <Box
      component='footer'
      sx={{
        background: T.bgDark,
        borderTop: "1px solid rgba(255,255,255,.06)",
        pt: 5,
        pb: 3,
        px: { xs: 2, md: 4 },
      }}>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        {/* Disclaimer box */}
        <Box
          sx={{
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.07)",
            borderRadius: "10px",
            px: 2.5,
            py: 2,
            mb: 4,
          }}>
          <Typography
            sx={{ fontSize: 11, color: T.textDimmer, lineHeight: 1.7 }}>
            <strong style={{ color: "rgba(255,255,255,.4)" }}>
              Risk warning:{" "}
            </strong>
            {t("footer.disclaimer")}
          </Typography>
        </Box>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={3}>
            <Stack direction='row' alignItems='center' gap={0.75} mb={2}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "7px",
                  background: T.green,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                  fontFamily: "'Outfit',sans-serif",
                  color: T.bgDark,
                }}>
                Ex
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Outfit',sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color: T.textLight,
                }}>
                {t("nav.logo")}
              </Typography>
            </Stack>
          </Grid>
          {cols.map((col) => (
            <Grid item xs={6} sm={3} md={2.25} key={col.titleKey}>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  color: T.textLight,
                  letterSpacing: ".8px",
                  textTransform: "uppercase",
                  mb: 2,
                }}>
                {t(col.titleKey)}
              </Typography>
              <Stack gap={1.25}>
                {col.items.map((item) => (
                  <Typography
                    key={item}
                    sx={{
                      fontSize: 13,
                      color: T.textDimmer,
                      fontFamily: "'Outfit',sans-serif",
                      cursor: "pointer",
                      "&:hover": { color: T.textDim },
                      transition: "color .2s",
                    }}>
                    {t(item)}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,.07)", mb: 2.5 }} />
        <Typography
          sx={{
            fontSize: 12,
            color: T.textDimmer,
            textAlign: "center",
            fontFamily: "'Outfit',sans-serif",
          }}>
          {t("footer.copy")}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── STICKY MOBILE BOTTOM ────────────────────────────────────
function StickyBottom() {
  const { t } = useLanguage("domain2");
  const { navTo, isLoading /* registerLink */ } = useLinks();

  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(12,18,32,.97)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255,255,255,.08)",
        py: 1.5,
        px: 2.5,
        zIndex: 200,
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1.5,
      }}>
      <Box>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "'Outfit',sans-serif",
            color: T.textLight,
          }}>
          {t("sticky.title")}
        </Typography>
        <Typography sx={{ fontSize: 10, color: T.textDimmer }}>
          {t("sticky.sub")}
        </Typography>
      </Box>
      <Button
        onClick={() => navTo("register")}
        disabled={isLoading}
        sx={{
          background: T.green,
          color: T.white,
          px: 2.5,
          py: 1.25,
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "'Outfit',sans-serif",
          textTransform: "none",
          borderRadius: "8px",
          "&:hover": { background: T.green2 },
          flexShrink: 0,
        }}>
        {t("sticky.btn")}
      </Button>
    </Box>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────
export default function ExnessLandingPageView() {
  return (
    <Box
      sx={{
        background: T.bg,
        color: T.textPrimary,
        fontFamily: "'DM Sans',sans-serif",
        fontSize: 15,
        lineHeight: 1.7,
        minHeight: "100vh",
        pb: { xs: 8, sm: 0 },
      }}>
      <NavBar />
      <Hero />
      <GoldOilSection />
      <MarketsSection />
      <OpportunitySection />
      <SecuritySection />
      <PodcastSection />
      <NewsSection />
      <FinalCta />
      <Footer />
      <StickyBottom />
    </Box>
  );
}
