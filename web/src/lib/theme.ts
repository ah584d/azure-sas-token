export type ThemeName = "azure" | "mint" | "sunset" | "violet";

export type ThemeMeta = {
  name: ThemeName;
  label: string;
  description: string;
  swatch: string;
};

export const THEMES: readonly ThemeMeta[] = [
  {
    name: "azure",
    label: "Azure",
    description: "Cool dark blue (default)",
    swatch: "linear-gradient(135deg, #0a1929 0%, #38bdf8 100%)",
  },
  {
    name: "mint",
    label: "Mint",
    description: "Light with fresh green accents",
    swatch: "linear-gradient(135deg, #ecfdf5 0%, #10b981 100%)",
  },
  {
    name: "sunset",
    label: "Sunset",
    description: "Warm amber and pink",
    swatch: "linear-gradient(135deg, #7c2d12 0%, #fbbf24 100%)",
  },
  {
    name: "violet",
    label: "Violet",
    description: "Deep purple with pink accents",
    swatch: "linear-gradient(135deg, #1e1b4b 0%, #a78bfa 100%)",
  },
];

const COOKIE_NAME = "sas-theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const isThemeName = (value: unknown): value is ThemeName =>
  value === "azure" ||
  value === "mint" ||
  value === "sunset" ||
  value === "violet";

export function readThemeCookie(): ThemeName {
  if (typeof document === "undefined") return "azure";
  const cookies = document.cookie.split(";");
  for (const raw of cookies) {
    const [key, ...rest] = raw.trim().split("=");
    if (key === COOKIE_NAME) {
      const value = decodeURIComponent(rest.join("="));
      if (isThemeName(value)) return value;
    }
  }
  return "azure";
}

export function writeThemeCookie(theme: ThemeName): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${theme}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

export function applyTheme(theme: ThemeName): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
}
