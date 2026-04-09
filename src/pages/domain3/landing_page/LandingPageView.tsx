// LandingPageView.tsx
import { useEffect, useRef, useState } from "react";
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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Badge,
    alpha,
} from "@mui/material";

import { useLanguage } from "../../../hooks/useLanguage";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PublicIcon from "@mui/icons-material/Public";
import { useTranslation } from "react-i18next";
import { useLinks } from "../../../hooks/useLinks";
import logo from "../../../images/logo.jpg"
import logovideo from "../../../images/video-background-20250111070639-zhtun_1760591475746-CnYB6K05.mp4"
import dowloadgg from "../../../images/CH Play_1764291260495-CLpIlzwJ.jpg"
import dowloadios from "../../../images/ios_1764291249190-DiSoXZSv.jpg"
import trandingapp from "../../../images/trading-apps.jpg"
import security from "../../../images/security-protection.jpg"
import section1 from "../../../images/xxl_Why_professional_traders_choose_Exness_for_crypto_CFD_trading_889a91ed91_1764266621186-B_afDlTq.webp"
import section2 from "../../../images/xxl_BTCUSD_traders_save_up_to_79_with_Exness_3730259c0e_1764266630393-D8B3wo19.webp"
import section3 from "../../../images/xxl_6587_Blog_banner_Connect_Partner_Event_ZA_Ooffice_opening_600x400x2_1266925df4_1764266636955-C2KTuJ-T.webp"
// ─── LANGUAGE CONFIG ─────────────────────────────────────────────
const LANGUAGES = [
    { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
    { code: "vi", label: "VI", name: "Vietnamese", flag: "🇻🇳" },
    { code: "ar", label: "AR", name: "Arabic", flag: "🇸🇦" },
    { code: "ja", label: "JA", name: "Japanese", flag: "🇯🇵" },
    { code: "th", label: "TH", name: "Thailand", flag: "🇹🇭" },
    { code: "zh", label: "ZH", name: "Chinese", flag: "🇨🇳" },
    { code: "id", label: "ID", name: "Indonesian", flag: "🇮🇩" },
];

// ─── THEME TOKENS ──────────────────────────────────────────────
const T = {
    white: "#ffffff",
    black: "#0e0e0e",
    blackPearl: "#071020",
    cloudBurst: "#1D2941",
    slateGray: "#6C8595",
    silverChalice: "#A0A0A0",
    emperor: "#525252",
    tundora: "#464646",
    gray: "#878787",
    mercury: "#E8E8E8",
    brightSun: "#FFD841",
    brightSunDark: "#FFDE02",
    yellow: "#FFDE02",
    yellow2: "#FFE433",
    border: "rgba(0,0,0,0.08)",
    borderLight: "#e0e0e0",
    green: "#1D9E75",
    green2: "#4ade80",
    blue: "#185FA5",
    blue2: "#93c5fd",
    amber: "#EF9F27",
    dim: "rgba(0,0,0,0.65)",
    dimmer: "rgba(0,0,0,0.35)",
};

// ─── HELPERS ──────────────────────────────────────────────────
const TagChip = ({ label, color }: { label: string; color: "green" | "yellow" | "blue" | "gray" }) => {
    const styles = {
        green: { bg: "rgba(29,158,117,.1)", text: "#1D9E75", border: "rgba(29,158,117,.3)" },
        yellow: { bg: "rgba(255,216,65,.15)", text: T.brightSun, border: "rgba(255,216,65,.25)" },
        blue: { bg: "rgba(24,95,165,.1)", text: T.blue2, border: "rgba(24,95,165,.3)" },
        gray: { bg: "#6c8595", text: "white", },
    };
    const s = styles[color];
    return (
        <Box
            component="span"
            sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 1.5,
                py: 0.8,
                borderRadius: "100px",
                fontSize: 11,
                fontWeight: 500,
                fontFamily: "'Muli', 'Raleway', sans-serif",
                letterSpacing: "0.3px",
                background: s.bg,
                color: s.text,
                border: `1px solid ${s.border}`,
            }}
        >
            {label}
        </Box>
    );
};

const SectionHeader = ({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) => (
    <Box mb={4.5}>
        {eyebrow && (
            <Typography
                sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "'Muli', 'Raleway', sans-serif",
                    color: T.brightSun,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    mb: 1.25,
                }}
            >
                {eyebrow}
            </Typography>
        )}
        <Typography
            component="h2"
            sx={{
                fontFamily: "'Muli-Bold', 'Raleway', sans-serif",
                fontWeight: 800,
                fontSize: { xs: 24, sm: 30, md: 38, lg: 44 },
                mb: 1.75,
                color: T.black,
            }}
        >
            {title}
        </Typography>
        {sub && (
            <Typography sx={{ fontSize: 15, color: T.gray, maxWidth: 700, lineHeight: 1.5 }}>
                {sub}
            </Typography>
        )}
    </Box>
);

