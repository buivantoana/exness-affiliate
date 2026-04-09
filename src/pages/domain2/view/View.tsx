import { useEffect, useRef, useState } from "react";
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
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Chip,
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

// ─── THEME TOKENS (Exness style) ─────────────────────────────
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

  yellow: "#FFDE02",
  yellow2: "#FFE94D",
  blue: "#185FA5",
  blueLight: "#E6F1FB",
  blueText: "#0C447C",
  red: "#E24B4A",
  redLight: "#FCEBEB",
  redText: "#A32D2D",
  amber: "#EF9F27",
  amberLight: "#FAEEDA",
  amberText: "#854F0B",
};

// ─── FADE-UP ANIMATION ───────────────────────────────────────
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

// ─── TAG CHIP ─────────────────────────────────────────────────
function TagChip({
  label,
  color,
}: {
  label: string;
  color: "green" | "blue" | "amber" | "red" | "gray";
}) {
  const styles = {
    green: { bg: T.greenBg, text: T.green },
    blue: { bg: T.blueLight, text: T.blueText },
    amber: { bg: T.amberLight, text: T.amberText },
    red: { bg: T.redLight, text: T.redText },
    gray: { bg: T.bg, text: T.textSecondary },
  };
  const s = styles[color];
  return (
    <Box
      component='span'
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.25,
        py: 0.5,
        borderRadius: "100px",
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "'Outfit',sans-serif",
        background: s.bg,
        color: s.text,
        border: color === "green" ? `1px solid ${T.greenBorder}` : "none",
      }}>
      {label}
    </Box>
  );
}

// ─── STAR RATING ──────────────────────────────────────────────
const Star = ({
  filled,
  half = false,
}: {
  filled: boolean;
  half?: boolean;
}) => (
  <Box
    sx={{
      width: 14,
      height: 14,
      flexShrink: 0,
      background: filled
        ? T.amber
        : half
        ? `linear-gradient(90deg, ${T.amber} 50%, #D3D1C7 50%)`
        : "#D3D1C7",
      clipPath:
        "polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
    }}
  />
);

const Stars = ({ rating, size = 14 }: { rating: number; size?: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return (
    <Stack direction='row' gap={0.5} alignItems='center'>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          filled={i < fullStars}
          half={i === fullStars && hasHalfStar}
        />
      ))}
    </Stack>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────
function NavBar() {
  const { t, changeLanguage, currentLanguage } = useLanguage("domain2");
  const { navTo, isLoading } = useLinks();
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

        <Stack
          direction='row'
          gap={2.5}
          sx={{ display: { xs: "none", md: "flex" } }}>
          <Typography
            sx={{
              fontSize: 12,
              color: T.textSecondary,
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 500,
              cursor: "pointer",
              "&:hover": { color: T.textPrimary },
            }}>
            {t("nav.brokers")}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: T.textSecondary,
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 500,
              cursor: "pointer",
              "&:hover": { color: T.textPrimary },
            }}>
            {t("nav.compare")}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: T.textSecondary,
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 500,
              cursor: "pointer",
              "&:hover": { color: T.textPrimary },
            }}>
            {t("nav.education")}
          </Typography>
        </Stack>

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

// ─── BREADCRUMB ──────────────────────────────────────────────
function Breadcrumb() {
  const { t } = useLanguage("domain2");
  return (
    <Box
      sx={{
        py: 1.5,
        px: { xs: 2, md: 4 },
        background: T.white,
        borderBottom: `1px solid ${T.borderLight}`,
      }}>
      <Box
        sx={{
          maxWidth: 1140,
          mx: "auto",
          fontSize: 12,
          color: T.textSecondary,
        }}>
        {t("breadcrumb.home")}{" "}
        <span style={{ margin: "0 6px", color: T.textSecondary }}>/</span>{" "}
        {t("breadcrumb.brokers")}{" "}
        <span style={{ margin: "0 6px", color: T.textSecondary }}>/</span>
        <span style={{ color: T.bgDark, fontWeight: 500 }}>
          {t("breadcrumb.current")}
        </span>
      </Box>
    </Box>
  );
}

// ─── URGENCY BAR ────────────────────────────────────────────
function UrgencyBar() {
  const { t } = useLanguage("domain2");
  const [viewers, setViewers] = useState(247);
  const [openers, setOpeners] = useState(38);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) =>
        Math.max(100, prev + Math.floor(Math.random() * 5) - 2)
      );
      if (Math.random() > 0.7) setOpeners((prev) => Math.min(prev + 1, 99));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        background: T.amberLight,
        borderBottom: "1px solid #FAC775",
        py: 1,
        px: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        flexWrap: "wrap",
      }}>
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: T.red,
          flexShrink: 0,
          animation: "pulse 1.5s infinite",
          "@keyframes pulse": {
            "0%,100%": { opacity: 1 },
            "50%": { opacity: 0.4 },
          },
        }}
      />
      <Typography
        sx={{
          fontSize: 12,
          color: T.amberText,
          fontFamily: "'Outfit',sans-serif",
        }}>
        <strong>{viewers}</strong> {t("urgency.viewing")} ·{" "}
        <strong>{openers}</strong> {t("urgency.opened")}
      </Typography>
    </Box>
  );
}

