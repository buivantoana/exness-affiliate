import { useEffect, useState, useRef } from "react";

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
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
} from "@mui/material";
import { useLinks } from "../../hooks/useLinks";
import LoadingFullscreen from "../../components/Loading";
import { useLanguage } from "../../hooks/useLanguage";
import { useTranslation } from "react-i18next";

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
  navy: "#0f172a",
  navy2: "#1e293b",
  navy3: "#334155",
  yellow: "#FFDE02",
  yellow2: "#FFE94D",
  green: "#1D9E75",
  greenLight: "#EAF3DE",
  greenText: "#3B6D11",
  blue: "#185FA5",
  blueLight: "#E6F1FB",
  blueText: "#0C447C",
  red: "#E24B4A",
  redLight: "#FCEBEB",
  redText: "#A32D2D",
  amber: "#EF9F27",
  amberLight: "#FAEEDA",
  amberText: "#854F0B",
  gray: "#F1EFE8",
  grayText: "#5F5E5A",
  border: "#e2e8f0",
  text: "#0f172a",
  text2: "#475569",
  text3: "#94a3b8",
  bg: "#f8fafc",
  white: "#ffffff",
  radius: "8px",
  radiusLg: "12px",
};

// ─── HELPERS ──────────────────────────────────────────────────

const TagChip = ({
  label,
  color,
}: {
  label: string;
  color: "green" | "blue" | "amber" | "red" | "gray";
}) => {
  const styles = {
    green: { bg: T.greenLight, text: T.greenText },
    blue: { bg: T.blueLight, text: T.blueText },
    amber: { bg: T.amberLight, text: T.amberText },
    red: { bg: T.redLight, text: T.redText },
    gray: { bg: T.gray, text: T.grayText },
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
        fontFamily: "'Sora',sans-serif",
        background: s.bg,
        color: s.text,
      }}>
      {label}
    </Box>
  );
};

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

