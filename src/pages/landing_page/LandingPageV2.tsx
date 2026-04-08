import { useEffect, useRef } from "react";

import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Divider,
  Select,
  MenuItem,
  useMediaQuery,
  TextField,
  IconButton,
  Paper,
  Rating,
  Chip,
} from "@mui/material";
import { useCountdown, useLiveCounter } from "../../hooks/useCountdown";
import { useLanguage } from "../../hooks/useLanguage";
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

// ─── THEME TOKENS (GIỐNG ẢNH EXNESS) ──────────────────────────────
const T = {
  bgDark: "#0B0E1A",
  bgCard: "#131725",
  bgInput: "#1A1F2E",
  yellow: "#FFD700",
  yellowLight: "#FFE44D",
  green: "#00C853",
  greenLight: "#69F0AE",
  blue: "#2962FF",
  white: "#FFFFFF",
  white80: "rgba(255,255,255,0.8)",
  white60: "rgba(255,255,255,0.6)",
  white40: "rgba(255,255,255,0.4)",
  white20: "rgba(255,255,255,0.2)",
  white10: "rgba(255,255,255,0.1)",
  border: "rgba(255,255,255,0.08)",
  orange: "#FF6D00",
  red: "#FF1744",
};

// ─── NAVBAR ──────────────────────────────────────────────────
function NavBar() {
  const { t, changeLanguage, currentLanguage } = useLanguage();
  const { navTo } = useLinks();
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        background: T.bgDark,
        borderBottom: `1px solid ${T.border}`,
        px: { xs: 2, md: 6 },
        py: 1.5,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        {/* Logo */}
        <Stack direction='row' alignItems='center' gap={1}>
          <Box
            sx={{
              background: T.yellow,
              color: T.bgDark,
              width: 32,
              height: 32,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 800,
            }}>
            Ex
          </Box>
          <Typography sx={{ fontWeight: 700, fontSize: 20, color: T.white }}>
            exness
          </Typography>
        </Stack>

        {/* Desktop Menu */}
        {!isMobile && (
          <Stack direction='row' gap={4}>
            {["Accounts", "Conditions", "Markets", "Platforms"].map((item) => (
              <Typography
                key={item}
                sx={{
                  fontSize: 14,
                  color: T.white80,
                  cursor: "pointer",
                  "&:hover": { color: T.yellow },
                }}>
                {item}
              </Typography>
            ))}
          </Stack>
        )}

        {/* Right side */}
        <Stack direction='row' alignItems='center' gap={2}>
          <Select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            size='small'
            sx={{
              fontSize: 13,
              color: T.white80,
              height: 36,
              minWidth: 85,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
              "& .MuiSvgIcon-root": { color: T.white60 },
            }}>
            {LANGUAGES.map((lang) => (
              <MenuItem key={lang.code} value={lang.code} sx={{ fontSize: 13 }}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>

          <Button
            onClick={() => navTo("register")}
            sx={{
              background: T.yellow,
              color: T.bgDark,
              px: 3,
              py: 1,
              fontSize: 14,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": { background: T.yellowLight },
            }}>
            {t("nav.openAccount")}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

// ─── HERO SECTION (GIỐNG ẢNH) ────────────────────────────────────
function Hero() {
  const { t } = useLanguage();
  const { navTo } = useLinks();

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 0 },
        background: T.bgDark,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "50%",
          height: "80%",
          background:
            "radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}>
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 6,
        }}>
        {/* Left Content */}
        <Box sx={{ flex: 1 }}>
          <Stack direction='row' alignItems='center' gap={1} sx={{ mb: 3 }}>
            <Chip
              label={t("hero.trustBadge")}
              size='small'
              sx={{
                background: T.white10,
                color: T.white80,
                fontSize: 11,
                borderRadius: 1,
              }}
            />
            <Chip
              label='🏆'
              size='small'
              sx={{
                background: T.white10,
                color: T.yellow,
                fontSize: 11,
                borderRadius: 1,
              }}
            />
          </Stack>

          <Typography
            sx={{
              fontSize: { xs: 36, md: 56 },
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 2,
            }}>
            {t("hero.title")}{" "}
            <Box component='span' sx={{ color: T.yellow }}>
              {t("hero.titleHighlight")}
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: 16,
              color: T.white60,
              mb: 4,
              maxWidth: 500,
              lineHeight: 1.6,
            }}>
            {t("hero.sub")}
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mb: 3 }}>
            <Button
              onClick={() => navTo("register")}
              sx={{
                background: T.yellow,
                color: T.bgDark,
                px: 4,
                py: 1.5,
                fontSize: 16,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": { background: T.yellowLight },
              }}>
              {t("hero.cta1")}
            </Button>
            <Button
              onClick={() => navTo("demo")}
              sx={{
                border: `1px solid ${T.white40}`,
                color: T.white,
                px: 4,
                py: 1.5,
                fontSize: 16,
                fontWeight: 500,
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": { borderColor: T.yellow, background: T.white10 },
              }}>
              {t("hero.cta2")}
            </Button>
          </Stack>

          <Stack direction='row' flexWrap='wrap' gap={2} sx={{ mt: 3 }}>
            {[
              t("hero.trust1"),
              t("hero.trust2"),
              t("hero.trust3"),
              t("hero.trust4"),
            ].map((text, i) => (
              <Stack key={i} direction='row' alignItems='center' gap={0.5}>
                <Typography sx={{ fontSize: 12, color: T.white60 }}>
                  ✓
                </Typography>
                <Typography sx={{ fontSize: 12, color: T.white60 }}>
                  {text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Right Content - App Store Badges */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Stack spacing={3} alignItems='center'>
            <Box
              sx={{
                background: T.bgCard,
                borderRadius: 3,
                p: 3,
                width: "100%",
                maxWidth: 300,
                border: `1px solid ${T.border}`,
              }}>
              <Typography sx={{ fontSize: 13, color: T.white60, mb: 1 }}>
                Download on the
              </Typography>
              <Typography sx={{ fontSize: 24, fontWeight: 700, mb: 1 }}>
                App Store
              </Typography>
              <Rating
                value={5}
                readOnly
                size='small'
                sx={{ color: T.yellow }}
              />
            </Box>
            <Box
              sx={{
                background: T.bgCard,
                borderRadius: 3,
                p: 3,
                width: "100%",
                maxWidth: 300,
                border: `1px solid ${T.border}`,
              }}>
              <Typography sx={{ fontSize: 13, color: T.white60, mb: 1 }}>
                GET IT ON
              </Typography>
              <Typography sx={{ fontSize: 24, fontWeight: 700, mb: 1 }}>
                Google Play
              </Typography>
              <Rating
                value={5}
                readOnly
                size='small'
                sx={{ color: T.yellow }}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

// ─── FEATURES STRIP (RÚT TIỀN TỨC THÌ, SPREAD VÀNG, V.V) ──────────────────
function FeaturesStrip() {
  const { t } = useLanguage();
  const features = [
    { icon: "⚡", title: t("features.feature1"), desc: t("features.desc1") },
    { icon: "💰", title: t("features.feature2"), desc: t("features.desc2") },
    { icon: "🆓", title: t("features.feature3"), desc: t("features.desc3") },
  ];

  return (
    <Box
      sx={{
        background: T.bgCard,
        py: 4,
        px: { xs: 2, md: 6 },
        borderTop: `1px solid ${T.border}`,
        borderBottom: `1px solid ${T.border}`,
      }}>
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          gap: 3,
        }}>
        {features.map((f, i) => (
          <Stack
            key={i}
            direction='row'
            alignItems='center'
            gap={2}
            sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 32 }}>{f.icon}</Typography>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
                {f.title}
              </Typography>
              <Typography sx={{ fontSize: 12, color: T.white60 }}>
                {f.desc}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}

// ─── INSTRUMENTS TABLE (GIỐNG ẢNH) ────────────────────────────────────
function InstrumentsSection() {
  const { t } = useLanguage();
  const { navTo } = useLinks();
  const isMobile = useMediaQuery("(max-width:900px)");

  const instruments = [
    {
      icon: "🥇",
      name: "XAUUSD",
      desc: "Gold vs US Dollar",
      category: "Metals",
      leverage: "Customizable",
      spread: "0.0",
      swap: "Available",
    },
    {
      icon: "🛢",
      name: "USOIL",
      desc: "Crude Oil",
      category: "Energies",
      leverage: "1:1000",
      spread: "1.3",
      swap: "Available",
    },
    {
      icon: "💱",
      name: "EURUSD",
      desc: "Euro vs US Dollar",
      category: "Currencies",
      leverage: "Customizable",
      spread: "0.6",
      swap: "Available",
    },
    {
      icon: "📊",
      name: "US30",
      desc: "Wall Street 30 Index",
      category: "Indices",
      leverage: "1:400",
      spread: "1.3",
      swap: "Available",
    },
    {
      icon: "📱",
      name: "AAPL",
      desc: "Apple Inc.",
      category: "Stocks",
      leverage: "1:20",
      spread: "1.1",
      swap: "Swap applied",
    },
  ];

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 }, background: T.bgDark }}>
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            color: T.white40,
            letterSpacing: "1px",
            mb: 1,
          }}>
          {t("instruments.eyebrow")}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 24, md: 36 },
            fontWeight: 700,
            mb: 2,
          }}>
          {t("instruments.title")}
        </Typography>
        <Typography
          sx={{ fontSize: 15, color: T.white60, mb: 5, maxWidth: 500 }}>
          {t("instruments.sub")}
        </Typography>

        {/* Table Header */}
        {!isMobile && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "50px 1.5fr 1fr 1fr 1fr 1fr",
              borderBottom: `1px solid ${T.border}`,
              pb: 1.5,
              mb: 1,
              color: T.white40,
              fontSize: 12,
            }}>
            <Box></Box>
            <Box>Instruments</Box>
            <Box>Leverage</Box>
            <Box>Avg. spread (pips)</Box>
            <Box>Swap-free</Box>
            <Box></Box>
          </Box>
        )}

        {/* Table Rows */}
        <Stack spacing={1}>
          {instruments.map((inst, i) => (
            <Box
              key={i}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "50px 1.5fr 1fr 1fr 1fr 1fr",
                },
                alignItems: "center",
                py: 2,
                borderBottom:
                  i < instruments.length - 1 ? `1px solid ${T.border}` : "none",
                cursor: "pointer",
                "&:hover": { background: T.white10, borderRadius: 2 },
              }}
              onClick={() => navTo("register")}>
              {isMobile ? (
                <Stack spacing={1}>
                  <Stack direction='row' alignItems='center' gap={2}>
                    <Typography sx={{ fontSize: 28 }}>{inst.icon}</Typography>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                        {inst.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: T.white60 }}>
                        {inst.desc}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography sx={{ fontSize: 10, color: T.white40 }}>
                        Leverage
                      </Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                        {inst.leverage}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: 10, color: T.white40 }}>
                        Spread
                      </Typography>
                      <Typography
                        sx={{ fontSize: 12, fontWeight: 600, color: T.green }}>
                        {inst.spread} pips
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: 10, color: T.white40 }}>
                        Swap-free
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 11,
                          color: inst.swap === "Available" ? T.green : T.orange,
                        }}>
                        {inst.swap}
                      </Typography>
                    </Box>
                    <Button
                      size='small'
                      sx={{
                        background: T.yellow,
                        color: T.bgDark,
                        fontSize: 11,
                        fontWeight: 700,
                        borderRadius: 1,
                        px: 2,
                      }}>
                      Trade
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <>
                  <Typography sx={{ fontSize: 24 }}>{inst.icon}</Typography>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                      {inst.name}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: T.white60 }}>
                      {inst.desc}
                    </Typography>
                  </Box>
                  <Typography>{inst.leverage}</Typography>
                  <Typography sx={{ color: T.green, fontWeight: 600 }}>
                    {inst.spread}
                  </Typography>
                  <Typography
                    sx={{
                      color: inst.swap === "Available" ? T.green : T.orange,
                    }}>
                    {inst.swap}
                  </Typography>
                  <Button
                    size='small'
                    sx={{
                      background: T.yellow,
                      color: T.bgDark,
                      fontSize: 12,
                      fontWeight: 700,
                      borderRadius: 1,
                      px: 3,
                      "&:hover": { background: T.yellowLight },
                    }}>
                    Trade
                  </Button>
                </>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// ─── CTA SECTION (SEIZE EVERY OPPORTUNITY) ──────────────────────────────
