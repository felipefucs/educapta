import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Paleta Principal - Roxo Sóbrio (Slate Purple)
        primary: {
          50: "#fafafa", // Quase branco
          100: "#f4f4f5", // Cinza muito claro
          200: "#e4e4e7", // Cinza claro
          300: "#d4d4d8", // Cinza médio claro
          400: "#a1a1aa", // Cinza médio
          500: "#71717a", // Cinza principal
          600: "#52525b", // Cinza escuro
          700: "#3f3f46", // Cinza muito escuro
          800: "#27272a", // Quase preto
          900: "#18181b", // Preto suave
        },
        // Paleta Secundária - Roxo Suave
        secondary: {
          50: "#faf9ff", // Roxo quase imperceptível
          100: "#f3f1ff", // Roxo muito sutil
          200: "#e9e5ff", // Roxo claro sutil
          300: "#d6ccff", // Roxo suave
          400: "#b8a9ff", // Roxo médio suave
          500: "#9b87f5", // Roxo principal sóbrio
          600: "#8b5cf6", // Roxo médio
          700: "#7c3aed", // Roxo forte
          800: "#6b21a8", // Roxo escuro
          900: "#581c87", // Roxo profundo
        },
        // Paleta de Apoio - Azul Acinzentado
        accent: {
          50: "#f8fafc", // Azul muito claro
          100: "#f1f5f9", // Azul claro
          200: "#e2e8f0", // Azul suave
          300: "#cbd5e1", // Azul médio claro
          400: "#94a3b8", // Azul médio
          500: "#64748b", // Azul principal
          600: "#475569", // Azul forte
          700: "#334155", // Azul escuro
          800: "#1e293b", // Azul muito escuro
          900: "#0f172a", // Azul profundo
        },
        // Cores de Status - Tons Sóbrios
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#16a34a", // Verde sóbrio
          600: "#15803d",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#d97706", // Amarelo sóbrio
          600: "#b45309",
        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#dc2626", // Vermelho sóbrio
          600: "#b91c1c",
        },
        info: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#2563eb", // Azul sóbrio
          600: "#1d4ed8",
        },
        // Cores do sistema (mantendo compatibilidade com shadcn)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cores da sidebar
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
