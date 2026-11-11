import { style } from "@vanilla-extract/css";

const homeViewStyle = {
  pageRoot: style({
    minHeight: "100dvh",
    padding: "72px 24px",
    background: "radial-gradient(circle at 10% 20%, #dbeafe 0%, #eff6ff 45%, #f8fafc 100%)",
  }),
  container: style({
    maxWidth: 920,
    margin: "0 auto",
    padding: 32,
    borderRadius: 24,
    border: "1px solid #dbe1ea",
    background: "rgba(255, 255, 255, 0.88)",
    boxShadow: "0 22px 50px rgba(15, 23, 42, 0.12)",
  }),
  heading: style({
    marginBottom: 16,
    letterSpacing: "-0.03em",
  }),
  description: style({
    marginBottom: 24,
    color: "#334155",
    lineHeight: 1.6,
  }),
  navList: style({
    display: "grid",
    gap: 12,
    padding: 0,
    listStyle: "none",
  }),
  navItemLink: style({
    display: "block",
    padding: "14px 16px",
    border: "1px solid #cbd5e1",
    borderRadius: 12,
    color: "#0f172a",
    fontWeight: 500,
    textDecoration: "none",
    background: "#f8fafc",
    transition: "transform .2s ease, box-shadow .2s ease, border-color .2s ease",
    selectors: {
      "&:hover": {
        borderColor: "#60a5fa",
        boxShadow: "0 10px 24px rgba(59, 130, 246, 0.16)",
        transform: "translateY(-2px)",
      },
    },
  }),
};

export default homeViewStyle;