// ─── HERO (dark navy bg) ──────────────────────────────────────
function Hero() {
  const { t } = useLanguage("domain2");
  const { navTo, isLoading } = useLinks();
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <Box sx={{ background: T.bgDark, overflow: "hidden" }}>
      <Box sx={{ maxWidth: 1140, mx: "auto", px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            textAlign: "center",
            pt: { xs: 6, md: 8 },
            pb: { xs: 4, md: 6 },
          }}>
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
            {t("hero.title")}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 15, md: 18 },
              color: T.textDim,
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.7,
              mb: 3,
              animation: "hFade .6s ease forwards .1s",
              opacity: 0,
            }}>
            {t("hero.sub")}
          </Typography>

          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
            gap={1.5}
            mb={3}
            sx={{ animation: "hFade .6s ease forwards .18s", opacity: 0 }}>
            <Stars rating={4.5} />
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "'Outfit',sans-serif",
                color: T.textLight,
              }}>
              4.5
            </Typography>
            <Typography sx={{ fontSize: 12, color: T.textDim }}>
              / 5 {t("hero.overall")}
            </Typography>
            <TagChip label={t("hero.regulated")} color='green' />
          </Stack>

          <Grid
            container
            spacing={1.5}
            sx={{ maxWidth: 500, mx: "auto", mb: 3.5 }}>
            {[
              { val: "$10", lbl: t("hero.minDeposit") },
              { val: t("hero.instant"), lbl: t("hero.withdrawal") },
              { val: "1:2000", lbl: t("hero.maxLeverage") },
              { val: "6", lbl: t("hero.licenses") },
            ].map((m, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Box
                  sx={{
                    background: "rgba(255,255,255,.06)",
                    borderRadius: "12px",
                    p: 1.5,
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,.1)",
                  }}>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 700,
                      fontFamily: "'Outfit',sans-serif",
                      color: T.green,
                    }}>
                    {m.val}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 10,
                      color: T.textDimmer,
                      mt: 0.5,
                      fontFamily: "'Outfit',sans-serif",
                    }}>
                    {m.lbl}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Stack
            direction={isMobile ? "column" : "row"}
            justifyContent='center'
            gap={1.5}
            sx={{ animation: "hFade .6s ease forwards .26s", opacity: 0 }}>
            <Button
              onClick={() => navTo("register")}
              disabled={isLoading}
              sx={{
                background: T.green,
                color: T.white,
                fontSize: 15,
                px: 4.5,
                py: 1.5,
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
              {t("hero.openAccount")} →
            </Button>
            <Button
              onClick={() => navTo("register")}
              sx={{
                color: T.textDim,
                border: "1.5px solid rgba(255,255,255,.18)",
                fontSize: 15,
                px: 4.5,
                py: 1.5,
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
              {t("hero.tryDemo")}
            </Button>
          </Stack>
        </Box>
      </Box>

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
          {["mt4", "mt5", "web", "mobile", "social"].map((p) => (
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

// ─── STICKY NAV ──────────────────────────────────────────────
function StickyNav() {
  const { t } = useLanguage("domain2");
  const [active, setActive] = useState("quiz");
  const sections = [
    "quiz",
    "expert",
    "trust",
    "accounts",
    "compare",
    "reviews",
    "faq",
  ];
  const labels = [
    "findBroker",
    "expertAssessment",
    "trustSafety",
    "accountTypes",
    "compare",
    "reviews",
    "faq",
  ];

  useEffect(() => {
    const handleScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box
      sx={{
        background: T.white,
        borderBottom: `1px solid ${T.borderLight}`,
        px: 2,
        overflowX: "auto",
        whiteSpace: "nowrap",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}>
      <Box sx={{ maxWidth: 1140, mx: "auto", display: "flex" }}>
        {sections.map((id, i) => (
          <Box
            key={id}
            onClick={() => scrollTo(id)}
            sx={{
              px: 1.75,
              py: 1.5,
              fontSize: 12,
              color: active === id ? T.green : T.textSecondary,
              borderBottom:
                active === id
                  ? `2px solid ${T.green}`
                  : "2px solid transparent",
              cursor: "pointer",
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 500,
              transition: "all .2s",
              "&:hover": { color: T.textPrimary },
            }}>
            {t(`stickyNav.${labels[i]}`)}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ─── QUIZ SECTION ────────────────────────────────────────────
function QuizSection() {
  const { t } = useLanguage("domain2");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const { navTo, isLoading } = useLinks();

  const questions = [
    { key: "q1", text: t("quiz.q1"), options: ["gold", "forex", "crypto"] },
    {
      key: "q2",
      text: t("quiz.q2"),
      options: ["beginner", "intermediate", "advanced"],
    },
    {
      key: "q3",
      text: t("quiz.q3"),
      options: ["spreads", "withdrawals", "leverage"],
    },
  ];

  const optionLabels = {
    gold: t("quiz.optGold"),
    forex: t("quiz.optForex"),
    crypto: t("quiz.optCrypto"),
    beginner: t("quiz.optBeginner"),
    intermediate: t("quiz.optIntermediate"),
    advanced: t("quiz.optAdvanced"),
    spreads: t("quiz.optSpreads"),
    withdrawals: t("quiz.optWithdrawals"),
    leverage: t("quiz.optLeverage"),
  };

  const selectOption = (qKey: string, opt: string) => {
    setAnswers((prev) => ({ ...prev, [qKey]: opt }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleResult = () => {
    setShowResult(true);
  };

  const currentQuestion = questions[step - 1];
  const currentAnswer = answers[currentQuestion?.key] || "";

  return (
    <Box
      sx={{ background: T.white, py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 } }}
      id='quiz'>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <FadeUp>
          <Eyebrow text={t("quiz.eyebrow")} />
          <SectionTitle text={t("quiz.title")} />
          <Typography
            sx={{ fontSize: 14, color: T.textSecondary, mb: 4, maxWidth: 520 }}>
            {t("quiz.sub")}
          </Typography>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Box
            sx={{
              background: T.bg,
              border: `1px solid ${T.borderLight}`,
              borderRadius: "18px",
              p: { xs: 2.5, md: 3.5 },
            }}>
            {/* Progress */}
            <Stack direction='row' alignItems='center' gap={1} mb={3}>
              <Box sx={{ flex: 1, display: "flex", gap: 0.5 }}>
                {[1, 2, 3].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      flex: 1,
                      height: 4,
                      borderRadius: "2px",
                      background:
                        i <= step
                          ? T.green
                          : i === step + 1
                          ? T.greenBg
                          : T.borderLight,
                    }}
                  />
                ))}
              </Box>
              <Typography sx={{ fontSize: 11, color: T.textSecondary }}>
                {t("quiz.step")} {step} {t("quiz.of")} 3
              </Typography>
            </Stack>

            {!showResult && (
              <Box>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "'Outfit',sans-serif",
                    color: T.textPrimary,
                    mb: 2,
                  }}>
                  {currentQuestion?.text}
                </Typography>
                <Stack gap={1.5}>
                  {currentQuestion?.options.map((opt) => (
                    <Box
                      key={opt}
                      onClick={() => selectOption(currentQuestion.key, opt)}
                      sx={{
                        p: 1.5,
                        borderRadius: "12px",
                        border: `1.5px solid ${
                          currentAnswer === opt ? T.green : T.borderLight
                        }`,
                        background: currentAnswer === opt ? T.greenBg : T.white,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        transition: "all .2s",
                        "&:hover": { borderColor: T.green },
                      }}>
                      <Box
                        sx={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          border: `2px solid ${
                            currentAnswer === opt ? T.green : T.borderLight
                          }`,
                          background:
                            currentAnswer === opt ? T.green : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        {currentAnswer === opt && (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: T.white,
                            }}
                          />
                        )}
                      </Box>
                      <Typography sx={{ fontSize: 14, color: T.textPrimary }}>
                        {optionLabels[opt as keyof typeof optionLabels]}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                  <Button
                    onClick={step === 3 ? handleResult : nextStep}
                    disabled={!currentAnswer}
                    sx={{
                      background: T.bgDark,
                      color: T.white,
                      px: 3.5,
                      py: 1.25,
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "'Outfit',sans-serif",
                      textTransform: "none",
                      borderRadius: "10px",
                      "&:hover": { background: "#1a2d4a" },
                    }}>
                    {step === 3 ? t("quiz.seeResult") : t("quiz.next")} →
                  </Button>
                </Box>
              </Box>
            )}

            {showResult && (
              <Box
                sx={{
                  background: T.greenBg,
                  border: `1px solid ${T.greenBorder}`,
                  borderRadius: "16px",
                  p: 3,
                  textAlign: "center",
                }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 800,
                    fontFamily: "'Outfit',sans-serif",
                    color: T.green,
                    mb: 1,
                  }}>
                  ✓ {t("quiz.resultTitle")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: T.textSecondary,
                    lineHeight: 1.7,
                    mb: 2.5,
                  }}>
                  {t("quiz.resultText")}
                </Typography>
                <Button
                  onClick={() => navTo("register")}
                  disabled={isLoading}
                  sx={{
                    background: T.green,
                    color: T.white,
                    px: 3.5,
                    py: 1.25,
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "'Outfit',sans-serif",
                    textTransform: "none",
                    borderRadius: "10px",
                    "&:hover": { background: T.green2 },
                  }}>
                  {t("quiz.openAccount")} →
                </Button>
              </Box>
            )}
          </Box>
        </FadeUp>
      </Box>
    </Box>
  );
}

// ─── EXPERT ASSESSMENT ───────────────────────────────────────
function ExpertAssessment() {
  const { t } = useLanguage("domain2");

  const scores = [
    { label: t("scores.trust"), value: 92, color: T.green },
    { label: t("scores.fees"), value: 90, color: T.green },
    { label: t("scores.platforms"), value: 84, color: T.blue },
    { label: t("scores.mobile"), value: 82, color: T.blue },
    { label: t("scores.support"), value: 78, color: T.amber },
    { label: t("scores.education"), value: 62, color: T.red },
  ];

  return (
    <Box
      sx={{ background: T.bg, py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 } }}
      id='expert'>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <FadeUp>
          <Eyebrow text={t("expert.eyebrow")} />
          <SectionTitle text={t("expert.title")} />
        </FadeUp>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FadeUp delay={0.1}>
              <Typography
                sx={{
                  fontSize: 14,
                  color: T.textSecondary,
                  mb: 2,
                  lineHeight: 1.7,
                }}>
                {t("expert.text1")}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: T.textSecondary,
                  mb: 3,
                  lineHeight: 1.7,
                }}>
                {t("expert.text2")}
              </Typography>
              <Box
                sx={{
                  background: T.white,
                  borderLeft: `3px solid ${T.green}`,
                  borderRadius: "0 12px 12px 0",
                  p: 2.5,
                  boxShadow: "0 1px 4px rgba(0,0,0,.04)",
                }}>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: T.textSecondary,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    mb: 1,
                  }}>
                  {t("expert.verdict")}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, color: T.textPrimary, lineHeight: 1.7 }}>
                  {t("expert.verdictText")}
                </Typography>
              </Box>
            </FadeUp>
          </Grid>

          <Grid item xs={12} md={6}>
            <FadeUp delay={0.15}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  color: T.textPrimary,
                  mb: 2,
                }}>
                {t("expert.scoreBreakdown")}
              </Typography>
              <Stack gap={1.5} mb={3}>
                {scores.map((score) => (
                  <Box key={score.label}>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      mb={0.5}>
                      <Typography sx={{ fontSize: 12, color: T.textSecondary }}>
                        {score.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: score.color,
                        }}>
                        {score.value / 10}
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        height: 6,
                        background: T.borderLight,
                        borderRadius: 3,
                        overflow: "hidden",
                      }}>
                      <Box
                        sx={{
                          width: `${score.value}%`,
                          height: "100%",
                          background: score.color,
                          borderRadius: 3,
                          transition: "width 0.8s ease",
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      background: T.greenBg,
                      borderRadius: "12px",
                      border: `1px solid ${T.greenBorder}`,
                    }}>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: T.green,
                        mb: 1.5,
                      }}>
                      ✓ {t("expert.advantages")}
                    </Typography>
                    {["adv1", "adv2", "adv3", "adv4", "adv5"].map((adv) => (
                      <Stack
                        key={adv}
                        direction='row'
                        alignItems='center'
                        gap={0.75}
                        sx={{ py: 0.5 }}>
                        <Typography sx={{ color: T.green, fontSize: 12 }}>
                          ✓
                        </Typography>
                        <Typography
                          sx={{ fontSize: 12, color: T.textSecondary }}>
                          {t(`expert.${adv}`)}
                        </Typography>
                      </Stack>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      background: T.redLight,
                      borderRadius: "12px",
                      border: "1px solid #F7C1C1",
                    }}>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: T.redText,
                        mb: 1.5,
                      }}>
                      ✕ {t("expert.disadvantages")}
                    </Typography>
                    {["dis1", "dis2"].map((dis) => (
                      <Stack
                        key={dis}
                        direction='row'
                        alignItems='center'
                        gap={0.75}
                        sx={{ py: 0.5 }}>
                        <Typography sx={{ color: T.redText, fontSize: 12 }}>
                          ✕
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: T.redText }}>
                          {t(`expert.${dis}`)}
                        </Typography>
                      </Stack>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </FadeUp>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// ─── TRUST & SAFETY ──────────────────────────────────────────
function TrustSafety() {
  const { t } = useLanguage("domain2");

  const regulations = [
    { name: "CySEC", active: true },
    { name: "FCA", active: true },
    { name: "FSA (SC)", active: true },
    { name: "FSCA", active: true },
    { name: "FSC", active: true },
    { name: "CBCS", active: true },
    { name: "ASIC", active: false },
    { name: "DFSA", active: false },
    { name: "JFSA", active: false },
  ];

  const instruments = [
    { name: t("instruments.forex"), active: true },
    { name: t("instruments.commodities"), active: true },
    { name: t("instruments.indices"), active: true },
    { name: t("instruments.stocks"), active: true },
    { name: t("instruments.crypto"), active: true },
    { name: t("instruments.etfs"), active: false },
    { name: t("instruments.bonds"), active: false },
    { name: t("instruments.options"), active: false },
  ];

  return (
    <Box
      sx={{ background: T.white, py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 } }}
      id='trust'>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <FadeUp>
          <Eyebrow text={t("trust.eyebrow")} />
          <SectionTitle text={t("trust.title")} />
        </FadeUp>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FadeUp delay={0.1}>
              <Typography
                sx={{
                  fontSize: 14,
                  color: T.textSecondary,
                  mb: 2,
                  lineHeight: 1.7,
                }}>
                {t("trust.text1")}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: T.textSecondary,
                  mb: 3,
                  lineHeight: 1.7,
                }}>
                {t("trust.text2")}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  color: T.textPrimary,
                  mb: 1.5,
                }}>
                {t("trust.regulatory")}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {regulations.map((reg) => (
                  <Box
                    key={reg.name}
                    sx={{
                      px: 1.5,
                      py: 0.75,
                      borderRadius: "8px",
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "'Outfit',sans-serif",
                      background: reg.active ? T.greenBg : T.bg,
                      color: reg.active ? T.green : T.textSecondary,
                      border: `1px solid ${
                        reg.active ? T.greenBorder : T.borderLight
                      }`,
                    }}>
                    {reg.active ? "✓ " : "✕ "}
                    {reg.name}
                  </Box>
                ))}
              </Box>
            </FadeUp>
          </Grid>

          <Grid item xs={12} md={6}>
            <FadeUp delay={0.15}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  color: T.textPrimary,
                  mb: 1.5,
                }}>
                {t("trust.instruments")}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                {instruments.map((inst) => (
                  <Box
                    key={inst.name}
                    sx={{
                      px: 1.5,
                      py: 0.75,
                      borderRadius: "8px",
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "'Outfit',sans-serif",
                      background: inst.active ? T.greenBg : T.bg,
                      color: inst.active ? T.green : T.textSecondary,
                      border: `1px solid ${
                        inst.active ? T.greenBorder : T.borderLight
                      }`,
                    }}>
                    {inst.active ? "✓ " : "✕ "}
                    {inst.name}
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  p: 2.5,
                  background: T.bgDark,
                  borderRadius: "16px",
                }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "'Outfit',sans-serif",
                    color: T.textLight,
                    mb: 1,
                  }}>
                  {t("trust.segregated")}
                </Typography>
                <Typography
                  sx={{ fontSize: 13, color: T.textDim, lineHeight: 1.7 }}>
                  {t("trust.segregatedText")}
                </Typography>
              </Box>
            </FadeUp>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// ─── ACCOUNT TYPES ───────────────────────────────────────────