// ─── TOP NAV ──────────────────────────────────────────────────
function TopNav() {
  const { t, changeLanguage, currentLanguage } = useLanguage();

  return (
    <Box
      sx={{
        background: T.white,
        borderBottom: `1px solid ${T.border}`,
        px: 2,
        height: 52,
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 2.5,
        }}>
        <Stack direction='row' alignItems='center' gap={1}>
          <Box
            sx={{
              width: 28,
              height: 28,
              background: T.navy,
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.yellow,
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "'Sora',sans-serif",
            }}>
            FX
          </Box>
          <Typography
            sx={{
              fontFamily: "'Sora',sans-serif",
              fontWeight: 700,
              fontSize: 17,
              color: T.navy,
            }}>
            ExpertReview
          </Typography>
        </Stack>

        <Stack direction='row' gap={2.5} sx={{ ml: 2 }}>
          <Typography
            sx={{
              fontSize: 12,
              color: T.text2,
              fontFamily: "'Sora',sans-serif",
              fontWeight: 500,
              cursor: "pointer",
            }}>
            {t("nav.brokers")}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: T.text2,
              fontFamily: "'Sora',sans-serif",
              fontWeight: 500,
              cursor: "pointer",
            }}>
            {t("nav.compare")}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: T.text2,
              fontFamily: "'Sora',sans-serif",
              fontWeight: 500,
              cursor: "pointer",
            }}>
            {t("nav.education")}
          </Typography>
        </Stack>

        <Box sx={{ ml: "auto" }}>
          <Select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            size='small'
            sx={{
              fontSize: 11,
              color: T.text2,
              height: 28,
              minWidth: 70,
              fontFamily: "'Sora',sans-serif",
              borderRadius: "100px",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
              "& .MuiSelect-select": {
                py: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              },
            }}>
            {LANGUAGES.map((lang) => (
              <MenuItem key={lang.code} value={lang.code} sx={{ fontSize: 11 }}>
                🌐 {lang.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Box>
  );
}

// ─── BREADCRUMB ──────────────────────────────────────────────
function Breadcrumb() {
  const { t } = useLanguage();
  return (
    <Box
      sx={{
        py: 1.5,
        px: 2.5,
        background: T.white,
        borderBottom: `1px solid ${T.border}`,
      }}>
      <Box sx={{ maxWidth: 900, mx: "auto", fontSize: 12, color: T.text3 }}>
        {t("breadcrumb.home")}{" "}
        <span style={{ margin: "0 6px", color: T.text3 }}>/</span>{" "}
        {t("breadcrumb.brokers")}{" "}
        <span style={{ margin: "0 6px", color: T.text3 }}>/</span>
        <span style={{ color: T.navy, fontWeight: 500 }}>
          {t("breadcrumb.current")}
        </span>
      </Box>
    </Box>
  );
}

// ─── URGENCY BAR ────────────────────────────────────────────
function UrgencyBar() {
  const { t } = useLanguage();
  const [viewers, setViewers] = useState(247);
  const [openers, setOpeners] = useState(38);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) =>
        Math.max(100, prev + Math.floor(Math.random() * 5) - 2)
      );
      if (Math.random() > 0.7) setOpeners((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        background: T.amberLight,
        borderBottom: "1px solid #FAC775",
        py: 1,
        px: 2.5,
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
          fontFamily: "'Sora',sans-serif",
        }}>
        <strong>{viewers}</strong> {t("urgency.viewing")} ·{" "}
        <strong>{openers}</strong> {t("urgency.opened")}
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
        background: T.white,
        py: 3.5,
        px: 2.5,
        borderBottom: `1px solid ${T.border}`,
      }}>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Stack direction={isMobile ? "column" : "row"} gap={2} mb={2.5}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "12px",
              background: T.navy,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
              fontFamily: "'Sora',sans-serif",
              color: T.yellow,
              flexShrink: 0,
            }}>
            Ex
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: 20, sm: 28 },
                fontFamily: "'Sora',sans-serif",
                fontWeight: 700,
                color: T.navy,
                mb: 0.5,
              }}>
              {t("hero.title")}
            </Typography>
            <Typography sx={{ fontSize: 13, color: T.text2 }}>
              {t("hero.sub")}
            </Typography>
            <Stack direction='row' alignItems='center' gap={1.5} mt={1}>
              <Stars rating={4.5} />
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 700,
                  fontFamily: "'Sora',sans-serif",
                  color: T.navy,
                }}>
                4.5
              </Typography>
              <Typography sx={{ fontSize: 12, color: T.text3 }}>
                / 5 {t("hero.overall")}
              </Typography>
              <TagChip label={t("hero.regulated")} color='green' />
            </Stack>
            <Stack direction='row' alignItems='center' gap={0.5} mt={1}>
              <svg
                width='12'
                height='12'
                viewBox='0 0 24 24'
                fill='none'
                stroke={T.text3}
                strokeWidth='2'>
                <circle cx='12' cy='12' r='10' />
                <polyline points='12,6 12,12 16,14' />
              </svg>
              <Typography sx={{ fontSize: 11, color: T.text3 }}>
                {t("hero.updated")}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Metrics */}
        <Grid container spacing={1} sx={{ mb: 2.5 }}>
          {[
            { val: "$10", lbl: t("hero.minDeposit") },
            {
              val: t("hero.instant"),
              lbl: t("hero.withdrawal"),
              color: T.green,
            },
            { val: "1:2000", lbl: t("hero.maxLeverage") },
            { val: "6", lbl: t("hero.licenses") },
          ].map((m, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <Box
                sx={{
                  background: T.bg,
                  borderRadius: T.radius,
                  p: 1.5,
                  textAlign: "center",
                  border: `1px solid ${T.border}`,
                }}>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    fontFamily: "'Sora',sans-serif",
                    color: m.color || T.navy,
                  }}>
                  {m.val}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 10,
                    color: T.text3,
                    mt: 0.5,
                    fontFamily: "'Sora',sans-serif",
                  }}>
                  {m.lbl}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* CTAs */}
        <Stack direction={isMobile ? "column" : "row"} gap={1.5}>
          <Button
            onClick={() => navTo("register")}
            sx={{
              background: T.yellow,
              color: T.navy,
              px: 3,
              py: 1.25,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'Sora',sans-serif",
              textTransform: "none",
              borderRadius: T.radius,
              "&:hover": { background: T.yellow2 },
            }}>
            {t("hero.openAccount")} →
          </Button>
          <Button
            onClick={() => navTo("register")}
            sx={{
              background: "transparent",
              border: `1.5px solid ${T.border}`,
              color: T.text2,
              px: 3,
              py: 1.25,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'Sora',sans-serif",
              textTransform: "none",
              borderRadius: T.radius,
              "&:hover": { borderColor: T.navy3, color: T.navy },
            }}>
            {t("hero.tryDemo")}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

