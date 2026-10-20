/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#004ac6",
        "primary-container": "#2563eb",
        "on-primary": "#ffffff",
        "on-primary-container": "#eeefff",
        "primary-fixed": "#dbe1ff",
        "primary-fixed-dim": "#b4c5ff",
        "on-primary-fixed": "#00174b",
        "on-primary-fixed-variant": "#003ea8",
        
        secondary: "#006a61",
        "secondary-container": "#86f2e4",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#006f66",
        "secondary-fixed": "#89f5e7",
        "secondary-fixed-dim": "#6bd8cb",
        "on-secondary-fixed": "#00201d",
        
        tertiary: "#6a1edb",
        "tertiary-container": "#8343f4",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#f7edff",
        "tertiary-fixed": "#eaddff",
        
        surface: "#faf8ff",
        "surface-dim": "#d2d9f4",
        "surface-bright": "#faf8ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f3ff",
        "surface-container": "#eaedff",
        "surface-container-high": "#e2e7ff",
        "surface-container-highest": "#dae2fd",
        "surface-variant": "#dae2fd",
        "surface-tint": "#0053db",
        
        "on-surface": "#131b2e",
        "on-surface-variant": "#434655",
        "inverse-surface": "#283044",
        "inverse-on-surface": "#eef0ff",
        
        outline: "#737686",
        "outline-variant": "#c3c6d7",
        
        background: "#faf8ff",
        "on-background": "#131b2e",
        
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "Vazirmatn", "system-ui", "sans-serif"],
        vazir: ["var(--font-vazirmatn)", "Vazirmatn", "sans-serif"],
      },
      spacing: {
        gutter: "1.5rem",
        "gutter-sm": "1rem",
        "gutter-lg": "2rem",
        margin: "1.5rem",
        "margin-sm": "1rem",
        "margin-lg": "3rem",
      },
      boxShadow: {
        'level-1': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'level-2': '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)',
        'level-3': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.03)',
        'glow-primary': '0 0 20px rgba(37,99,235,0.2)',
      }
    },
  },
  plugins: [],
};