function AccountTypes() {
  const { t } = useLanguage("domain2");

  const accounts = [
    { name: t("accounts.cent"), desc: t("accounts.centDesc") },
    {
      name: t("accounts.standard"),
      desc: t("accounts.standardDesc"),
      popular: true,
    },
    { name: t("accounts.pro"), desc: t("accounts.proDesc") },
    { name: t("accounts.zero"), desc: t("accounts.zeroDesc") },
    { name: t("accounts.raw"), desc: t("accounts.rawDesc") },
  ];

  const fees = [
    { val: "$0", lbl: t("fees.account") },
    { val: "$0", lbl: t("fees.inactivity") },
    { val: "$0", lbl: t("fees.deposit") },
    { val: "0.3", lbl: t("fees.eurusd") },
  ];

  const features = [
    t("features.instant"),
    t("features.swapFree"),
    t("features.social"),
    t("features.vps"),
    t("features.negative"),
    t("features.copy"),
  ];

  return (
    <Box
      sx={{ background: T.bg, py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 } }}
      id='accounts'>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <FadeUp>
          <Eyebrow text={t("accounts.eyebrow")} />
          <SectionTitle text={t("accounts.title")} />
          <Typography
            sx={{ fontSize: 14, color: T.textSecondary, mb: 4, maxWidth: 520 }}>
            {t("accounts.sub")}
          </Typography>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Grid container spacing={2}>
            {accounts.map((acc, i) => (
              <Grid item xs={12} sm={4} md={2.4} key={i}>
                <Box
                  sx={{
                    p: 2.5,
                    border: acc.popular
                      ? `2px solid ${T.green}`
                      : `1px solid ${T.borderLight}`,
                    borderRadius: "16px",
                    background: T.white,
                    height: "100%",
                    position: "relative",
                    transition: "transform .2s, box-shadow .2s",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,.08)",
                    },
                  }}>
                  {acc.popular && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -10,
                        left: 16,
                        background: T.green,
                        color: T.white,
                        fontSize: 10,
                        fontWeight: 700,
                        px: 1.5,
                        py: 0.4,
                        borderRadius: "20px",
                        fontFamily: "'Outfit',sans-serif",
                      }}>
                      {t("accounts.popular")}
                    </Box>
                  )}
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 800,
                      fontFamily: "'Outfit',sans-serif",
                      color: T.textPrimary,
                      mb: 1,
                      mt: acc.popular ? 1 : 0,
                    }}>
                    {acc.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: T.textSecondary,
                      lineHeight: 1.6,
                    }}>
                    {acc.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </FadeUp>

        <FadeUp delay={0.2}>
          <Divider sx={{ my: 4, borderColor: T.borderLight }} />
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  color: T.textPrimary,
                  mb: 2,
                }}>
                {t("fees.title")}
              </Typography>
              <Grid container spacing={1.5}>
                {fees.map((fee, i) => (
                  <Grid item xs={6} sm={3} key={i}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1.5,
                        border: `1px solid ${T.borderLight}`,
                        borderRadius: "12px",
                        background: T.white,
                      }}>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: fee.val === "$0" ? T.green : T.textPrimary,
                        }}>
                        {fee.val}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: T.textSecondary }}>
                        {fee.lbl}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Typography sx={{ fontSize: 12, color: T.textSecondary, mt: 2 }}>
                {t("fees.note")}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  color: T.textPrimary,
                  mb: 2,
                }}>
                {t("features.title")}
              </Typography>
              <Grid container spacing={1.5}>
                {features.map((feature, i) => (
                  <Grid item xs={6} key={i}>
                    <Box
                      sx={{
                        p: 1.5,
                        background: T.bgDark,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}>
                      <Typography sx={{ fontSize: 16 }}>⚡</Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: T.textLight,
                        }}>
                        {feature}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </FadeUp>
      </Box>
    </Box>
  );
}