// ─── STICKY NAV ──────────────────────────────────────────────
function StickyNav() {
  const { t } = useLanguage();
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
        borderBottom: `1px solid ${T.border}`,
        px: 2,
        overflowX: "auto",
        whiteSpace: "nowrap",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}>
      <Box sx={{ maxWidth: 900, mx: "auto", display: "flex" }}>
        {sections.map((id, i) => (
          <Box
            key={id}
            onClick={() => scrollTo(id)}
            sx={{
              px: 1.75,
              py: 1.5,
              fontSize: 12,
              color: active === id ? T.blue : T.text2,
              borderBottom:
                active === id ? `2px solid ${T.blue}` : "2px solid transparent",
              cursor: "pointer",
              fontFamily: "'Sora',sans-serif",
              fontWeight: 500,
              transition: "all .2s",
              "&:hover": { color: T.navy },
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
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const { navTo, isLoading /* registerLink, signInLink, ... */ } = useLinks();
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

  const selectOption = (qKey: string, opt: string) => {
    setAnswers((prev) => ({ ...prev, [qKey]: opt }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleResult = () => {
    setShowResult(true);
  };

  const getProgress = () => (step / 3) * 100;

  return (
    <Box
      sx={{
        py: 3.5,
        px: 2.5,
        borderBottom: `1px solid ${T.border}`,
        background: T.white,
      }}
      id='quiz'>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Stack direction='row' alignItems='center' gap={1.5} mb={1}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: T.blueLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: T.blueText,
            }}>
            🎯
          </Box>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "'Sora',sans-serif",
              fontWeight: 700,
              color: T.navy,
            }}>
            {t("quiz.title")}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 13, color: T.text2, mb: 2.5 }}>
          {t("quiz.sub")}
        </Typography>

        <Box
          sx={{
            background: T.bg,
            border: `1px solid ${T.border}`,
            borderRadius: T.radiusLg,
            p: 2.5,
          }}>
          {/* Progress */}
          <Stack direction='row' alignItems='center' gap={1} mb={2}>
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
                        ? T.blue
                        : i === step + 1
                        ? T.blueLight
                        : T.border,
                  }}
                />
              ))}
            </Box>
            <Typography sx={{ fontSize: 10, color: T.text3 }}>
              {t("quiz.step")} {step} {t("quiz.of")} 3
            </Typography>
          </Stack>

          {/* Questions */}
          {!showResult && step === 1 && (
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'Sora',sans-serif",
                  color: T.navy,
                  mb: 1.5,
                }}>
                {questions[0].text}
              </Typography>
              <Stack gap={1}>
                {[
                  { value: "gold", label: t("quiz.optGold"), popular: true },
                  { value: "forex", label: t("quiz.optForex"), popular: false },
                  {
                    value: "crypto",
                    label: t("quiz.optCrypto"),
                    popular: false,
                  },
                ].map((opt) => (
                  <Box
                    key={opt.value}
                    onClick={() => selectOption("q1", opt.value)}
                    sx={{
                      p: 1.25,
                      borderRadius: T.radius,
                      border: `1.5px solid ${
                        answers.q1 === opt.value ? T.blue : T.border
                      }`,
                      background:
                        answers.q1 === opt.value ? T.blueLight : T.white,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.25,
                    }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `1.5px solid ${T.border}`,
                        background:
                          answers.q1 === opt.value ? T.blue : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      {answers.q1 === opt.value && (
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: T.white,
                          }}
                        />
                      )}
                    </Box>
                    <Typography sx={{ fontSize: 13, color: T.text2 }}>
                      {opt.label}
                    </Typography>
                    {opt.popular && (
                      <Box
                        sx={{
                          ml: "auto",
                          background: T.blueLight,
                          color: T.blueText,
                          px: 1,
                          py: 0.25,
                          borderRadius: "100px",
                          fontSize: 10,
                          fontWeight: 600,
                        }}>
                        {t("quiz.popular")}
                      </Box>
                    )}
                  </Box>
                ))}
              </Stack>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  onClick={nextStep}
                  sx={{
                    background: T.yellow,
                    color: T.navy,
                    px: 2.5,
                    py: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: T.radius,
                  }}>
                  {t("quiz.next")} →
                </Button>
              </Box>
            </Box>
          )}

          {!showResult && step === 2 && (
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'Sora',sans-serif",
                  color: T.navy,
                  mb: 1.5,
                }}>
                {questions[1].text}
              </Typography>
              <Stack gap={1}>
                {[
                  {
                    value: "beginner",
                    label: t("quiz.optBeginner"),
                    popular: false,
                  },
                  {
                    value: "intermediate",
                    label: t("quiz.optIntermediate"),
                    popular: true,
                  },
                  {
                    value: "advanced",
                    label: t("quiz.optAdvanced"),
                    popular: false,
                  },
                ].map((opt) => (
                  <Box
                    key={opt.value}
                    onClick={() => selectOption("q2", opt.value)}
                    sx={{
                      p: 1.25,
                      borderRadius: T.radius,
                      border: `1.5px solid ${
                        answers.q2 === opt.value ? T.blue : T.border
                      }`,
                      background:
                        answers.q2 === opt.value ? T.blueLight : T.white,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.25,
                    }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `1.5px solid ${T.border}`,
                        background:
                          answers.q2 === opt.value ? T.blue : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      {answers.q2 === opt.value && (
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: T.white,
                          }}
                        />
                      )}
                    </Box>
                    <Typography sx={{ fontSize: 13, color: T.text2 }}>
                      {opt.label}
                    </Typography>
                    {opt.popular && (
                      <Box
                        sx={{
                          ml: "auto",
                          background: T.blueLight,
                          color: T.blueText,
                          px: 1,
                          py: 0.25,
                          borderRadius: "100px",
                          fontSize: 10,
                          fontWeight: 600,
                        }}>
                        {t("quiz.popular")}
                      </Box>
                    )}
                  </Box>
                ))}
              </Stack>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  onClick={nextStep}
                  sx={{
                    background: T.yellow,
                    color: T.navy,
                    px: 2.5,
                    py: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: T.radius,
                  }}>
                  {t("quiz.next")} →
                </Button>
              </Box>
            </Box>
          )}

          {!showResult && step === 3 && (
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'Sora',sans-serif",
                  color: T.navy,
                  mb: 1.5,
                }}>
                {questions[2].text}
              </Typography>
              <Stack gap={1}>
                {[
                  {
                    value: "spreads",
                    label: t("quiz.optSpreads"),
                    popular: false,
                  },
                  {
                    value: "withdrawals",
                    label: t("quiz.optWithdrawals"),
                    popular: true,
                  },
                  {
                    value: "leverage",
                    label: t("quiz.optLeverage"),
                    popular: false,
                  },
                ].map((opt) => (
                  <Box
                    key={opt.value}
                    onClick={() => selectOption("q3", opt.value)}
                    sx={{
                      p: 1.25,
                      borderRadius: T.radius,
                      border: `1.5px solid ${
                        answers.q3 === opt.value ? T.blue : T.border
                      }`,
                      background:
                        answers.q3 === opt.value ? T.blueLight : T.white,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.25,
                    }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `1.5px solid ${T.border}`,
                        background:
                          answers.q3 === opt.value ? T.blue : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      {answers.q3 === opt.value && (
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: T.white,
                          }}
                        />
                      )}
                    </Box>
                    <Typography sx={{ fontSize: 13, color: T.text2 }}>
                      {opt.label}
                    </Typography>
                    {opt.popular && (
                      <Box
                        sx={{
                          ml: "auto",
                          background: T.blueLight,
                          color: T.blueText,
                          px: 1,
                          py: 0.25,
                          borderRadius: "100px",
                          fontSize: 10,
                          fontWeight: 600,
                        }}>
                        {t("quiz.topPriority")}
                      </Box>
                    )}
                  </Box>
                ))}
              </Stack>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  onClick={handleResult}
                  sx={{
                    background: T.yellow,
                    color: T.navy,
                    px: 2.5,
                    py: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: T.radius,
                  }}>
                  {t("quiz.seeResult")} →
                </Button>
              </Box>
            </Box>
          )}

          {/* Result */}
          {showResult && (
            <Box
              sx={{
                background: T.greenLight,
                border: "1px solid #C0DD97",
                borderRadius: T.radiusLg,
                p: 2,
              }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "'Sora',sans-serif",
                  color: T.greenText,
                  mb: 0.75,
                }}>
                ✓ {t("quiz.resultTitle")}
              </Typography>
              <Typography
                sx={{ fontSize: 12, color: T.greenText, lineHeight: 1.7 }}>
                {t("quiz.resultText")}
              </Typography>
              <Box sx={{ mt: 1.5 }}>
                <Button
                  onClick={() => navTo("register")}
                  sx={{
                    background: T.yellow,
                    color: T.navy,
                    px: 2.5,
                    py: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: T.radius,
                  }}>
                  {t("quiz.openAccount")} →
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// ─── EXPERT ASSESSMENT ───────────────────────────────────────
function ExpertAssessment() {
  const { t } = useLanguage();
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

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
      sx={{
        py: 3.5,
        px: 2.5,
        borderBottom: `1px solid ${T.border}`,
        background: T.bg,
      }}
      id='expert'>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Stack direction='row' alignItems='center' gap={1.5} mb={2}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: T.amberLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: T.amberText,
            }}>
            ★
          </Box>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "'Sora',sans-serif",
              fontWeight: 700,
              color: T.navy,
            }}>
            {t("expert.title")}
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 13, color: T.text2, mb: 1.5 }}>
              {t("expert.text1")}
            </Typography>
            <Typography sx={{ fontSize: 13, color: T.text2, mb: 1.5 }}>
              {t("expert.text2")}
            </Typography>
            <Box
              sx={{
                background: T.bg,
                borderLeft: `3px solid ${T.yellow}`,
                borderRadius: `0 ${T.radius} ${T.radius} 0`,
                p: 1.75,
              }}>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.text3,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  mb: 0.5,
                }}>
                {t("expert.verdict")}
              </Typography>
              <Typography
                sx={{ fontSize: 13, color: T.text2, lineHeight: 1.7 }}>
                {t("expert.verdictText")}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "'Sora',sans-serif",
                color: T.navy,
                mb: 1.5,
              }}>
              {t("expert.scoreBreakdown")}
            </Typography>
            <Stack gap={1.5}>
              {scores.map((score) => (
                <Box key={score.label}>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    mb={0.5}>
                    <Typography sx={{ fontSize: 12, color: T.text2 }}>
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
                      background: T.bg,
                      borderRadius: 3,
                      border: `1px solid ${T.border}`,
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

            {/* Pros & Cons */}
            <Grid container spacing={1.5} sx={{ mt: 1.5 }}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    p: 1.75,
                    background: T.greenLight,
                    borderRadius: T.radius,
                    border: "1px solid #C0DD97",
                  }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: T.greenText,
                      mb: 1,
                    }}>
                    ✓ {t("expert.advantages")}
                  </Typography>
                  {["adv1", "adv2", "adv3", "adv4", "adv5"].map((adv) => (
                    <Stack
                      key={adv}
                      direction='row'
                      alignItems='center'
                      gap={0.75}
                      sx={{ py: 0.25 }}>
                      <Typography sx={{ color: T.greenText, fontSize: 12 }}>
                        ✓
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: T.greenText }}>
                        {t(`expert.${adv}`)}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    p: 1.75,
                    background: T.redLight,
                    borderRadius: T.radius,
                    border: "1px solid #F7C1C1",
                  }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: T.redText,
                      mb: 1,
                    }}>
                    ✕ {t("expert.disadvantages")}
                  </Typography>
                  {["dis1", "dis2"].map((dis) => (
                    <Stack
                      key={dis}
                      direction='row'
                      alignItems='center'
                      gap={0.75}
                      sx={{ py: 0.25 }}>
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// ─── TRUST & SAFETY ──────────────────────────────────────────
function TrustSafety() {
  const { t } = useLanguage();
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
      sx={{
        py: 3.5,
        px: 2.5,
        borderBottom: `1px solid ${T.border}`,
        background: T.white,
      }}
      id='trust'>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Stack direction='row' alignItems='center' gap={1.5} mb={2}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: T.blueLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: T.blueText,
            }}>
            🛡
          </Box>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "'Sora',sans-serif",
              fontWeight: 700,
              color: T.navy,
            }}>
            {t("trust.title")}
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 13, color: T.text2, mb: 1.5 }}>
              {t("trust.text1")}
            </Typography>
            <Typography sx={{ fontSize: 13, color: T.text2, mb: 1.5 }}>
              {t("trust.text2")}
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "'Sora',sans-serif",
                color: T.navy,
                mb: 1,
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
                    borderRadius: "6px",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'Sora',sans-serif",
                    background: reg.active ? T.greenLight : T.gray,
                    color: reg.active ? T.greenText : T.grayText,
                  }}>
                  {reg.active ? "✓ " : "✕ "}
                  {reg.name}
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "'Sora',sans-serif",
                color: T.navy,
                mb: 1,
              }}>
              {t("trust.instruments")}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {instruments.map((inst) => (
                <Box
                  key={inst.name}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    borderRadius: "6px",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'Sora',sans-serif",
                    background: inst.active ? T.greenLight : T.gray,
                    color: inst.active ? T.greenText : T.grayText,
                  }}>
                  {inst.active ? "✓ " : "✕ "}
                  {inst.name}
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                p: 1.75,
                background: T.blueLight,
                borderRadius: T.radius,
                border: "1px solid #B5D4F4",
              }}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "'Sora',sans-serif",
                  color: T.blueText,
                  mb: 0.5,
                }}>
                {t("trust.segregated")}
              </Typography>
              <Typography
                sx={{ fontSize: 12, color: T.blueText, lineHeight: 1.7 }}>
                {t("trust.segregatedText")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// ─── ACCOUNT TYPES ───────────────────────────────────────────
function AccountTypes() {
  const { t } = useLanguage();
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
      sx={{
        py: 3.5,
        px: 2.5,
        borderBottom: `1px solid ${T.border}`,
        background: T.bg,
      }}
      id='accounts'>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Typography
          sx={{
            fontSize: 18,
            fontFamily: "'Sora',sans-serif",
            fontWeight: 700,
            color: T.navy,
            mb: 0.5,
          }}>
          {t("accounts.title")}
        </Typography>
        <Typography sx={{ fontSize: 13, color: T.text2, mb: 2.5 }}>
          {t("accounts.sub")}
        </Typography>

        <Grid container spacing={1.5}>
          {accounts.map((acc, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Box
                sx={{
                  p: 1.75,
                  border: acc.popular
                    ? `2px solid ${T.blue}`
                    : `1px solid ${T.border}`,
                  borderRadius: T.radius,
                  background: T.white,
                }}>
                {acc.popular && (
                  <Box
                    sx={{
                      display: "inline-block",
                      background: T.blueLight,
                      color: T.blueText,
                      fontSize: 10,
                      fontWeight: 700,
                      px: 1,
                      py: 0.25,
                      borderRadius: "4px",
                      mb: 0.75,
                    }}>
                    {t("accounts.popular")}
                  </Box>
                )}
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "'Sora',sans-serif",
                    color: T.navy,
                    mb: 0.5,
                  }}>
                  {acc.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 11, color: T.text2, lineHeight: 1.6 }}>
                  {acc.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 2.5, borderColor: T.border }} />

        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Sora',sans-serif",
                color: T.navy,
                mb: 1.5,
              }}>
              {t("fees.title")}
            </Typography>
            <Grid container spacing={1}>
              {fees.map((fee, i) => (
                <Grid item xs={6} sm={3} key={i}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 1,
                      border: `1px solid ${T.border}`,
                      borderRadius: T.radius,
                    }}>
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: fee.val === "$0" ? T.green : T.navy,
                      }}>
                      {fee.val}
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: T.text3 }}>
                      {fee.lbl}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography sx={{ fontSize: 12, color: T.text2, mt: 1.5 }}>
              {t("fees.note")}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Sora',sans-serif",
                color: T.navy,
                mb: 1.5,
              }}>
              {t("features.title")}
            </Typography>
            <Grid container spacing={1}>
              {features.map((feature, i) => (
                <Grid item xs={6} key={i}>
                  <Box
                    sx={{
                      p: 1,
                      background: T.amberLight,
                      border: "1px solid #FAC775",
                      borderRadius: T.radius,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}>
                    <Typography sx={{ fontSize: 16 }}>⚡</Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: T.amberText,
                      }}>
                      {feature}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// ─── COMPARISON TABLE ────────────────────────────────────────
function ComparisonTable() {
  const { t } = useLanguage();
  const { navTo, isLoading /* registerLink, signInLink, ... */ } = useLinks();
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
      exnessColor: T.greenText,
      icColor: T.redText,
    },
    {
      feature: t("compare.mt5"),
      exness: t("compare.yes"),
      xm: t("compare.yes"),
      ic: t("compare.yes"),
      exnessHighlight: true,
      exnessColor: T.greenText,
    },
  ];

  return (
    <Box
      sx={{
        py: 3.5,
        px: 2.5,
        borderBottom: `1px solid ${T.border}`,
        background: T.white,
      }}
      id='compare'>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Stack direction='row' alignItems='center' gap={1.5} mb={1}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: T.greenLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: T.greenText,
            }}>
            ⊞
          </Box>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "'Sora',sans-serif",
              fontWeight: 700,
              color: T.navy,
            }}>
            {t("compare.title")}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 13, color: T.text2, mb: 2.5 }}>
          {t("compare.sub")}
        </Typography>

        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", overflowX: "auto" }}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead sx={{ bgcolor: "white" }}>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                    color: T.text3,
                    textTransform: "uppercase",
                  }}>
                  {t("compare.feature")}
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    background: T.navy,
                    color: T.yellow,
                    fontWeight: 700,
                    fontSize: 11,
                  }}>
                  Exness
                </TableCell>
                <TableCell align='center' sx={{ fontSize: 11, color: T.text3 }}>
                  XM
                </TableCell>
                <TableCell align='center' sx={{ fontSize: 11, color: T.text3 }}>
                  IC Markets
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ bgcolor: "white" }}>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ fontSize: 13, color: T.text2 }}>
                    {row.feature}
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{
                      fontWeight: 600,
                      color:
                        row.exnessColor ||
                        (row.exnessHighlight ? T.navy : T.text2),
                      background: row.exnessHighlight
                        ? "rgba(15,23,42,.03)"
                        : "transparent",
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
                    sx={{ fontSize: 13, color: T.text2 }}>
                    {row.xm}
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{ fontSize: 13, color: row.icColor || T.text2 }}>
                    {row.ic}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            onClick={() => navTo("register")}
            sx={{
              background: T.yellow,
              color: T.navy,
              px: 2.5,
              py: 1,
              fontSize: 12,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: T.radius,
            }}>
            {t("compare.openAccount")} →
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────
function Testimonials() {
  const { t } = useLanguage();
  const testimonials = [
    {
      name: t("testimonials.t1name"),
      location: t("testimonials.t1location"),
      text: t("testimonials.t1text"),
      rating: 5,
      initials: "AS",
      color: T.blueLight,
      textColor: T.blueText,
    },
    {
      name: t("testimonials.t2name"),
      location: t("testimonials.t2location"),
      text: t("testimonials.t2text"),
      rating: 4,
      initials: "KP",
      color: T.greenLight,
      textColor: T.greenText,
    },
    {
      name: t("testimonials.t3name"),
      location: t("testimonials.t3location"),
      text: t("testimonials.t3text"),
      rating: 5,
      initials: "MR",
      color: T.amberLight,
      textColor: T.amberText,
    },
    {
      name: t("testimonials.t4name"),
      location: t("testimonials.t4location"),
      text: t("testimonials.t4text"),
      rating: 4.5,
      initials: "RP",
      color: T.redLight,
      textColor: T.redText,
    },
  ];

  return (
    <Box
      sx={{
        py: 3.5,
        px: 2.5,
        borderBottom: `1px solid ${T.border}`,
        background: T.bg,
      }}
      id='reviews'>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Stack direction='row' alignItems='center' gap={1.5} mb={1}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: T.amberLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: T.amberText,
            }}>
            💬
          </Box>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "'Sora',sans-serif",
              fontWeight: 700,
              color: T.navy,
            }}>
            {t("testimonials.title")}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 13, color: T.text2, mb: 2.5 }}>
          {t("testimonials.sub")}
        </Typography>

        <Grid container spacing={1.5}>
          {testimonials.map((t2, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Box
                sx={{
                  borderLeft: `3px solid ${T.yellow}`,
                  p: 1.5,
                  background: T.white,
                  borderRadius: `0 ${T.radius} ${T.radius} 0`,
                }}>
                <Stack direction='row' alignItems='center' gap={1} mb={1}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: t2.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      color: t2.textColor,
                    }}>
                    {t2.initials}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: "'Sora',sans-serif",
                        color: T.navy,
                      }}>
                      {t2.name}
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: T.text3 }}>
                      {t2.location}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: "auto" }}>
                    <Stars rating={t2.rating} />
                  </Box>
                </Stack>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: T.text2,
                    lineHeight: 1.7,
                    fontStyle: "italic",
                  }}>
                  "{t2.text}"
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// ─── PLATFORMS SECTION ───────────────────────────────────────
function PlatformsSection() {
  const { t } = useLanguage();
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
      sx={{
        py: 3.5,
        px: 2.5,
        borderBottom: `1px solid ${T.border}`,
        background: T.white,
      }}>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Sora',sans-serif",
                color: T.navy,
                mb: 1.5,
              }}>
              {t("platforms.title")}
            </Typography>
            <Stack gap={1}>
              {platforms.map((p, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    p: 1.25,
                    background: T.bg,
                    borderRadius: T.radius,
                    border: `1px solid ${T.border}`,
                  }}>
                  <Typography sx={{ color: T.greenText, fontWeight: 700 }}>
                    ✓
                  </Typography>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: "'Sora',sans-serif",
                        color: T.navy,
                      }}>
                      {p.name}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: T.text2 }}>
                      {p.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Sora',sans-serif",
                color: T.navy,
                mb: 1.5,
              }}>
              {t("payment.title")}
            </Typography>
            <Stack gap={0.75} mb={2}>
              {paymentMethods.map((method, i) => (
                <Stack key={i} direction='row' alignItems='center' gap={0.75}>
                  <Typography sx={{ color: T.greenText }}>✓</Typography>
                  <Typography sx={{ fontSize: 12, color: T.text2 }}>
                    {method}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Sora',sans-serif",
                color: T.navy,
                mb: 1.5,
                mt: 2,
              }}>
              {t("support.title")}
            </Typography>
            <Stack gap={0.75}>
              {support.map((item, i) => (
                <Stack key={i} direction='row' alignItems='center' gap={0.75}>
                  <Typography sx={{ color: T.greenText }}>✓</Typography>
                  <Typography sx={{ fontSize: 12, color: T.text2 }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// ─── CONCLUSION ──────────────────────────────────────────────
function Conclusion() {
  const { navTo, isLoading /* registerLink, signInLink, ... */ } = useLinks();
  const { t } = useLanguage();
  return (
    <Box
      sx={{
        py: 3.5,
        px: 2.5,
        borderBottom: `1px solid ${T.border}`,
        background: T.bg,
      }}>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Typography
          sx={{
            fontSize: 18,
            fontFamily: "'Sora',sans-serif",
            fontWeight: 700,
            color: T.navy,
            mb: 1.5,
          }}>
          {t("conclusion.title")}
        </Typography>
        <Typography sx={{ fontSize: 13, color: T.text2, mb: 1.5 }}>
          {t("conclusion.text1")}
        </Typography>
        <Typography sx={{ fontSize: 13, color: T.text2, mb: 2 }}>
          {t("conclusion.text2")}
        </Typography>
        <Box
          sx={{
            background: T.amberLight,
            border: "1px solid #FAC775",
            borderRadius: T.radiusLg,
            p: 2.5,
            textAlign: "center",
          }}>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "'Sora',sans-serif",
              color: T.amberText,
              mb: 1.5,
            }}>
            {t("conclusion.ctaTitle")}
          </Typography>
          <Button
            onClick={() => navTo("register")}
            sx={{
              background: T.yellow,
              color: T.navy,
              px: 3,
              py: 1.25,
              fontSize: 13,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: T.radius,
            }}>
            {t("conclusion.openAccount")} →
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────
function FAQ() {
  const { t } = useLanguage();
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
      sx={{
        py: 3.5,
        px: 2.5,
        borderBottom: `1px solid ${T.border}`,
        background: T.white,
      }}
      id='faq'>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Typography
          sx={{
            fontSize: 18,
            fontFamily: "'Sora',sans-serif",
            fontWeight: 700,
            color: T.navy,
            mb: 2,
          }}>
          {t("faq.title")}
        </Typography>
        <Stack>
          {faqs.map((faq, i) => (
            <Box
              key={i}
              sx={{
                borderBottom:
                  i < faqs.length - 1 ? `1px solid ${T.border}` : "none",
              }}>
              <Box
                onClick={() => toggleFaq(i)}
                sx={{
                  py: 1.75,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Sora',sans-serif",
                    color: T.navy,
                  }}>
                  {faq.q}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: T.text3,
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
                    color: T.text2,
                    lineHeight: 1.8,
                    pb: 1.75,
                  }}>
                  {faq.a}
                </Typography>
              </Collapse>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// ─── DISCLAIMER ──────────────────────────────────────────────
function Disclaimer() {
  const { t } = useLanguage();
  return (
    <Box
      sx={{
        py: 2.5,
        px: 2.5,
        background: T.bg,
        borderTop: `1px solid ${T.border}`,
      }}>
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          fontSize: 11,
          color: T.text3,
          lineHeight: 1.7,
        }}>
        <strong>{t("disclaimer.title")}</strong> {t("disclaimer.text")}
      </Box>
    </Box>
  );
}

// ─── STICKY BOTTOM MOBILE ────────────────────────────────────
function StickyBottomMobile() {
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
        background: T.white,
        borderTop: `1px solid ${T.border}`,
        p: 1.5,
        zIndex: 99,
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 -4px 20px rgba(0,0,0,.06)",
      }}>
      <Box>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "'Sora',sans-serif",
            color: T.navy,
          }}>
          {t("sticky.title")}
        </Typography>
        <Typography sx={{ fontSize: 11, color: T.text3 }}>
          {t("sticky.sub")}
        </Typography>
      </Box>
      <Button
        onClick={() => navTo("register")}
        sx={{
          background: T.yellow,
          color: T.navy,
          px: 2.5,
          py: 1,
          fontSize: 12,
          fontWeight: 600,
          textTransform: "none",
          borderRadius: T.radius,
          whiteSpace: "nowrap",
        }}>
        {t("sticky.btn")} →
      </Button>
    </Box>
  );
}

// ─── ROOT COMPONENT ─────────────────────────────────────────
export default function ReviewPageView() {
  const { navTo, isLoading /* registerLink, signInLink, ... */ } = useLinks();
  if (isLoading) return <LoadingFullscreen />;
  return (
    <Box
      sx={{
        background: T.white,
        color: T.text,
        fontFamily: "'DM Sans',sans-serif",
        fontSize: 15,
        lineHeight: 1.7,
        pb: { xs: 8, sm: 0 },
      }}>
      <TopNav />
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
      <StickyBottomMobile />
    </Box>
  );
}