function SeizeOpportunity() {
  const { t } = useLanguage();
  const { navTo } = useLinks();

  const platforms = [
    { icon: "🖥", name: "MetaTrader 5", desc: "Advanced trading platform" },
    { icon: "🌐", name: "Exness Terminal", desc: "Web trading" },
    { icon: "📱", name: "Exness Trade app", desc: "Mobile trading" },
  ];

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 }, background: T.bgCard }}>
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 6,
        }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 32, mb: 2 }}>📱</Typography>
          <Typography
            sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 700, mb: 2 }}>
            {t("seize.title")}
          </Typography>
          <Typography
            sx={{ fontSize: 15, color: T.white60, mb: 4, maxWidth: 450 }}>
            {t("seize.sub")}
          </Typography>

          <Stack spacing={2}>
            {platforms.map((p, i) => (
              <Stack
                key={i}
                direction='row'
                alignItems='center'
                gap={2}
                sx={{ cursor: "pointer" }}
                onClick={() => navTo("register")}>
                <Typography sx={{ fontSize: 24 }}>{p.icon}</Typography>
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{p.name}</Typography>
                  <Typography sx={{ fontSize: 12, color: T.white60 }}>
                    {p.desc}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Box
            sx={{
              background: T.bgDark,
              borderRadius: 4,
              p: 4,
              border: `1px solid ${T.border}`,
            }}>
            <Typography sx={{ fontSize: 48, mb: 2 }}>🔒</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1 }}>
              {t("security.title")}
            </Typography>
            <Typography sx={{ fontSize: 13, color: T.white60, mb: 3 }}>
              {t("security.desc")}
            </Typography>
            <Stack direction='row' justifyContent='center' gap={3}>
              <Typography
                sx={{ fontSize: 13, color: T.yellow, cursor: "pointer" }}>
                {t("security.link1")} →
              </Typography>
              <Typography
                sx={{ fontSize: 13, color: T.yellow, cursor: "pointer" }}>
                {t("security.link2")} →
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── PODCAST SECTION ──────────────────────────────────────────────
function PodcastSection() {
  const { t } = useLanguage();
  const { navTo } = useLinks();

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 }, background: T.bgDark }}>
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}>
        <Box>
          <Typography sx={{ fontSize: 13, color: T.white40, mb: 1 }}>
            🎙️ {t("podcast.badge")}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 20, md: 28 },
              fontWeight: 700,
              mb: 2,
              maxWidth: 500,
            }}>
            {t("podcast.title")}
          </Typography>
          <Typography
            sx={{ fontSize: 14, color: T.white60, mb: 3, maxWidth: 450 }}>
            {t("podcast.desc")}
          </Typography>
          <Button
            onClick={() => navTo("podcast")}
            sx={{
              color: T.yellow,
              fontSize: 14,
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { color: T.yellowLight },
            }}>
            {t("podcast.cta")} →
          </Button>
        </Box>
        <Box sx={{ flex: 1, textAlign: "right" }}>
          <Typography sx={{ fontSize: 80, opacity: 0.8 }}>🎧</Typography>
        </Box>
      </Box>
    </Box>
  );
}