// ─── COMPARISON TABLE ────────────────────────────────────────
function ComparisonTable() {
  const { t } = useLanguage("domain2");
  const { navTo, isLoading } = useLinks();

  const rows = [
    {
      feature: t("compare.minDeposit"),
      exness: "$10",
      xm: "$5",
      ic: "$200",
      exnessHighlight: true,
    },
    {
      feature: t("compare.eurusdSpread"),
      exness: "0.3 pip",
      xm: "1.6 pip",
      ic: "0.1 pip",
      exnessHighlight: true,
      exnessColor: T.green,
    },
    {
      feature: t("compare.xauusdSpread"),
      exness: "0.3 pip",
      xm: "1.2 pip",
      ic: "0.2 pip",
      exnessHighlight: true,
      exnessColor: T.green,
    },
    {
      feature: t("compare.maxLeverage"),
      exness: "1:2000",
      xm: "1:888",
      ic: "1:500",
      exnessHighlight: true,
    },
    {
      feature: t("compare.withdrawalSpeed"),
      exness: t("compare.instant"),
      xm: "1–3 days",
      ic: "1–2 days",
      exnessHighlight: true,
      exnessTag: "green",
    },
    {
      feature: t("compare.regulation"),
      exness: "6 licenses",
      xm: "5 licenses",
      ic: "3 licenses",
      exnessHighlight: true,
      exnessTag: "blue",
    },
    {
      feature: t("compare.swapFree"),
      exness: t("compare.allAccounts"),
      xm: t("compare.islamicOnly"),
      ic: t("compare.no"),
      exnessHighlight: true,
    },
    {
      feature: t("compare.mt5"),
      exness: t("compare.yes"),
      xm: t("compare.yes"),
      ic: t("compare.yes"),
      exnessHighlight: true,
    },
  ];

  return (
    <Box
      sx={{ background: T.white, py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 } }}
      id='compare'>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <FadeUp>
          <Eyebrow text={t("compare.eyebrow")} />
          <SectionTitle text={t("compare.title")} />
          <Typography
            sx={{ fontSize: 14, color: T.textSecondary, mb: 4, maxWidth: 520 }}>
            {t("compare.sub")}
          </Typography>
        </FadeUp>

        <FadeUp delay={0.1}>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "0 2px 12px rgba(0,0,0,.05)",
              borderRadius: "16px",
              overflowX: "auto",
            }}>
            <Table sx={{ minWidth: 500 }}>
              <TableHead>
                <TableRow sx={{ background: T.bgDark }}>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: 11,
                      color: T.textDimmer,
                      textTransform: "uppercase",
                      borderBottom: "none",
                      py: 2,
                    }}>
                    {t("compare.feature")}
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{
                      color: T.green,
                      fontWeight: 700,
                      fontSize: 11,
                      borderBottom: "none",
                      py: 2,
                    }}>
                    Exness
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{
                      fontSize: 11,
                      color: T.textDimmer,
                      borderBottom: "none",
                      py: 2,
                    }}>
                    XM
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{
                      fontSize: 11,
                      color: T.textDimmer,
                      borderBottom: "none",
                      py: 2,
                    }}>
                    IC Markets
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      "&:hover": { background: T.bg },
                      borderBottom: `1px solid ${T.borderLight}`,
                    }}>
                    <TableCell
                      sx={{
                        fontSize: 13,
                        color: T.textSecondary,
                        borderBottom: "none",
                        py: 1.5,
                      }}>
                      {row.feature}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontWeight: 600,
                        color:
                          row.exnessColor ||
                          (row.exnessHighlight ? T.green : T.textPrimary),
                        borderBottom: "none",
                        py: 1.5,
                      }}>
                      {row.exnessTag ? (
                        <TagChip
                          label={row.exness}
                          color={row.exnessTag as any}
                        />
                      ) : (
                        row.exness
                      )}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: 13,
                        color: T.textSecondary,
                        borderBottom: "none",
                        py: 1.5,
                      }}>
                      {row.xm}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: 13,
                        color: T.textSecondary,
                        borderBottom: "none",
                        py: 1.5,
                      }}>
                      {row.ic}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </FadeUp>

        <FadeUp delay={0.15}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
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
                borderRadius: "10px",
                "&:hover": { background: T.green2 },
              }}>
              {t("compare.openAccount")} →
            </Button>
          </Box>
        </FadeUp>
      </Box>
    </Box>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────
