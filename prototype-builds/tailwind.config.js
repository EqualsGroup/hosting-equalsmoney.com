module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "eqextendedstone-greyeq-stone-grey-04":
          "var(--eqextendedstone-greyeq-stone-grey-04)",
        "eqprimaryeq-midnight-blue": "var(--eqprimaryeq-midnight-blue)",
        "eqprimaryeq-sunset-yellow": "var(--eqprimaryeq-sunset-yellow)",
        "eqprimaryeq-white": "var(--eqprimaryeq-white)",
        "eqsecondaryeq-sky-blue-09": "var(--eqsecondaryeq-sky-blue-09)",
        "ffxprimaryffx-polar-white": "var(--ffxprimaryffx-polar-white)",
        iconiconprimary: "var(--iconiconprimary)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "base-text-xs-regular": "var(--base-text-xs-regular-font-family)",
        "base-text-xs-semibold": "var(--base-text-xs-semibold-font-family)",
        "body-bold-large": "var(--body-bold-large-font-family)",
        "body-bold-medium": "var(--body-bold-medium-font-family)",
        "body-bold-small": "var(--body-bold-small-font-family)",
        "body-bold-x-small": "var(--body-bold-x-small-font-family)",
        "body-regular-large": "var(--body-regular-large-font-family)",
        "body-regular-medium": "var(--body-regular-medium-font-family)",
        "body-regular-small": "var(--body-regular-small-font-family)",
        "body-small-regular": "var(--body-small-regular-font-family)",
        "heading-medium": "var(--heading-medium-font-family)",
        "subheading-x-small": "var(--subheading-x-small-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow: {
        "regular-shadow-medium": "var(--regular-shadow-medium)",
        "regular-shadow-small": "var(--regular-shadow-small)",
        "regular-shadow-x-small": "var(--regular-shadow-x-small)",
        "shadow-menu": "var(--shadow-menu)",
        "toggle-shadow": "var(--toggle-shadow)",
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
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      transform: {
        'rotate-y-180': 'rotateY(180deg)',
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};