const AnimatedCard = ({
    children,
    onClick,
    sx,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    sx?: object;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
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
                background: "transparent",
                borderRadius: "14px",
                transition: "all 0.3s ease",
                height: "100%",
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

// ─── MOBILE APP BANNER ──────────────────────────────────────────
function MobileAppBanner() {
    const [visible, setVisible] = useState(true);
    const { t } = useLanguage("domain3");

    if (!visible) return null;

    return (
        <Box
            sx={{
                display: { xs: "flex", md: "none" },
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                bgcolor: T.white,
                borderBottom: `1px solid ${T.borderLight}`,
                px: 3,
                py: 2,
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
        >
            <IconButton size="small" onClick={() => setVisible(false)} sx={{ flexShrink: 0,color:"black" }}>
                ✕
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                <Avatar
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAolBMVEUDDST/3gIAACX/5AD/5QD/4gD/4AAACCQAACQTFyP/5wCKexiCdBkACyRwZRuRgRamkhWBcxl0aBuNfhgABCT62gB2ahqVhBXrzQiHeBkvLiG0nhI0MiAoKSFJRB/dwgdkWxysmBNqYBudixU6NyDLsg5ZUR301QfErBEHECPXvQm+qA4gIiIWGyEoJyJCPh9NRx8eICISFiRMRh9WTh/Qtwz4vpE6AAAIO0lEQVR4nO2cbXfiLBCGFQKlcdPa1tSotWp9rW63+9L+/7/2kGh9BIYEErJnP8z1qadHCHcYYBiGdDoIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAI8ldJrojGVeJTnpAmT29WuppkIAW9boaL3T5Lu91ttj8sRs+J/OfAtQZy26vfyKK01/v0Q8obPx6yOKaUMV7AGKUxnU3m32VXOjXxIY5GtSXK0nH90lUI8r23T2PGuwacxtv1fae6I6XAqMuju5qNJL1Ylv7WikRpiKtdSiF5J5GMbhdvFRqlQMrz336rY2oJ6TUoXQEhmz3Ye2pP0sm0TKMcRTE//nLk38i8/4+loxqlq+p+38WsXN4Ryidv1qfnY/DrZfibmuzB+PSKeeixSESfO+kremc7snRjbqIXv/OUeDLRr9Ihe1F2YEYr7FPVuL+GHn8ag+ef+Y0mRWCNF1TCgAwjD305jL0AjZdjUH0TPotGbuBKK8IZqujs1Ia5dWNf6IsjGer1eIzFfAzqDwkkkbzNqF61i8RoJ7TBaCosDNVVoDFOePwYQiF52rpOMRp0diW0um5NiW6jCRRIb8IITMsE8rLxSWfXqkS5GJrtdBqL+hgsHn0fRODU1oPSgYlj6X7F0kW1+QF0r43FBOpFBweO9IypjrMgAgevM0ggZ1E8m/Q2q/GP6fh9cys9cQq+iGinzaigRFYhER6DQUw0EZ/AJMNpd/0o8k2hGEiKv95GewatmPHClGh2R7mhGstE8VaCCOyQvrlM8Gi7nBrbJLmp+jlJgddBdVvKx6JZZ9l0AywTgcZgh8wjo8Wsu/wFu2SCjA/Gu+7ydKxNqKCh2mfUFmfRzuBta9rTvmTnIMjH1ugfttedG3gsWhy4NgUmZKI3l/MHIkqLiIkxykzHw2PRAMcgDyOwQza6QLadV3nKCRnpSwdPf+m9nk83Ri+CYxEag2GWibwV+kLB0qfqqhNyo0ukE6PYxTbxouWGoba4TEjIvdYGth07VU3mmkTeXRmmfd7qX/5On260zdbpPYQSmIhMa2e6cqya3GsmCHSi01hsz1Uran/RRiF9ca6aLCOtWfqK0XFZNCBXzVhea5OQvToKo4XHXlV8qoVpHyhc4cC1Owbl0vas7hpY5hNvENNU3Y13LTENuwPXpqtWQPqqkdKNV92XAafCAkATL3HgoB19wDGY29lM7cK1X1wrEao7xHZg26xjETTRKGAPdsS7+mT24Vk5uVMq4Fth8clgiS26al8NHCrmI7vQswJ9sWFzuAZ40bgbteeqnSBrZTL0WCnONSyVd0SXlhpAB86MjQRz1c7tU57BUzK48oS8q334ad8dmYZqEHKZKBhMlYeyCbn25bc6V/Hs1Xa0CDlwRg8GFmj6Xc1hpm96IbE8IBt0mTgpXFL9Gf6oNcQlC2qFoQaeRY8Kjb1vY0pDhqUSw66DXwrXNcPcdqyT6ZdE29lP+DFYKASjpI1gwA5Kk2gRGHwMFgqzismthsJDVdQXNNTgy8SXQiPI1lwh7JleSuxB0Wd/X+OfVdghIyiHpW5SStXD/r6VQjv6rtuxTS2Fs+AKoVjNBdB26Six6timpsIWVothxeGLdbUImnNxVjgJrjAqnfT/z5MBJLaR4mV4bc2JP+zHAVYTPUkMmFZyVqh53pw2hj9ZD3QqBLaSxWbunppTItCMqukSGyRrWtB3wHCUJdCzzKgaIDG0oRI1pEstUZYAgFE1ZgYZQxuqNtX4BhPdgQW+ANFgGlaiFk3k/LmlTrQcvtTOu3HGCAYe2ulE2+ELHEcN6t0YUf02OrHk8KVW3o0X4l0NtPAs/HRaevhSemwT5un66Rp0QNbwEaWHL/55N56QG7V+bovLQ2V1IIet8vDFM+/Gm0TfI/L03fWU+7GvsniGjoArD1/alghkKkzdMkFfYtUljba/zXi3S55M/WRNJ4BsExeJCXnUg8HQNt0tTwbOuwk2owIZQ+nPqmXxynztbGZMw85n9F4JYt4k5GBkfdHbiqyvq4OZbv7H7BpgJYADv7a8mzASocy9+PPJfj9NkHlmzPDAMgPs6K2HL+0uGuQFyL5MlwLWKMjqYO5kpY1qv4ZnUWuQo90ZFcygpenwWm5oFTtJBCFPB+DeEO/qmVTeeTKtOnAJgbOg6fr+R578LMRgIIo/nh5m0L02bpyP18iTqZE47c7gOgOjbizu7iff5s+r8Xj18dLbzZglk904caqTTumerFkD622E/G5sxFMJs99GAPLYa6VytToWybTsRol51qsIPAgHgS4nvO1KHMOGWk080afR+umUrTpwZFzzZldfX5ehGcP1ABS+bdPg0rvSMLGuCmgCAumd4XiQpXE7z/0AFJAY6O5aJ3c2h85XZE/Q7Tt0w1K7qel1Rm8sGiFzNBKyyXxukXJ6SGAvc6jcc/XLk9EcOM5C9WABee0z55vOUXZjvel8ccnSuw8UQ+U0qMDcUlefTrfVOeV9UXJb/SyxRp7MhcQ2UhgEef5k1V8cSCdvZV/HOBtqrXTK81hsKwmFfBzSyN6RnMVZ33Lv66KRRe5qzSaeHLjAY/CyfvLjYR9HDEgA5TTmu/mry5c/pKHWNrLCUHncSg8eGRDy++6wzc9M2VeOHsv/ni3mwvXrLcO4/kSfS2wj0+3yEfn3hX7d3C7W2ZHZrj/avMp/uoYWpMQG27tmpZ0ZHCO9BcevKPmUThp9B6lZac9nFfy1xyEIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgvzz/Ad8EYColqxM5AAAAABJRU5ErkJggg=="
                    sx={{ width: 32, height: 32, borderRadius: "8px" }}
                />
                <Typography sx={{ fontSize: 13, color: T.black }}>{t("mobileApp.appName")}</Typography>
            </Box>
            <Button
                variant="contained"
                sx={{
                    bgcolor: T.brightSunDark,
                    color: T.black,
                    fontSize: 13,
                    fontWeight: 700,
                    borderRadius: "6px",
                    px: 2,
                    py: 1,
                    "&:hover": { bgcolor: T.yellow2 },
                }}
            >
              {t("mobileApp.install")}
            </Button>
        </Box>
    );
}

// ─── NAVBAR ──────────────────────────────────────────────────
function NavBar() {
    const { t, changeLanguage, currentLanguage } = useLanguage("domain3");
    const { navTo } = useLinks();
    const isMobile = useMediaQuery("(max-width:1024px)");
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        t("nav.trading"),
        t("nav.markets"),
        t("nav.platforms"),
        t("nav.tools"),
        t("nav.company"),
        t("nav.partners")
    ];

    return (
        <>
            <Box
                component="header"
                sx={{
                    position: "sticky",
                    top: { xs: 70, md: 0 },
                    zIndex: 50,
                    bgcolor: T.white,
                    borderBottom: `1px solid ${T.borderLight}`,
                    py: { xs: .5, md: 2.5 },
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
            >
                <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 22 } }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {/* Logo */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box
                                component="img"
                                src={logo}
                                alt="Exness"
                                sx={{ height: { xs: 20, sm: 30 }, width: "auto" }}
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />

                        </Box>

                        {/* Desktop Navigation */}
                        <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 0 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item}
                                    sx={{
                                        px: 2,
                                        py: 1.5,
                                        borderRadius: "9999px",
                                        color: T.tundora,
                                        fontSize: 14,
                                        fontWeight: 500,
                                        textTransform: "none",
                                        "&:hover": {
                                            bgcolor: "#f5f5f5",
                                            "& span": { color: T.brightSun, fontWeight: 700 },
                                        },
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{
                                            fontFamily: "'Raleway', sans-serif",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                    {item === "Partners" && (
                                        <Box component="span" sx={{ ml: 0.5, fontSize: 14 }}>
                                            ↗
                                        </Box>
                                    )}
                                </Button>
                            ))}
                        </Box>

                        {/* Right Actions */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
                            {/* Language Selector Desktop */}


                            {/* Register Button Desktop */}
                            <Button
                                onClick={() => navTo("register")}
                                sx={{
                                    display: { xs: "none", sm: "flex" },
                                    bgcolor: T.brightSunDark,
                                    color: T.black,
                                    px: { sm: 3, md: 4 },
                                    py: 1.25,
                                    fontSize: { sm: 12, md: 14 },
                                    fontWeight: 700,
                                    fontFamily: "'Raleway', sans-serif",
                                    textTransform: "none",
                                    borderRadius: "7px",
                                    "&:hover": { bgcolor: T.yellow2, transform: "scale(1.02)" },
                                    transition: "all 0.2s",
                                }}
                            >
                                {t("nav.register")}
                            </Button>

                            {/* Sign In Button Desktop */}
                            <Button
                                onClick={() => navTo("login")}
                                sx={{
                                    display: { xs: "none", sm: "flex" },
                                    bgcolor: "#eaeaea",
                                    color: T.emperor,
                                    px: { sm: 3, md: 4 },
                                    py: 1.25,
                                    fontSize: { sm: 12, md: 14 },
                                    fontWeight: 700,
                                    fontFamily: "'Raleway', sans-serif",
                                    textTransform: "none",
                                    borderRadius: "7px",
                                    "&:hover": { bgcolor: "#d5d5d5", transform: "scale(1.02)" },
                                    transition: "all 0.2s",
                                }}
                            >
                                {t("nav.signIn")}
                            </Button>
                            <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 0.5 }}>
                             

                                <Select
                                    value={currentLanguage}
                                    onChange={(e) => changeLanguage(e.target.value)}
                                    size="small"
                                    variant="outlined"
                                    renderValue={(selected) => {
                                        const lang = LANGUAGES.find((l) => l.code === selected);
                                        return (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <PublicIcon sx={{ fontSize: 18 }} />
                                                <Typography sx={{ fontWeight: 600 }}>{lang?.label}</Typography>
                                            </Box>
                                        );
                                    }}
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: T.black,
                                        height: 40,
                                        minWidth: 90,
                                        borderRadius: 2,
                                        fontFamily: "'Raleway', sans-serif",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "transparent",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: T.borderLight,
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                mt: 1,
                                                borderRadius: 2,
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                                border: `1px solid ${T.borderLight}`,
                                                background:"white"
                                            },
                                        },
                                    }}
                                >
                                    {LANGUAGES.map((lang) => (
                                        <MenuItem
                                            key={lang.code}
                                            value={lang.code}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                                fontSize: 14,
                                                py: 1,

                                            }}
                                        >
                                            <Box sx={{ fontSize: 18 }}>{lang.flag}</Box>
                                            <Typography color="black">{lang.name}</Typography>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>

                            {/* Mobile Menu Button */}
                            <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { xs: "flex", lg: "none" } }}>
                                <Box component="span" sx={{ fontSize: 24,color:'black' }}>☰</Box>
                            </IconButton>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
                <Box sx={{ width: 280, p: 3, bgcolor: T.white, height: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                        <IconButton onClick={() => setMobileOpen(false)} sx={{color:"black"}}>✕</IconButton>
                    </Box>
                    <Stack spacing={2}>
                        {navItems.map((item) => (
                            <Button
                                key={item}
                                fullWidth
                                sx={{
                                    justifyContent: "flex-start",
                                    color: T.tundora,
                                    fontSize: 16,
                                    textTransform: "none",
                                }}
                            >
                                {item}
                            </Button>
                        ))}
                        <Divider />
                        <Select
                            value={currentLanguage}
                            onChange={(e) => changeLanguage(e.target.value)}
                            fullWidth
                            size="small"
                            sx={{ fontSize: 14,color:"black" }}
                        >
                            {LANGUAGES.map((lang) => (
                                <MenuItem key={lang.code} value={lang.code}>
                                    {lang.label} - {lang.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button
                            onClick={() => navTo("register")}
                            fullWidth
                            sx={{
                                bgcolor: T.brightSunDark,
                                color: T.black,
                                py: 1.5,
                                fontWeight: 700,
                            }}
                        >
                            {t("nav.register")}
                        </Button>
                        <Button
                            onClick={() => navTo("login")}
                            fullWidth
                            sx={{
                                bgcolor: "#eaeaea",
                                color: T.emperor,
                                py: 1.5,
                                fontWeight: 700,
                            }}
                        >
                            {t("nav.signIn")}
                        </Button>
                    </Stack>
                </Box>
            </Drawer>
        </>
    );
}

// ─── HERO SECTION ──────────────────────────────────────────────
function HeroSection() {
    const { t } = useLanguage("domain3");
    const { navTo } = useLinks();
    const isMobile = useMediaQuery("(max-width:768px)");
    const isTablet = useMediaQuery("(max-width:1024px)");

    const trustBadges = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
                <path d="M9.06923 13.704C7.41759 13.755 6.06671 14.4076 5.01659 15.6618H2.96733C2.13131 15.6618 1.42784 15.4553 0.8569 15.0423C0.285962 14.6294 0.000492527 14.0252 0.000492527 13.2299C0.000492527 9.63055 0.632602 7.83088 1.89682 7.83088C1.95799 7.83088 2.17974 7.93794 2.56207 8.15207C2.94439 8.36619 3.44141 8.58287 4.05313 8.80209C4.66485 9.02132 5.27147 9.13093 5.873 9.13093C6.55608 9.13093 7.23407 9.01367 7.90696 8.77915C7.85599 9.15642 7.8305 9.4929 7.8305 9.7886C7.8305 11.2059 8.24341 12.5111 9.06923 13.704ZM25.448 23.4468C25.448 24.6703 25.0759 25.6364 24.3316 26.3451C23.5874 27.0538 22.5984 27.4081 21.3648 27.4081H7.99872C6.76509 27.4081 5.77614 27.0538 5.03188 26.3451C4.28763 25.6364 3.9155 24.6703 3.9155 23.4468C3.9155 22.9063 3.93334 22.3787 3.96902 21.8638C4.0047 21.3488 4.07607 20.7931 4.18312 20.1966C4.29017 19.6001 4.42526 19.047 4.58839 18.5372C4.75151 18.0273 4.97071 17.5303 5.24599 17.0459C5.52126 16.5616 5.83731 16.1486 6.19415 15.8071C6.55099 15.4655 6.98684 15.1927 7.5017 14.9888C8.01656 14.7849 8.58495 14.6829 9.20687 14.6829C9.30882 14.6829 9.52802 14.7925 9.86447 15.0117C10.2009 15.231 10.573 15.4757 10.9809 15.7459C11.3887 16.0161 11.9341 16.2608 12.6172 16.48C13.3003 16.6992 13.9885 16.8089 14.6818 16.8089C15.375 16.8089 16.0632 16.6992 16.7463 16.48C17.4294 16.2608 17.9748 16.0161 18.3827 15.7459C18.7905 15.4757 19.1626 15.231 19.499 15.0117C19.8355 14.7925 20.0547 14.6829 20.1566 14.6829C20.7786 14.6829 21.3469 14.7849 21.8618 14.9888C22.3767 15.1927 22.8125 15.4655 23.1694 15.8071C23.5262 16.1486 23.8423 16.5616 24.1175 17.0459C24.3928 17.5303 24.612 18.0273 24.7751 18.5372C24.9382 19.047 25.0733 19.6001 25.1804 20.1966C25.2874 20.7931 25.3588 21.3488 25.3945 21.8638C25.4302 22.3787 25.448 22.9063 25.448 23.4468ZM9.788 3.91544C9.788 4.99626 9.40568 5.91904 8.64103 6.68378C7.87638 7.44851 6.9537 7.83088 5.873 7.83088C4.79229 7.83088 3.86962 7.44851 3.10497 6.68378C2.34032 5.91904 1.95799 4.99626 1.95799 3.91544C1.95799 2.83462 2.34032 1.91184 3.10497 1.1471C3.86962 0.382367 4.79229 0 5.873 0C6.9537 0 7.87638 0.382367 8.64103 1.1471C9.40568 1.91184 9.788 2.83462 9.788 3.91544ZM20.5543 9.7886C20.5543 11.4098 19.9808 12.794 18.8338 13.9411C17.6868 15.0882 16.3028 15.6618 14.6818 15.6618C13.0607 15.6618 11.6767 15.0882 10.5297 13.9411C9.38274 12.794 8.80925 11.4098 8.80925 9.7886C8.80925 8.16736 9.38274 6.78319 10.5297 5.63609C11.6767 4.48899 13.0607 3.91544 14.6818 3.91544C16.3028 3.91544 17.6868 4.48899 18.8338 5.63609C19.9808 6.78319 20.5543 8.16736 20.5543 9.7886ZM29.363 13.2299C29.363 14.0252 29.0775 14.6294 28.5066 15.0423C27.9357 15.4553 27.2322 15.6618 26.3962 15.6618H24.3469C23.2968 14.4076 21.9459 13.755 20.2943 13.704C21.1201 12.5111 21.533 11.2059 21.533 9.7886C21.533 9.4929 21.5075 9.15642 21.4565 8.77915C22.1294 9.01367 22.8074 9.13093 23.4905 9.13093C24.092 9.13093 24.6987 9.02132 25.3104 8.80209C25.9221 8.58287 26.4191 8.36619 26.8014 8.15207C27.1838 7.93794 27.4055 7.83088 27.4667 7.83088C28.7309 7.83088 29.363 9.63055 29.363 13.2299ZM27.4055 3.91544C27.4055 4.99626 27.0232 5.91904 26.2585 6.68378C25.4939 7.44851 24.5712 7.83088 23.4905 7.83088C22.4098 7.83088 21.4871 7.44851 20.7225 6.68378C19.9578 5.91904 19.5755 4.99626 19.5755 3.91544C19.5755 2.83462 19.9578 1.91184 20.7225 1.1471C21.4871 0.382367 22.4098 0 23.4905 0C24.5712 0 25.4939 0.382367 26.2585 1.1471C27.0232 1.91184 27.4055 2.83462 27.4055 3.91544Z" fill="black" />
            </svg>, text: t("hero.trust1")
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
                <path d="M17.1286 24.1666C17.7776 24.1666 18.4 23.912 18.8588 23.4588C19.3177 23.0056 19.5755 22.3909 19.5755 21.75V6.04165H11.0114C10.687 6.04165 10.3758 6.16895 10.1463 6.39556C9.9169 6.62217 9.788 6.92951 9.788 7.24998V19.3333H6.11768V6.04165C6.11768 5.08024 6.50438 4.1582 7.19269 3.47838C7.88101 2.79856 8.81457 2.41665 9.788 2.41665H23.2458C24.2193 2.41665 25.1528 2.79856 25.8411 3.47838C26.5294 4.1582 26.9161 5.08024 26.9161 6.04165V7.24998H22.0224V21.75V22.9583C22.0224 23.9197 21.6357 24.8418 20.9474 25.5216C20.2591 26.2014 19.3255 26.5833 18.3521 26.5833H6.11768C5.14425 26.5833 4.2107 26.2014 3.52238 25.5216C2.83406 24.8418 2.44737 23.9197 2.44737 22.9583V21.75H14.6818C14.6818 22.3909 14.9395 23.0056 15.3984 23.4588C15.8573 23.912 16.4797 24.1666 17.1286 24.1666Z" fill="black" />
            </svg>, text: t("hero.trust2")
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
                <path d="M10.0327 25.375H5.50596C5.01659 25.375 4.58838 25.1937 4.22135 24.8313C3.85432 24.4688 3.67081 24.0458 3.67081 23.5625V14.5C3.67081 12.9896 3.96137 11.5748 4.54251 10.2557C5.12364 8.93663 5.90868 7.78872 6.89762 6.81198C7.88657 5.83524 9.04884 5.0599 10.3844 4.48594C11.72 3.91198 13.1525 3.625 14.6818 3.625C16.2111 3.625 17.6435 3.91198 18.9791 4.48594C20.3147 5.0599 21.4769 5.83524 22.4659 6.81198C23.4548 7.78872 24.2399 8.93663 24.821 10.2557C25.4021 11.5748 25.6927 12.9896 25.6927 14.5V23.5625C25.6927 24.0458 25.5092 24.4688 25.1422 24.8313C24.7751 25.1937 24.3469 25.375 23.8575 25.375H19.3308V16.4333H23.8575V14.5C23.8575 11.9754 22.9673 9.83382 21.1868 8.07529C19.4063 6.31676 17.2379 5.4375 14.6818 5.4375C12.1256 5.4375 9.95724 6.31676 8.17673 8.07529C6.39622 9.83382 5.50596 11.9754 5.50596 14.5V16.4333H10.0327V25.375ZM8.19753 18.2458H5.50596V23.5625H8.19753V18.2458ZM21.166 18.2458V23.5625H23.8575V18.2458H21.166Z" fill="black" />
            </svg>, text: t("hero.trust3")
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                <path d="M4.55408 3.625C3.29028 3.625 2.27695 4.70042 2.27695 6.04167V18.125C2.27695 18.7659 2.51686 19.3806 2.94391 19.8338C3.37095 20.2871 3.95015 20.5417 4.55408 20.5417H13.6626V26.5833L17.0783 22.9583L20.494 26.5833V20.5417H22.7711C23.3751 20.5417 23.9543 20.2871 24.3813 19.8338C24.8083 19.3806 25.0483 18.7659 25.0483 18.125V9.66667V7.25V6.04167C25.0483 5.40073 24.8083 4.78604 24.3813 4.33283C23.9543 3.87961 23.3751 3.625 22.7711 3.625H18.2169H4.55408ZM13.6626 6.04167L17.0783 8.45833L20.494 6.04167V10.2708L23.9097 12.0833L20.494 13.8958V18.125L17.0783 15.7083L13.6626 18.125V13.8958L10.2469 12.0833L13.6626 10.2708V6.04167ZM4.55408 6.04167H10.2469V8.45833H4.55408V6.04167ZM4.55408 10.875H7.96978V13.2917H4.55408V10.875ZM4.55408 15.7083H10.2469V18.125H4.55408V15.7083Z" fill="black" />
            </svg>, text: t("hero.trust4")
        },
    ];

    return (
        <Box sx={{ position: "relative", width: "100%", bgcolor: T.white, overflow: "hidden" }}>
            {/* Video Background */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                }}
            >
                <Box
                    component="video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    sx={{
                        width: { xs: 380, sm: 450, md: 500, lg: 550 },
                        height: "auto",
                        objectFit: "contain",
                    }}
                >
                    <source src={logovideo} type="video/mp4" />
                </Box>
            </Box>

            {/* Content */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: { xs: 520, md: 700 },
                    px: { xs: 3, sm: 4, md: 6 },
                    py: { xs: 8, md: 12 },
                }}
            >
                <Box sx={{ textAlign: "center", maxWidth: 800 }}>
                    <Typography
                        component="h1"
                        sx={{
                            fontFamily: "'Muli-Bold', 'Raleway', sans-serif",
                            fontWeight: 800,
                            fontSize: { xs: 28, sm: 32, md: 44, lg: 52, xl: 60 },
                            lineHeight: 1.15,
                            color: T.black,
                            letterSpacing: "-0.5px",
                            mb: 2,
                        }}
                        dangerouslySetInnerHTML={{ __html: t("hero.title") }}
                    />



                    <Typography
                        sx={{
                            fontSize: { xs: 14, sm: 15, md: 17, lg: 19, xl: 21 },
                            color: T.tundora,
                            maxWidth: 600,
                            mx: "auto",
                            mb: 4,
                            lineHeight: 1.5,
                        }}
                    >
                        {t("hero.subtitle")}
                    </Typography>

                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: { xs: 6, md: 8 } }}>
                        <Button
                            onClick={() => navTo("register")}
                            sx={{
                                bgcolor: T.brightSunDark,
                                color: T.black,
                                px: { xs: 3, sm: 4 },
                                py: { xs: 1.25, md: 1.5 },
                                fontSize: { xs: 13, sm: 14, md: 15 },
                                fontWeight: 700,
                                fontFamily: "'Raleway', sans-serif",
                                textTransform: "none",
                                borderRadius: "4px",
                                minWidth: { xs: 110, sm: 130 },
                                "&:hover": { bgcolor: T.yellow2, transform: "scale(1.02)" },
                                transition: "all 0.2s",
                            }}
                        >
                            {t("hero.register")}
                        </Button>
                        <Button
                            onClick={() => navTo("demo")}
                            sx={{
                                bgcolor: T.white,
                                color: T.black,
                                border: `1px solid ${T.borderLight}`,
                                px: { xs: 3, sm: 4 },
                                py: { xs: 1.25, md: 1.5 },
                                fontSize: { xs: 13, sm: 14, md: 15 },
                                fontWeight: 700,
                                fontFamily: "'Raleway', sans-serif",
                                textTransform: "none",
                                borderRadius: "4px",
                                minWidth: { xs: 120, sm: 140 },
                                "&:hover": { bgcolor: "#fafafa", transform: "scale(1.02)" },
                                transition: "all 0.2s",
                            }}
                        >
                            {t("hero.demo")}
                        </Button>
                    </Stack>
                </Box>
            </Box>

            {/* Trust Badges Bar */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 20,
                    bgcolor: T.white,
                    borderTop: `1px solid ${T.borderLight}`,
                    py: { xs: 2, md: 3 },
                }}
            >
                <Container maxWidth="lg">
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        flexWrap="wrap"
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 2, sm: 4, md: 8 }}
                    >
                        {trustBadges.map((badge, idx) => (
                            <Stack key={idx} direction="row" spacing={1} alignItems="start">
                                <Typography >{badge.icon}</Typography>
                                <Typography
                                    sx={{
                                        fontSize: { xs: 11, sm: 12, md: 14 },
                                        color: "#333",
                                        whiteSpace: "nowrap",
                                        mt: "5px !important"
                                    }}
                                >
                                    {badge.text}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}

// ─── THRIVE SECTION (Gold & Oil) ────────────────────────────────
function ThriveSection() {
    const { t } = useLanguage("domain3");
    const isMobile = useMediaQuery("(max-width:1024px)");

    const features = [
        { badge: "Withdrawals", title: t("thrive.withdrawalsTitle"), desc: t("thrive.withdrawalsDesc") },
        { badge: "Spreads", title: t("thrive.spreadsTitle"), desc: t("thrive.spreadsDesc") },
        { badge: "Support", title: t("thrive.supportTitle"), desc: t("thrive.supportDesc") },
        { badge: "Execution speed", title: t("thrive.executionTitle"), desc: t("thrive.executionDesc") },
        { badge: "Swaps", title: t("thrive.swapsTitle"), desc: t("thrive.swapsDesc") },
        { badge: "Platforms", title: t("thrive.platformsTitle"), desc: t("thrive.platformsDesc") },
    ];

    const leftFeatures = features.slice(0, 3);
    const rightFeatures = features.slice(3, 6);

    return (
        <Box sx={{ bgcolor: T.blackPearl, py: { xs: 8, sm: 10, md: 12, lg: 16 } }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
                    <Typography
                        sx={{
                            fontFamily: "'Muli-Bold', 'Raleway', sans-serif",
                            fontWeight: 800,
                            fontSize: { xs: 24, sm: 30, md: 38, lg: 44 },
                            color: T.white,
                            mb: 2,
                        }}
                    >
                        {t("thrive.title")}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: 15, sm: 17, md: 19, lg: 21 },
                            color: T.silverChalice,
                            maxWidth: 700,
                            mx: "auto",
                        }}
                    >
                        {t("thrive.subtitle")}
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                        <Button
                            sx={{
                                bgcolor: "transparent",

                                borderRadius: "8px",
                                p: 1,
                                "& img": { height: 48, width: "auto" },
                            }}
                        >
                            <Box component="img" src={dowloadios} sx={{ height: 48 }} />
                        </Button>
                        <Button
                            sx={{
                                bgcolor: "transparent",

                                borderRadius: "8px",
                                p: 1,
                            }}
                        >
                            <Box component="img" src={dowloadgg} sx={{ height: 48 }} />
                        </Button>
                    </Stack>
                </Box>

                {isMobile ? (
                    <Stack spacing={4}>
                        {features.map((f, idx) => (
                            <Box key={idx} sx={{ textAlign: "center" }}>
                                <TagChip label={f.badge} color="gray" />
                                <Typography sx={{ fontSize: 18, fontWeight: 700, color: T.white, mt: 2, mb: 1 }}>
                                    {f.title}
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: T.silverChalice }}>{f.desc}</Typography>
                            </Box>
                        ))}
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                            <Box component="img" src={trandingapp} sx={{ maxWidth: 300, borderRadius: 2 }} />
                        </Box>
                    </Stack>
                ) : (
                    <Grid container spacing={6} alignItems="center">
                        <Grid item md={4}>
                            <Stack spacing={6}>
                                {leftFeatures.map((f, idx) => (
                                    <Box key={idx} sx={{ textAlign: "center" }}>
                                        <TagChip label={f.badge} color="gray" />
                                        <Typography sx={{ fontSize: 22, fontWeight: 700, color: T.white, mt: 2, mb: 1 }}>
                                            {f.title}
                                        </Typography>
                                        <Typography sx={{ fontSize: 16, color: T.silverChalice }}>{f.desc}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Grid>
                        <Grid item md={4}>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Box component="img" src={trandingapp} sx={{ maxWidth: 350, borderRadius: 2 }} />
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <Stack spacing={6}>
                                {rightFeatures.map((f, idx) => (
                                    <Box key={idx} sx={{ textAlign: "center" }}>
                                        <TagChip label={f.badge} color="gray" />
                                        <Typography sx={{ fontSize: 22, fontWeight: 700, color: T.white, mt: 2, mb: 1 }}>
                                            {f.title}
                                        </Typography>
                                        <Typography sx={{ fontSize: 16, color: T.silverChalice }}>{f.desc}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    );
}

// ─── INSTRUMENTS TABLE ──────────────────────────────────────────
function InstrumentsSection() {
    const { t } = useLanguage("domain3");
    const { navTo } = useLinks();
    const isMobile = useMediaQuery("(max-width:768px)");

    const instruments = [
        { name: "XAUUSD", fullName: "Gold vs US Dollar", icon: "🥇", leverage: "Customizable", spread: "11.2", swapFree: true, category: t("instruments.metals") },
        { name: "USOIL", fullName: "Crude Oil", icon: "🛢️", leverage: "1:1000", spread: "1.3", swapFree: true, category: t("instruments.energies")},
        { name: "EURUSD", fullName: "Euro vs US Dollar", icon: "💶", leverage: "Customizable", spread: "0.6", swapFree: true, category: t("instruments.currencies") },
        { name: "US30", fullName: "US Wall Street 30 Index", icon: "📈", leverage: "1:400", spread: "1.3", swapFree: true, category: t("instruments.indices")},
        { name: "AAPL", fullName: "Apple Inc.", icon: "🍎", leverage: "1:20", spread: "1.1", swapFree: false, category: t("instruments.stocks") },
    ];

    return (
        <Box sx={{ bgcolor: T.white, py: { xs: 8, sm: 10, md: 12, lg: 16 } }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
                    <Typography
                        sx={{
                            fontFamily: "'Muli-Bold', 'Raleway', sans-serif",
                            fontWeight: 800,
                            fontSize: { xs: 24, sm: 30, md: 38, lg: 44 },
                            color: T.black,
                            mb: 2,
                        }}
                    >
                        {t("instruments.title")}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 15, sm: 17, md: 19 }, color: T.gray }}>
                        {t("instruments.subtitle")}
                    </Typography>
                </Box>

                {!isMobile ? (
                    <TableContainer component={Paper} elevation={0} sx={{ border: `none` }}>
                        <Table>
                            <TableHead sx={{ background: "white" }}>
                                <TableRow sx={{}}>
                                    <TableCell sx={{ fontWeight: 700, color: T.gray, borderBottom: "1px solid #e2e8f0" }}>Instruments</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: T.gray, borderBottom: "1px solid #e2e8f0" }}>Leverage</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: T.gray, borderBottom: "1px solid #e2e8f0" }}>Avg. spread³, pips</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: T.gray, borderBottom: "1px solid #e2e8f0" }}>Swap-free</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700, color: T.gray, borderBottom: "1px solid #e2e8f0" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {instruments.map((inst) => (
                                    <TableRow key={inst.name} sx={{ "&:hover": { bgcolor: "#fafafa" }, background: "white" }}>
                                        <TableCell sx={{ color: T.black, borderBottom: "1px solid #e2e8f0" }}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Avatar src={`https://d33vw3iu5hs0zi.cloudfront.net/media/${inst.name}_64f4c10126.png`} sx={{ width: 40, height: 40 }}>
                                                    {inst.icon}
                                                </Avatar>
                                                <Box>
                                                    <Typography sx={{ fontWeight: 700, color: T.black }}>{inst.name}</Typography>
                                                    <Typography sx={{ fontSize: 12, color: T.gray }}>{inst.fullName}</Typography>
                                                </Box>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: T.black, borderBottom: "1px solid #e2e8f0" }}>{inst.leverage}</TableCell>
                                        <TableCell align="center" sx={{ color: T.black, borderBottom: "1px solid #e2e8f0" }}>{inst.spread}</TableCell>
                                        <TableCell sx={{ color: T.black, borderBottom: "1px solid #e2e8f0" }} align="center">
                                            <Chip
                                                label={inst.swapFree ? "Available" : "Swap applied"}
                                                size="small"
                                                sx={{
                                                    bgcolor: inst.swapFree ? alpha("#22c55e", 0.1) : alpha("#9ca3af", 0.1),
                                                    color: inst.swapFree ? "#22c55e" : "#6b7280",
                                                    fontSize: 12,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ color: T.black, borderBottom: "1px solid #e2e8f0" }} align="right">
                                            <Typography sx={{ color: T.brightSun, cursor: "pointer" }}>{inst.category} →</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Stack spacing={3}>
                        {instruments.map((inst) => (
                            <Box key={inst.name} sx={{ bgcolor: "#f9fafb", borderRadius: 2, p: 2 }}>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                    <Avatar sx={{ width: 40, height: 40 }}>{inst.icon}</Avatar>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700 ,color:"black"}}>{inst.name}</Typography>
                                        <Typography sx={{ fontSize: 12, color: T.gray }}>{inst.fullName}</Typography>
                                    </Box>
                                </Stack>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" color="black">Leverage:</Typography>
                                        <Typography variant="body2" color="black"> {inst.leverage}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" color="black">Spread:</Typography>
                                        <Typography variant="body2" color="black">{inst.spread} pips</Typography>
                                    </Grid>
                                </Grid>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                                    <Chip label={inst.swapFree ? "Available" : "Swap applied"} size="small"  sx={{background:"#15803d"}}/>
                                    <Typography sx={{ color: T.brightSun, fontSize: 13 }}>{inst.category} →</Typography>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                )}

                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 6 }}>
                    <Button
                        onClick={() => navTo("register")}
                        sx={{
                            bgcolor: T.brightSunDark,
                            color: T.black,
                            px: 5,
                            py: 1.5,
                            fontWeight: 700,
                            borderRadius: "6px",
                            "&:hover": { bgcolor: T.yellow2, transform: "scale(1.02)" },
                        }}
                    >
                        {t("instruments.register")}
                    </Button>
                    <Button
                        onClick={() => navTo("demo")}
                        sx={{
                            bgcolor: T.cloudBurst,
                            color: T.white,
                            px: 5,
                            py: 1.5,
                            fontWeight: 700,
                            borderRadius: "6px",
                            "&:hover": { bgcolor: alpha(T.cloudBurst, 0.9), transform: "scale(1.02)" },
                        }}
                    >
                        {t("instruments.demo")}
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}