function Testimonials() {
  const { t } = useLanguage("domain2");

  const testimonials = [
    {
      name: t("testimonials.t1name"),
      location: t("testimonials.t1location"),
      text: t("testimonials.t1text"),
      rating: 5,
      initials: "AS",
    },
    {
      name: t("testimonials.t2name"),
      location: t("testimonials.t2location"),
      text: t("testimonials.t2text"),
      rating: 4,
      initials: "KP",
    },
    {
      name: t("testimonials.t3name"),
      location: t("testimonials.t3location"),
      text: t("testimonials.t3text"),
      rating: 5,
      initials: "MR",
    },
    {
      name: t("testimonials.t4name"),
      location: t("testimonials.t4location"),
      text: t("testimonials.t4text"),
      rating: 4.5,
      initials: "RP",
    },
  ];

  const colors = [T.greenBg, T.blueLight, T.amberLight, T.redLight];
  const textColors = [T.green, T.blueText, T.amberText, T.redText];

  return (
    <Box
      sx={{ background: T.bg, py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 } }}
      id='reviews'>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <FadeUp>
          <Eyebrow text={t("testimonials.eyebrow")} />
          <SectionTitle text={t("testimonials.title")} />
          <Typography
            sx={{ fontSize: 14, color: T.textSecondary, mb: 4, maxWidth: 520 }}>
            {t("testimonials.sub")}
          </Typography>
        </FadeUp>

        <Grid container spacing={2}>
          {testimonials.map((t2, i) => (
            <Grid item xs={12} md={6} key={i}>
              <FadeUp delay={i * 0.08}>
                <Box
                  sx={{
                    borderLeft: `3px solid ${T.green}`,
                    p: 2.5,
                    background: T.white,
                    borderRadius: "0 16px 16px 0",
                    boxShadow: "0 1px 4px rgba(0,0,0,.04)",
                  }}>
                  <Stack direction='row' alignItems='center' gap={1.5} mb={1.5}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: colors[i % colors.length],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        color: textColors[i % textColors.length],
                      }}>
                      {t2.initials}
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 700,
                          fontFamily: "'Outfit',sans-serif",
                          color: T.textPrimary,
                        }}>
                        {t2.name}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: T.textSecondary }}>
                        {t2.location}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: "auto" }}>
                      <Stars rating={t2.rating} />
                    </Box>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: T.textSecondary,
                      lineHeight: 1.7,
                      fontStyle: "italic",
                    }}>
                    "{t2.text}"
                  </Typography>
                </Box>
              </FadeUp>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// ─── PLATFORMS SECTION ───────────────────────────────────────
