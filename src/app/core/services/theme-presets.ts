export const PRESET_NAMES = [
    "Orange Electric",
    "Electric Blue",
    "Sunset Fusion",
    "Deep Royal",
    "Orange Soft",
    "Blue Neon",
    "Orange Flame",
    "Royal Orange Blue",
    "Soft Blue Orange",
    "Orange Galaxy"
] as const;

export type MinimalPresetName = typeof PRESET_NAMES[number];

export interface MinimalPalette {
    primary: string;
    accent: string;
    warn: string;
    background: string;
    surface: string;
    onSurface: string;
}

export interface MinimalPreset {
    name: MinimalPresetName;
    light: MinimalPalette;
    dark: MinimalPalette;
}

export const THEME_PRESETS: Record<MinimalPresetName, MinimalPreset> = {
    "Orange Electric": {
        name: "Orange Electric",
        light: {
            primary: "rgb(254,95,2)",
            accent: "#0031E5",
            warn: "#d32f2f",
            background: "#ffffff",
            surface: "#ffffff",
            onSurface: "#1e1e1e"
        },
        dark: {
            primary: "rgb(254,95,2)",
            accent: "#5c6bff",
            warn: "#ff8a80",
            background: "#121212",
            surface: "#1e1e1e",
            onSurface: "#eeeeee"
        }
    },

    "Electric Blue": {
        name: "Electric Blue",
        light: {
            primary: "rgb(0,49,229)",
            accent: "rgb(254,95,2)",
            warn: "#e53935",
            background: "#ffffff",
            surface: "#fcfcfc",
            onSurface: "#1a1a1a"
        },
        dark: {
            primary: "#5c6bff",
            accent: "rgb(254,95,2)",
            warn: "#ef9a9a",
            background: "#141414",
            surface: "#1d1d1d",
            onSurface: "#e0e0e0"
        }
    },

    "Sunset Fusion": {
        name: "Sunset Fusion",
        light: {
            primary: "#ff6a00",
            accent: "rgb(0,49,229)",
            warn: "#ff1744",
            background: "#ffffff",
            surface: "#ffffff",
            onSurface: "#222"
        },
        dark: {
            primary: "#ff8a50",
            accent: "#5c6bff",
            warn: "#ff8a80",
            background: "#121212",
            surface: "#1f1f1f",
            onSurface: "#e6e6e6"
        }
    },

    "Deep Royal": {
        name: "Deep Royal",
        light: {
            primary: "rgb(0,49,229)",
            accent: "#ff6f00",
            warn: "#d84315",
            background: "#f8f8f8",
            surface: "#ffffff",
            onSurface: "#222"
        },
        dark: {
            primary: "#6d7cff",
            accent: "#ff8a50",
            warn: "#ff8a65",
            background: "#181818",
            surface: "#232323",
            onSurface: "#e0e0e0"
        }
    },

    "Orange Soft": {
        name: "Orange Soft",
        light: {
            primary: "rgb(254,95,2)",
            accent: "#ff9800",
            warn: "#e53935",
            background: "#ffffff",
            surface: "#ffffff",
            onSurface: "#1e1e1e"
        },
        dark: {
            primary: "#ffb380",
            accent: "#ffcc80",
            warn: "#ff8a80",
            background: "#121212",
            surface: "#1c1c1c",
            onSurface: "#efefef"
        }
    },

    "Blue Neon": {
        name: "Blue Neon",
        light: {
            primary: "rgb(0,49,229)",
            accent: "#448aff",
            warn: "#d32f2f",
            background: "#ffffff",
            surface: "#fbfbfb",
            onSurface: "#1e1e1e"
        },
        dark: {
            primary: "#6f7cff",
            accent: "#82b1ff",
            warn: "#ef9a9a",
            background: "#121212",
            surface: "#1c1c1c",
            onSurface: "#ececec"
        }
    },

    "Orange Flame": {
        name: "Orange Flame",
        light: {
            primary: "rgb(254,95,2)",
            accent: "#ff7043",
            warn: "#c62828",
            background: "#fefefe",
            surface: "#ffffff",
            onSurface: "#252525"
        },
        dark: {
            primary: "#ffab91",
            accent: "#ff8a65",
            warn: "#ff8a80",
            background: "#141414",
            surface: "#1f1f1f",
            onSurface: "#eeeeee"
        }
    },

    "Royal Orange Blue": {
        name: "Royal Orange Blue",
        light: {
            primary: "rgb(0,49,229)",
            accent: "rgb(254,95,2)",
            warn: "#f44336",
            background: "#ffffff",
            surface: "#ffffff",
            onSurface: "#111"
        },
        dark: {
            primary: "#5c6bff",
            accent: "#ff8a50",
            warn: "#ef9a9a",
            background: "#121212",
            surface: "#1d1d1d",
            onSurface: "#eee"
        }
    },

    "Soft Blue Orange": {
        name: "Soft Blue Orange",
        light: {
            primary: "#3f51b5",
            accent: "rgb(254,95,2)",
            warn: "#e53935",
            background: "#fafafa",
            surface: "#ffffff",
            onSurface: "#1c1c1c"
        },
        dark: {
            primary: "#9fa8ff",
            accent: "#ff8a50",
            warn: "#ff8a80",
            background: "#181818",
            surface: "#242424",
            onSurface: "#e6e6e6"
        }
    },

    "Orange Galaxy": {
        name: "Orange Galaxy",
        light: {
            primary: "rgb(254,95,2)",
            accent: "#ff6e40",
            warn: "#ef5350",
            background: "#fdfdfd",
            surface: "#ffffff",
            onSurface: "#1e1e1e"
        },
        dark: {
            primary: "#ffb199",
            accent: "#ff8a65",
            warn: "#ff8a80",
            background: "#131313",
            surface: "#1d1d1d",
            onSurface: "#e0e0e0"
        }
    }
};
export const BACKGROUND_PRESETS = {
    none: {
        light: 'none',
        dark: 'none'
    },
    gradientBlue: {
        light: 'linear-gradient(135deg, #E0F2FE, #BAE6FD, #7DD3FC)',
        dark: 'linear-gradient(135deg, #1E3A8A, #1E40AF, #1D4ED8)'
    },
    softGray: {
        light: '#F8FAFC',
        dark: '#0F172A'
    },
    cardGlass: {
        light: 'linear-gradient(135deg, rgba(255,255,255,0.60), rgba(255,255,255,0.25))',
        dark: 'linear-gradient(135deg, rgba(30,30,30,0.60), rgba(0,0,0,0.35))'
    },
    ocean: {
        light: 'linear-gradient(135deg, #E0F7FA, #B2EBF2, #80DEEA)',
        dark: 'linear-gradient(135deg, #004D40, #00695C, #00796B)'
    },
    /* -------------------------------
        1) Ultra Clean (فرم و بانکداری)
     --------------------------------*/
    "clean-white": {
        light: "#F7F9FC",
        dark: "#101010"
    },

    /* -------------------------------
       2) Neobank Blue (گرادینت)
    --------------------------------*/
    "neobank-blue": {
        light: "linear-gradient(135deg, #E9EEFF 0%, #FFFFFF 100%)",
        dark: "linear-gradient(135deg, #0A1A33 0%, #0F2C55 100%)"
    },

    /* -------------------------------
       3) Neobank Orange
    --------------------------------*/
    "neobank-orange": {
        light: "linear-gradient(135deg, #FFF0E0 0%, #FFFFFF 100%)",
        dark: "linear-gradient(135deg, #2B1200 0%, #4A2600 100%)"
    },

    /* -------------------------------
       4) Soft Finance (بانکی خیلی تمیز)
    --------------------------------*/
    "finance-soft": {
        light: "linear-gradient(145deg, #EEF1F5 0%, #FFFFFF 100%)",
        dark: "linear-gradient(145deg, #121212 0%, #1E1E1E 100%)"
    },

    /* -------------------------------
       5) Executive Gray (سازمانی)
    --------------------------------*/
    "enterprise-gray": {
        light: "#ECEFF1",
        dark: "#0F0F0F"
    },

    /* -------------------------------
       6) Glassmorphism
    --------------------------------*/
    "glass": {
        light: "rgba(255,255,255,0.55)",
        dark: "rgba(0,0,0,0.40)"
    },

    /* -------------------------------
       7) Subtle Pattern Dot
    --------------------------------*/
    "pattern-dots": {
        light: `
            repeating-radial-gradient(circle at 0 0, #EDEDED 0, #EDEDED 3px, #FFFFFF 3px, #FFFFFF 12px)
        `,
        dark: `
            repeating-radial-gradient(circle at 0 0, #1E1E1E 0, #1E1E1E 3px, #0E0E0E 3px, #0E0E0E 12px)
        `
    },

    /* -------------------------------
       8) Subtle Line Pattern
    --------------------------------*/
    "pattern-lines": {
        light: `
            repeating-linear-gradient(
              90deg,
              #fafafa 0px,
              #fafafa 20px,
              #f0f0f0 20px,
              #f0f0f0 40px
            )
        `,
        dark: `
            repeating-linear-gradient(
              90deg,
              #1A1A1A 0px,
              #1A1A1A 20px,
              #141414 20px,
              #141414 40px
            )
        `
    },

    /* -------------------------------
       9) Card Layout Background
    --------------------------------*/
    "card-surface": {
        light: "linear-gradient(145deg, #FFFFFF 0%, #FAFAFA 100%)",
        dark: "linear-gradient(145deg, #1A1A1A 0%, #111111 100%)"
    },

    /* -------------------------------
       10) Banking Steel Blue
    --------------------------------*/
    "metal-blue": {
        light: "linear-gradient(135deg, #E6ECF5 0%, #FFFFFF 100%)",
        dark: "linear-gradient(135deg, #0D1521 0%, #111C2A 100%)"
    },
};
export const CARD_PRESETS = {
    bankClassic: {
        light: {
            bg: "#ffffff",
            border: "1px solid #E2E8F0",
            shadow: "0 1px 3px rgba(0,0,0,0.06)",
            radius: "14px"
        },
        dark: {
            bg: "#1c1c1c",
            border: "1px solid rgba(255,255,255,0.08)",
            shadow: "0 1px 4px rgba(0,0,0,0.4)",
            radius: "14px"
        }
    },

    bankSoft: {
        light: {
            bg: "#fdfdfd",
            border: "1px solid #e5e7eb",
            shadow: "0 2px 6px rgba(0,0,0,0.05)",
            radius: "18px"
        },
        dark: {
            bg: "#222",
            border: "1px solid rgba(255,255,255,0.06)",
            shadow: "0 2px 6px rgba(0,0,0,0.35)",
            radius: "18px"
        }
    },

    bankNeat: {
        light: {
            bg: "#ffffff",
            border: "1px solid var(--primary)",
            shadow: "0 0 0 2px rgba(0,49,229,0.1)",
            radius: "12px"
        },
        dark: {
            bg: "#1b1b1b",
            border: "1px solid var(--primary)",
            shadow: "0 0 0 2px rgba(255,255,255,0.1)",
            radius: "12px"
        }
    },

    bankPaper: {
        light: {
            bg: "#fafafa",
            border: "1px solid #d1d5db",
            shadow: "0 6px 16px rgba(0,0,0,0.04)",
            radius: "16px"
        },
        dark: {
            bg: "#252525",
            border: "1px solid rgba(255,255,255,0.09)",
            shadow: "0 6px 16px rgba(0,0,0,0.45)",
            radius: "16px"
        }
    },

    bankGlass: {
        light: {
            bg: "rgba(255,255,255,0.75)",
            border: "1px solid rgba(255,255,255,0.45)",
            shadow: "0 4px 18px rgba(0,0,0,0.08)",
            radius: "20px"
        },
        dark: {
            bg: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.15)",
            shadow: "0 4px 18px rgba(0,0,0,0.55)",
            radius: "20px"
        }
    }
};