// ─── NEWS SECTION (KEEP UP WITH EXNESS) ──────────────────────────────
function NewsSection() {
  const { t } = useLanguage();
  const { navTo } = useLinks();

  const articles = [
    { title: t("news.title1"), tag: "PRODUCT" },
    { title: t("news.title2"), tag: "CRYPTO" },
    { title: t("news.title3"), tag: "EVENT" },
  ];

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 }, background: T.bgCard }}>
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          flexWrap='wrap'
          sx={{ mb: 4 }}>
          <Box>
            <Typography sx={{ fontSize: 13, color: T.white40, mb: 1 }}>
              {t("news.eyebrow")}
            </Typography>
            <Typography sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 700 }}>
              {t("news.title")}
            </Typography>
          </Box>
          <Button
            sx={{ color: T.yellow, fontSize: 13, textTransform: "none" }}
            onClick={() => navTo("blog")}>
            {t("news.cta")} →
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {articles.map((article, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box
                sx={{
                  background: T.bgDark,
                  borderRadius: 3,
                  p: 3,
                  border: `1px solid ${T.border}`,
                  cursor: "pointer",
                  "&:hover": { borderColor: T.yellow },
                }}
                onClick={() => navTo("blog")}>
                <Chip
                  label={article.tag}
                  size='small'
                  sx={{
                    background: T.white10,
                    color: T.yellow,
                    fontSize: 10,
                    mb: 2,
                  }}
                />
                <Typography
                  sx={{ fontWeight: 700, fontSize: 16, lineHeight: 1.4 }}>
                  {article.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// ─── FINAL CTA (TRADE WITH A TRUSTED BROKER TODAY) ──────────────────────────────
function FinalCta() {
  const { t } = useLanguage();
  const { navTo } = useLinks();

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        background: T.bgDark,
        textAlign: "center",
      }}>
      <Box sx={{ maxWidth: 700, mx: "auto" }}>
        <Typography
          sx={{ fontSize: { xs: 28, md: 38 }, fontWeight: 700, mb: 2 }}>
          {t("finalCta.title")}
        </Typography>
        <Typography sx={{ fontSize: 16, color: T.white60, mb: 4 }}>
          {t("finalCta.sub")}
        </Typography>
        <Button
          onClick={() => navTo("register")}
          sx={{
            background: T.yellow,
            color: T.bgDark,
            px: 5,
            py: 1.5,
            fontSize: 16,
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": { background: T.yellowLight },
          }}>
          {t("finalCta.btn")}
        </Button>
        <Typography
          sx={{ fontSize: 10, color: T.white40, mt: 3, lineHeight: 1.5 }}>
          {t("finalCta.disclaimer")}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── FOOTER (GIỐNG ẢNH EXNESS) ──────────────────────────────
function Footer() {
  const { t } = useLanguage();
  const { navTo } = useLinks();

  const footerSections = [
    {
      title: "Accounts",
      links: [
        "Standard accounts",
        "Professional accounts",
        "Demo trading account",
        "Order execution",
      ],
    },
    {
      title: "Conditions",
      links: ["Deposits and withdrawals", "Fees", "Client protection"],
    },
    {
      title: "Markets",
      links: [
        "Forex CFD",
        "Commodities CFD",
        "Stocks CFD",
        "Indices CFD",
        "Crypto CFD",
      ],
    },
    {
      title: "Platforms",
      links: [
        "Trading platforms",
        "MetaTrader 5",
        "MetaTrader 4",
        "Exness Trade app",
        "Exness Terminal",
      ],
    },
    {
      title: "Resources",
      links: [
        "Analytical tools",
        "Economic calendar",
        "Trading calculator",
        "Blog",
        "Podcast",
      ],
    },
    {
      title: "About",
      links: ["About us", "Why Exness", "Contact us", "Help Center"],
    },
  ];

  return (
    <Box
      sx={{
        py: 5,
        px: { xs: 2, md: 6 },
        background: T.bgDark,
        borderTop: `1px solid ${T.border}`,
      }}>
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        <Grid container spacing={3}>
          {footerSections.map((section, i) => (
            <Grid item xs={6} sm={4} md={2} key={i}>
              <Typography
                sx={{ fontSize: 13, fontWeight: 700, color: T.white, mb: 1.5 }}>
                {section.title}
              </Typography>
              <Stack gap={0.75}>
                {section.links.map((link, j) => (
                  <Typography
                    key={j}
                    sx={{
                      fontSize: 11,
                      color: T.white60,
                      cursor: "pointer",
                      "&:hover": { color: T.yellow },
                    }}
                    onClick={() =>
                      navTo(link.toLowerCase().replace(/ /g, "-"))
                    }>
                    {link}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, borderColor: T.border }} />

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent='space-between'
          alignItems='center'
          gap={2}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Box
              sx={{
                background: T.yellow,
                color: T.bgDark,
                width: 28,
                height: 28,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 800,
              }}>
              Ex
            </Box>
            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
              exness
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 10, color: T.white40 }}>
            © 2025 Exness. All rights reserved.
          </Typography>
          <Stack direction='row' gap={2}>
            {["Risk Disclosure", "Privacy Policy", "Terms of Use"].map(
              (item) => (
                <Typography
                  key={item}
                  sx={{
                    fontSize: 10,
                    color: T.white40,
                    cursor: "pointer",
                    "&:hover": { color: T.yellow },
                  }}>
                  {item}
                </Typography>
              )
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

// ─── STICKY BOTTOM MOBILE ──────────────────────────────────
function StickyBottom() {
  const { t } = useLanguage();
  const { navTo } = useLinks();

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: T.bgDark,
        borderTop: `1px solid ${T.border}`,
        py: 1.5,
        px: 2,
        zIndex: 200,
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
      }}>
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
          {t("sticky.title")}
        </Typography>
        <Typography sx={{ fontSize: 10, color: T.white60 }}>
          {t("sticky.sub")}
        </Typography>
      </Box>
      <Button
        onClick={() => navTo("register")}
        sx={{
          background: T.yellow,
          color: T.bgDark,
          px: 3,
          py: 1,
          fontSize: 13,
          fontWeight: 700,
          textTransform: "none",
          borderRadius: "8px",
          flexShrink: 0,
        }}>
        {t("sticky.btn")}
      </Button>
    </Box>
  );
}

// ─── ROOT COMPONENT ─────────────────────────────────────────
export default function LandingPageV2() {
  return (
    <Box
      sx={{
        background: T.bgDark,
        color: T.white,
        fontFamily: "'Inter', 'DM Sans', sans-serif",
        minHeight: "100vh",
        pb: { xs: 8, md: 0 },
      }}>
      <NavBar />
      <Hero />
      <FeaturesStrip />
      <InstrumentsSection />
      <SeizeOpportunity />
      <PodcastSection />
      <NewsSection />
      <FinalCta />
      <Footer />
      <StickyBottom />
    </Box>
  );
}