function PlatformsSection() {
  const { t } = useLanguage("domain2");

  const platforms = [
    { name: t("platforms.mt4"), desc: t("platforms.mt4Desc") },
    { name: t("platforms.mt5"), desc: t("platforms.mt5Desc") },
    { name: t("platforms.terminal"), desc: t("platforms.terminalDesc") },
    { name: t("platforms.app"), desc: t("platforms.appDesc") },
  ];

  const paymentMethods = [
    t("payment.methods"),
    t("payment.noFees"),
    t("payment.instant"),
    t("payment.minDeposit"),
  ];
  const support = [
    t("support.chat"),
    t("support.languages"),
    t("support.managers"),
  ];

  return (
    <Box
      sx={{ background: T.white, py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FadeUp>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  color: T.textPrimary,
                  mb: 2.5,
                }}>
                {t("platforms.title")}
              </Typography>
              <Stack gap={1.5}>
                {platforms.map((p, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      p: 2,
                      background: T.bg,
                      borderRadius: "12px",
                      border: `1px solid ${T.borderLight}`,
                    }}>
                    <Typography
                      sx={{ color: T.green, fontWeight: 700, fontSize: 14 }}>
                      ✓
                    </Typography>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 700,
                          fontFamily: "'Outfit',sans-serif",
                          color: T.textPrimary,
                        }}>
                        {p.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: T.textSecondary }}>
                        {p.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </FadeUp>
          </Grid>

          <Grid item xs={12} md={6}>
            <FadeUp delay={0.1}>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  color: T.textPrimary,
                  mb: 2.5,
                }}>
                {t("payment.title")}
              </Typography>
              <Stack gap={1} mb={3}>
                {paymentMethods.map((method, i) => (
                  <Stack key={i} direction='row' alignItems='center' gap={1}>
                    <Typography sx={{ color: T.green, fontSize: 14 }}>
                      ✓
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: T.textSecondary }}>
                      {method}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  color: T.textPrimary,
                  mb: 2.5,
                  mt: 2,
                }}>
                {t("support.title")}
              </Typography>
              <Stack gap={1}>
                {support.map((item, i) => (
                  <Stack key={i} direction='row' alignItems='center' gap={1}>
                    <Typography sx={{ color: T.green, fontSize: 14 }}>
                      ✓
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: T.textSecondary }}>
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </FadeUp>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// ─── CONCLUSION ──────────────────────────────────────────────
function Conclusion() {
  const { navTo, isLoading } = useLinks();
  const { t } = useLanguage("domain2");

  return (
    <Box
      sx={{ background: T.bgDark, py: { xs: 7, md: 9 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1140, mx: "auto", textAlign: "center" }}>
        <FadeUp>
          <SectionTitle text={t("conclusion.title")} dark />
          <Typography
            sx={{
              fontSize: 14,
              color: T.textDim,
              lineHeight: 1.7,
              maxWidth: 600,
              mx: "auto",
              mb: 3,
            }}>
            {t("conclusion.text1")}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: T.textDim,
              lineHeight: 1.7,
              maxWidth: 600,
              mx: "auto",
              mb: 4,
            }}>
            {t("conclusion.text2")}
          </Typography>
          <Button
            onClick={() => navTo("register")}
            disabled={isLoading}
            sx={{
              background: T.green,
              color: T.white,
              px: 4.5,
              py: 1.5,
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "'Outfit',sans-serif",
              textTransform: "none",
              borderRadius: "12px",
              "&:hover": {
                background: T.green2,
                transform: "translateY(-1px)",
              },
              transition: "all .2s",
            }}>
            {t("conclusion.openAccount")} →
          </Button>
        </FadeUp>
      </Box>
    </Box>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────
function FAQ() {
  const { t } = useLanguage("domain2");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box
      sx={{ background: T.white, py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 } }}
      id='faq'>
      <Box sx={{ maxWidth: 1140, mx: "auto" }}>
        <FadeUp>
          <Eyebrow text={t("faq.eyebrow")} />
          <SectionTitle text={t("faq.title")} />
        </FadeUp>

        <FadeUp delay={0.1}>
          <Stack>
            {faqs.map((faq, i) => (
              <Box
                key={i}
                sx={{
                  borderBottom:
                    i < faqs.length - 1 ? `1px solid ${T.borderLight}` : "none",
                }}>
                <Box
                  onClick={() => toggleFaq(i)}
                  sx={{
                    py: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "'Outfit',sans-serif",
                      color: T.textPrimary,
                    }}>
                    {faq.q}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: T.textSecondary,
                      transform: openIndex === i ? "rotate(180deg)" : "none",
                      transition: "transform .3s",
                    }}>
                    ▾
                  </Typography>
                </Box>
                <Collapse in={openIndex === i}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: T.textSecondary,
                      lineHeight: 1.8,
                      pb: 2,
                    }}>
                    {faq.a}
                  </Typography>
                </Collapse>
              </Box>
            ))}
          </Stack>
        </FadeUp>
      </Box>
    </Box>
  );
}