// ─── SEIZE OPPORTUNITY SECTION ──────────────────────────────────
function SeizeOpportunitySection() {
    const { t } = useLanguage("domain3");
    const platforms = ["MetaTrader 5", "Exness Terminal", "Exness Trade app"];

    return (
        <Box sx={{ bgcolor: T.white, py: { xs: 8, sm: 10, md: 12, lg: 16 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box component="img" src={trandingapp} sx={{ width: "100%", borderRadius: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                bgcolor: alpha("#fef08a", 0.3),
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 3,
                            }}
                        >
                            <Box component="span" sx={{ fontSize: 32 }}>⚡</Box>
                        </Box>
                        <Typography
                            sx={{
                                fontFamily: "'Muli-Bold', sans-serif",
                                fontSize: { xs: 26, sm: 32, md: 38, lg: 44 },
                                fontWeight: 800,
                                color: T.black,
                                mb: 2,
                            }}
                        >
                            {t("seize.title")}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: 15, sm: 17, md: 18 }, color: T.gray, mb: 4 }}>
                            {t("seize.subtitle")}
                        </Typography>
                        <Stack spacing={2}>
                            {platforms.map((p, idx) => (
                                <Button
                                    key={idx}
                                    fullWidth
                                    sx={{
                                        justifyContent: "flex-start",
                                        color: T.black,
                                        textTransform: "none",
                                        fontSize: 16,
                                        "&:hover": { color: T.brightSun, "& .arrow": { transform: "translateX(4px)" } },
                                    }}
                                >
                                    <Box component="span" sx={{ mr: 1, transition: "transform 0.2s" }} className="arrow">→</Box>
                                    {p}
                                </Button>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

// ─── SECURITY SECTION ───────────────────────────────────────────
function SecuritySection() {
    const { t } = useLanguage("domain3");

    return (
        <Box sx={{ bgcolor: T.white, py: { xs: 8, sm: 10, md: 12, lg: 16 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center" direction={{ xs: "column", md: "row-reverse" }}>
                    <Grid item xs={12} md={6}>
                        <Box component="img" src={security} sx={{ width: "100%", borderRadius: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                bgcolor: alpha("#bfdbfe", 0.3),
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 3,
                            }}
                        >
                            <Box component="span" sx={{ fontSize: 32 }}>🛡️</Box>
                        </Box>
                        <Typography
                            sx={{
                                fontFamily: "'Muli-Bold', sans-serif",
                                fontSize: { xs: 26, sm: 32, md: 38, lg: 44 },
                                fontWeight: 800,
                                color: T.black,
                                mb: 2,
                            }}
                        >
                            {t("security.title")}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: 15, sm: 17, md: 18 }, color: T.gray, mb: 4 }}>
                            {t("security.subtitle")}
                        </Typography>
                        <Stack spacing={2}>
                            <Button fullWidth sx={{ justifyContent: "flex-start", color: T.black, textTransform: "none", fontSize: 16 }}>
                                <Box component="span" sx={{ mr: 1 }}>→</Box> {t("security.clientProtection")}
                            </Button>
                            <Button fullWidth sx={{ justifyContent: "flex-start", color: T.black, textTransform: "none", fontSize: 16 }}>
                                <Box component="span" sx={{ mr: 1 }}>→</Box> {t("security.whyExness")}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

// ─── PODCAST SECTION ────────────────────────────────────────────
function PodcastSection() {
    const { t } = useLanguage("domain3");
    const { navTo } = useLinks();

    return (
        <Box sx={{ position: "relative", bgcolor: T.blackPearl, py: { xs: 8, sm: 10, md: 12, lg: 10 }, overflow: "hidden" }}>
            <Box sx={{ position: "absolute", inset: 0, bgcolor: "#111827" }} />
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
                <Box sx={{ maxWidth: 600 }}>
                    <Typography
                        sx={{
                            fontFamily: "'Muli-Bold', sans-serif",
                            fontSize: { xs: 26, sm: 32, md: 38, lg: 44 },
                            fontWeight: 800,
                            color: T.white,
                            mb: 2,
                        }}
                    >
                        {t("podcast.title")}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 15, sm: 17, md: 18 }, color: "#9ca3af", mb: 4 }}>
                        {t("podcast.subtitle")}
                    </Typography>
                    <Button
                        onClick={() => navTo("podcast")}
                        sx={{
                            bgcolor: T.brightSunDark,
                            color: T.black,
                            px: 5,
                            py: 1.5,
                            fontWeight: 700,
                            borderRadius: "6px",
                            "&:hover": { bgcolor: T.yellow2, transform: "scale(1.02)" },
                        }}
                    >
                        {t("podcast.button")}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

// ─── NEWS SECTION ───────────────────────────────────────────────
function NewsSection() {
    const { t } = useLanguage("domain3");

    const news = [
        {
            image: section1,
            category: t("news.product"),
            title: t("news.article1"),
        },
        {
            image: section2,
            category: t("news.product"),
            title: t("news.article2"),
        },
        {
            image: section3,
            category: t("news.insideExness"),
            title: t("news.article3"),
        },
    ];

    return (
        <Box sx={{ bgcolor: T.white, py: { xs: 8, sm: 10, md: 12, lg: 16 } }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
                    <Typography
                        sx={{
                            fontFamily: "'Muli-Bold', sans-serif",
                            fontSize: { xs: 26, sm: 32, md: 38, lg: 44 },
                            fontWeight: 800,
                            color: T.black,
                            mb: 2,
                        }}
                    >
                        {t("news.title")}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 15, sm: 17, md: 18 }, color: T.gray, mb: 2 }}>
                        {t("news.subtitle")}
                    </Typography>
                    <Typography sx={{ color: T.gray, "&:hover": { color: T.brightSun }, cursor: "pointer" }}>
                        {t("news.readMore")} →
                    </Typography>
                </Box>

                <Grid container spacing={4} alignItems="stretch">
                    {news.map((item, idx) => (
                        <Grid item xs={12} md={4} key={idx} sx={{ display: "flex" }}>
                            <Box
                                sx={{
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                    "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
                                    transition: "box-shadow 0.2s",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={item.image}
                                    sx={{
                                        width: "100%",
                                        height: { xs: 200, md: 240 },
                                        objectFit: "cover",
                                        bgcolor: "#f5f7fa",
                                    }}
                                />
                                <Box sx={{ p: 3, flexGrow: 1 }}>
                                    <Chip label={item.category} size="small" sx={{ bgcolor: "#878787", mb: 2, fontSize: 11 }} />
                                    <Typography sx={{ fontWeight: 700, fontSize: 22, color: T.black }}>
                                        {item.title}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

// ─── FINAL CTA SECTION ──────────────────────────────────────────
function FinalCtaSection() {
    const { t } = useLanguage("domain3");
    const { navTo } = useLinks();

    return (
        <Box sx={{ bgcolor: "#f5f5f5", py: { xs: 8, sm: 10, md: 12, lg: 2 }, }}>
            <Container maxWidth="lg">
                <Box sx={{ bgcolor: T.cloudBurst, borderRadius: { xs: 3, md: 4 }, p: { xs: 4, sm: 4, md: 4 }, mt: { md: "40px" } }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography
                                sx={{
                                    fontFamily: "'Muli-Bold', sans-serif",
                                    fontSize: { xs: 20, sm: 24, md: 36, lg: 44 },
                                    fontWeight: 800,
                                    color: T.white,
                                    mb: 2,
                                }}
                            >
                                {t("finalCta.title")}
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 14, sm: 15, md: 17 }, color: "white", maxWidth: 600 }}>
                                {t("finalCta.subtitle")}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <Button
                                    onClick={() => navTo("register")}
                                    fullWidth
                                    sx={{
                                        bgcolor: T.brightSunDark,
                                        color: T.black,
                                        py: 1.5,
                                        fontWeight: 700,
                                        borderRadius: "6px",
                                        "&:hover": { bgcolor: T.yellow2 },
                                    }}
                                >
                                    {t("finalCta.register")}
                                </Button>
                                <Button
                                    onClick={() => navTo("demo")}
                                    fullWidth
                                    sx={{
                                        bgcolor: "#2c3e50",
                                        color: T.white,
                                        py: 1.5,
                                        fontWeight: 700,
                                        borderRadius: "6px",
                                        "&:hover": { bgcolor: alpha("#2c3e50", 0.9) },
                                    }}
                                >
                                    {t("finalCta.demo")}
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

// ─── DISCLAIMER ─────────────────────────────────────────────────
function DisclaimerSection() {
    const { t } = useLanguage("domain3");

    const disclaimers = [
        t("disclaimer.1"),
        t("disclaimer.2"),
        t("disclaimer.3"),
    ];

    return (
        <Box sx={{ bgcolor: "#f5f5f5", pb: 6 }}>
            <Container maxWidth="lg">
                <Divider sx={{ mb: 4 }} />
                <Stack spacing={2}>
                    {disclaimers.map((text, idx) => (
                        <Stack key={idx} direction="row" spacing={1}>
                            <Typography sx={{ fontSize: { xs: 9, sm: 10 }, color: "#646464", minWidth: 20 }}>{idx + 1}</Typography>
                            <Typography sx={{ fontSize: { xs: 11, sm: 12, md: 13 }, color: "#666666", lineHeight: 1.5 }}>
                                {text}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}

// ─── FOOTER ─────────────────────────────────────────────────────
function Footer() {
    const { t } = useLanguage("domain3");

    // Định nghĩa cấu trúc cột và các key tương ứng trong file dịch (thay vì hardcode text)
    const footerColumns = [
        { titleKey: "accounts", linkKeys: ["standardAccounts", "professionalAccounts", "demoAccount"] },
        { titleKey: "conditions", linkKeys: ["depositsWithdrawals", "fees", "clientProtection", "orderExecution"] },
        { titleKey: "markets", linkKeys: ["forexCfd", "commoditiesCfd", "stocksCfd", "indicesCfd", "cryptoCfd"] },
        { titleKey: "platforms", linkKeys: ["tradingPlatforms", "mt5", "mt4", "exnessTradeApp", "mt5Mobile", "mt4Mobile", "exnessTerminal", "webTerminal"] },
        { titleKey: "resources", linkKeys: ["analyticalTools", "economicCalendar", "tradingCalculator", "currencyConverter", "tickHistory", "vpsHosting", "podcast", "exnessInsights"] },
        { titleKey: "about", linkKeys: ["aboutUs", "whyExness", "reviews", "contactUs", "helpCenter", "media", "community", "teamPro", "blog"] },
        { titleKey: "corporate", linkKeys: ["regulation", "legalDocuments", "compensationFund"] },
        { titleKey: "solutions", linkKeys: ["copyTrading"] },
    ];

    const socialIcons = {
        Facebook: <FacebookIcon fontSize="small" />,
        X: <XIcon fontSize="small" />,
        Instagram: <InstagramIcon fontSize="small" />,
        LinkedIn: <LinkedInIcon fontSize="small" />,
        YouTube: <YouTubeIcon fontSize="small" />,
    };
    const socialLinks = ["Facebook", "X", "Instagram", "LinkedIn", "YouTube"];

    return (
        <Box component="footer" sx={{ bgcolor: T.white, borderTop: `1px solid ${T.borderLight}` }}>
            <Container maxWidth="lg">
                <Box sx={{ py: 6 }}>
                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em", color: "#0e1726", mb: 6 }}>
                        exness
                    </Typography>

                    <Grid container spacing={4}>
                        {footerColumns.map((col, idx) => (
                            <Grid item xs={6} sm={3} md={1.5} key={idx}>
                                {/* Lấy title đã dịch từ key tương ứng */}
                                <Typography sx={{ fontWeight: 600, color: T.black, fontSize: 14, mb: 2 }}>
                                    {t(`footer.${col.titleKey}`)}
                                </Typography>
                                <Stack spacing={1}>
                                    {col.linkKeys.map((linkKey, linkIdx) => (
                                        <Typography
                                            key={linkIdx}
                                            sx={{ fontSize: 12, color: "#6b7280", "&:hover": { color: T.black }, cursor: "pointer" }}
                                        >
                                            {/* Lấy từng link đã dịch từ key tương ứng */}
                                            {t(`footer.${linkKey}`)}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider />

                <Box sx={{ py: 4 }}>
                    <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                        {socialLinks.map((social) => (
                            <IconButton
                                key={social}
                                size="small"
                                sx={{
                                    color: "#6b7280",
                                    "&:hover": { color: T.black },
                                }}
                            >
                                {socialIcons[social]}
                            </IconButton>
                        ))}
                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2}>
                        <Stack direction="row" spacing={3} flexWrap="wrap">
                            {/* Các link pháp lý - bạn cũng có thể thêm vào file dịch nếu muốn */}
                            <Typography sx={{ fontSize: 12, textDecoration: "underline", cursor: "pointer", color: "black" }}>
                                Risk Disclosure
                            </Typography>
                            <Typography sx={{ fontSize: 12, textDecoration: "underline", cursor: "pointer", color: "black" }}>
                                Preventing Money Laundering
                            </Typography>
                            <Typography sx={{ fontSize: 12, textDecoration: "underline", cursor: "pointer", color: "black" }}>
                                Privacy Policy
                            </Typography>
                            <Typography sx={{ fontSize: 12, textDecoration: "underline", cursor: "pointer", color: "black" }}>
                                PAIA Manual
                            </Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 12, color: "#6b7280" }}>© 2025 Exness</Typography>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}

// ─── STICKY BOTTOM MOBILE ───────────────────────────────────────
function StickyBottomMobile() {
    const { t } = useLanguage("domain3");
    const { navTo } = useLinks();

    return (
        <Box
            sx={{
                display: { xs: "flex", md: "none" },
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
            }}
        >
            <Button
                onClick={() => navTo("register")}
                fullWidth
                sx={{
                    bgcolor: T.brightSunDark,
                    color: T.black,
                    py: 1.75,
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "'Raleway', sans-serif",
                    textTransform: "none",
                    borderRadius: 0,
                    "&:hover": { bgcolor: T.yellow2 },
                }}
            >
                {t("sticky.register")}
            </Button>
        </Box>
    );
}

// ─── LIVE CHAT BUTTON ───────────────────────────────────────────
function LiveChatButton() {
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: { xs: 80, md: 24 },
                right: 24,
                zIndex: 50,
                cursor: "pointer",
                "&:hover .chat-icon": { transform: "scale(1.1)" },
            }}
        >
            <Box
                className="chat-icon"
                sx={{
                    width: 56,
                    height: 56,
                    bgcolor: T.brightSunDark,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s",
                }}
            >
                <Box component="span" sx={{ fontSize: 28, color: T.blackPearl }}>💬</Box>
            </Box>
        </Box>
    );
}

// ─── ROOT COMPONENT ─────────────────────────────────────────────
export default function LandingPageV3() {
    return (
        <Box sx={{ bgcolor: T.white, minHeight: "100vh", pb: { xs: 7, md: 0 } }}>
            <MobileAppBanner />
            <NavBar />
            <HeroSection />
            <ThriveSection />
            <InstrumentsSection />
            <SeizeOpportunitySection />
            <SecuritySection />
            <PodcastSection />
            <NewsSection />
            <FinalCtaSection />
            <DisclaimerSection />
            <Footer />
            <StickyBottomMobile />
            <LiveChatButton />
        </Box>
    );
}