// ─── DISCLAIMER ──────────────────────────────────────────────
function Disclaimer() {
  const { t } = useLanguage("domain2");
  return (
    <Box
      sx={{
        py: 3,
        px: { xs: 2, md: 4 },
        background: T.bgDark,
        borderTop: `1px solid ${T.borderDark}`,
      }}>
      <Box
        sx={{
          maxWidth: 1140,
          mx: "auto",
          fontSize: 11,
          color: T.textDimmer,
          lineHeight: 1.7,
        }}>
        <strong>{t("disclaimer.title")}</strong> {t("disclaimer.text")}
      </Box>
    </Box>
  );
}

// ─── STICKY MOBILE BOTTOM ────────────────────────────────────
function StickyBottom() {
  const { t } = useLanguage("domain2");
  const { navTo, isLoading } = useLinks();

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
export default function ExnessReviewPageView() {
  return (
    <Box
      sx={{
        background: T.white,
        color: T.textPrimary,
        fontFamily: "'DM Sans',sans-serif",
        fontSize: 15,
        lineHeight: 1.7,
        minHeight: "100vh",
        pb: { xs: 8, sm: 0 },
      }}>
      <NavBar />
      <Breadcrumb />
      <UrgencyBar />
      <Hero />
      <StickyNav />
      <QuizSection />
      <ExpertAssessment />
      <TrustSafety />
      <AccountTypes />
      <ComparisonTable />
      <Testimonials />
      <PlatformsSection />
      <Conclusion />
      <FAQ />
      <Disclaimer />
      <StickyBottom />
    </Box>
  );
}
