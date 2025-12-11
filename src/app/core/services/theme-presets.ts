
const DARK_BG = '#232938';
const DARK_SURFACE = '#232938';
const DARK_TEXT = '#F7F7F7';
/* ---------------------------------------------------
 * 1) PRESET NAMES
 * --------------------------------------------------- */
export const PRESET_NAMES = [
    "Amber Spark",
    "Sapphire Ember",
   /* "Coral Horizon",*/
   /* "Royal Sapphire",*/
    // "Soft Amber",
    "Flame Citrine",
    "Obsidian Frost",
    "Amethyst Breeze",
    "Jade Twilight",
    "Indigo Quartz",
    "Ashen Opal",
    "Ocean Lapis",
    "Emerald Grove",
    "Ruby Sunset",
    "Violet Amethyst",
    "Neon Ruby",
    "Ivory Quartz",
    "Onyx Surge"
] as const;

export const PRESET_NAMES_FA = {
    "Orange Electric": "نارنجی الکتریکی",
    "Electric Blue": "آبی الکتریکی",
    "Sunset Fusion": "غروب ترکیبی",
    "Deep Royal": "آبی سلطنتی",
    "Orange Soft": "نارنجی ملایم",
    "Blue Neon": "آبی نئونی",
    "Orange Flame": "شعلهٔ نارنجی",
    "Royal Orange Blue": "نارنجی–آبی سلطنتی",
    "Soft Blue Orange": "آبی–نارنجی ملایم",
    "Orange Galaxy": "کهکشان نارنجی",
    "Bank Executive": "بانکداری اجرایی",
    "Graphite Minimal": "گرافیتی مینیمال",
    "Soft Lavender": "اسطوخودوس ملایم",
    "Midnight Teal": "سبز-آبی نیمه‌شب",
    "Royal Gold": "طلایی سلطنتی",
    "Cyber Lime": "لایم سایبری",
    "Tech Indigo": "نیلی تکنولوژیک",
    "Legacy Bank Gray": "خاکستری بانکی کلاسیک",
    "Calm Ocean": "اقیانوس آرام",
    "Lush Forest": "جنگل انبوه",
    "Modern Gray-scale": "خاکستری مدرن",
    "Sunset": "غروب",
    "Dreamy Purple": "بنفش رویایی",
    "Clear Sky": "آسمان صاف",
    "Warm Earth": "زمین گرم",
    "Energetic Neon": "نئونی پرانرژی",
    "Creamy Minimalist": "مینیمال کرمی",
    "Deep Dark": "تاریک عمیق"
} as const;
export type MinimalPresetName = typeof PRESET_NAMES[number];
export type MinimalPresetNameFA = keyof typeof PRESET_NAMES_FA;

/* ---------------------------------------------------
 * 2) BACKGROUND PRESET NAMES
 * --------------------------------------------------- */
export const BACKGROUND_PRESET_NAMES = [
    "none",
    "gradientBlue",
    "softGray",
    "cardGlass",
    "ocean",
    "clean-white",
    "neobank-blue",
    "neobank-orange",
    "finance-soft",
    "enterprise-gray",
    "glass",
    "pattern-dots",
    "pattern-lines",
    "card-surface",
    "metal-blue",
    "indigo-quartz",
    "amber-spark",
    "dark-deep-navy",
    "dark-carbon",
    "dark-emerald",
    "dark-violet"
] as const;

export type BackgroundPresetName = typeof BACKGROUND_PRESET_NAMES[number];

/* ---------------------------------------------------
 * 3) INTERFACES
 * --------------------------------------------------- */
export interface BackgroundPreset {
    light: string;
    dark: string;
}

export interface MinimalPalette {
    primary: string;
    accent: string;
    warn: string;
    background?: string;
    surface?: string;
    onSurface?: string;
}

export interface MinimalPreset {
    name: MinimalPresetName;
    displayName:string,
    light: MinimalPalette;
    dark: MinimalPalette;
    backgroundPreset?: BackgroundPresetName;
}

/* ---------------------------------------------------
 * 4) BACKGROUND PRESETS (فقط یک بار)
 * --------------------------------------------------- */
export const BACKGROUND_PRESETS: Record<BackgroundPresetName, BackgroundPreset> = {
    none: {
        light: "none",
        dark: "none"
    },
    gradientBlue: {
        light: "linear-gradient(135deg, #E0F2FE, #BAE6FD, #7DD3FC)",
        dark: "linear-gradient(135deg, #1E3A8A, #1E40AF, #1D4ED8)"
    },
    softGray: {
        light: "#F8FAFC",
        dark: "#0F172A"
    },
    cardGlass: {
        light: "linear-gradient(135deg, rgba(255,255,255,0.60), rgba(255,255,255,0.25))",
        dark: "linear-gradient(135deg, rgba(30,30,30,0.60), rgba(0,0,0,0.35))"
    },
    ocean: {
        light: "linear-gradient(135deg, #E0F7FA, #B2EBF2, #80DEEA)",
        dark: "linear-gradient(135deg, #004D40, #00695C, #00796B)"
    },
    glass: {
        light: "rgba(255,255,255,0.55)",
        dark: "rgba(0,0,0,0.40)"
    },
    "clean-white": {
        light: "#eef8f4",
        dark: "#101010"
    },
    "neobank-blue": {
        light: "linear-gradient(135deg, #E9EEFF 0%, #FFFFFF 100%)",
        dark: "linear-gradient(135deg, #0A1A33 0%, #0F2C55 100%)"
    },
    "neobank-orange": {
        light: "linear-gradient(135deg, #FFF0E0 0%, #FFFFFF 100%)",
        dark: "linear-gradient(135deg, #2B1200 0%, #4A2600 100%)"
    },
    "finance-soft": {
        light: "linear-gradient(145deg, #EEF1F5 0%, #FFFFFF 100%)",
        dark: "linear-gradient(145deg, #121212 0%, #1E1E1E 100%)"
    },
    "enterprise-gray": {
        light: "#ECEFF1",
        dark: "#0F0F0F"
    },
    "pattern-dots": {
        light: `repeating-radial-gradient(circle at 0 0, #EDEDED 0, #EDEDED 3px, #FFFFFF 3px, #FFFFFF 12px)`,
        dark: `repeating-radial-gradient(circle at 0 0, #1E1E1E 0, #1E1E1E 3px, #0E0E0E 3px, #0E0E0E 12px)`
    },
    "pattern-lines": {
        light: `repeating-linear-gradient(
              90deg,
              #fafafa 0px,
              #fafafa 20px,
              #f0f0f0 20px,
              #f0f0f0 40px
            )`,
        dark: `repeating-linear-gradient(
              90deg,
              #1A1A1A 0px,
              #1A1A1A 20px,
              #141414 20px,
              #141414 40px
            )`
    },
    "card-surface": {
        light: "linear-gradient(145deg, #FFFFFF 0%, #FAFAFA 100%)",
        dark: "linear-gradient(145deg, #1A1A1A 0%, #111111 100%)"
    },
    "metal-blue": {
        light: "linear-gradient(135deg, #E6ECF5 0%, #FFFFFF 100%)",
        dark: "linear-gradient(135deg, #0D1521 0%, #111C2A 100%)"
    },
    "indigo-quartz": {
        light: "rgba(136,135,135,0.36)",
        dark: "linear-gradient(145deg, #020617 0%, #050818 45%, #020617 100%)"
        // #020617 و #050818 هر دو از #1e2434 و #343b4f تیره‌ترن
    },
    "amber-spark": {
        light: "#f5e5e0",
        dark: "linear-gradient(145deg, #020617 0%, #050818 45%, #020617 100%)"
        // #020617 و #050818 هر دو از #1e2434 و #343b4f تیره‌ترن
    },
    "dark-deep-navy": {
        light: "#b3c4dc",
        dark: "linear-gradient(145deg, #020617 0%, #050818 45%, #020617 100%)"
        // #020617 و #050818 هر دو از #1e2434 و #343b4f تیره‌ترن
    },
    "dark-carbon": {
        light: "#F5F5F5",
        dark: "radial-gradient(circle at top, #050505 0%, #020202 40%, #000000 100%)"
        // بک‌گراند تقریبا مشکی → منو و کارت خاکستری تیره و روشن‌تر به چشم میان
    },
    "dark-emerald": {
        light: "#F3FBF7",
        dark: "linear-gradient(145deg, #020b07 0%, #02130c 50%, #020b07 100%)"
        // خیلی تیره، ته‌مایه سبز خیلی خیلی ملایم
    },
    "dark-violet": {
        light: "#F6F2FF",
        dark: "linear-gradient(145deg, #070518 0%, #09041f 45%, #050314 100%)"
        // بک‌گراند بنفش-مشکی خیلی تیره، عالی کنار کارت‌های #343b4f
    }
};

export const THEME_PRESETS: Record<MinimalPresetName, MinimalPreset> = {

    "Sapphire Ember": {
        name: "Sapphire Ember",
        displayName: "یاقوت کبودِ گداخته",
        backgroundPreset: "dark-deep-navy",
        light: {
            primary: "rgb(0,49,229)",
            accent: "rgb(254,95,2)",
            warn: "#e53935",
            background: "#f3c8b1",
            surface: "#fcfcfc",

            onSurface: "#1a1a1a"
        },
        dark: {
            primary: "#5c6bff",
            accent: "rgb(254,95,2)",
            warn: "#ef9a9a",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },

    "Obsidian Frost": {
        name: "Obsidian Frost",
        displayName:"یخ‌مهٔ ابسیدین",
        backgroundPreset: "softGray",
        light: {
            primary: "#444444",
            accent: "#1E90FF",
            warn: "#E63946",
            background: "#F5F5F5",
            surface: "#FFFFFF",
            onSurface: "#1A1A1A"
        },
        dark: {
            primary: "#B5B5B5",
            accent: "#63B3FF",
            warn: "#FF7B82",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },

    "Amethyst Breeze": {
        name: "Amethyst Breeze",
        displayName:"نسیم آمتیست",

        // قبلاً pattern-dots بود
        backgroundPreset: "dark-violet",

        light: {
            primary: "#B388EB",
            accent: "#8BC6EC",
            warn: "#E57373",
            background: "#F7F2FD",
            surface: "#FFFFFF",
            onSurface: "#3D2A5F"
        },
        dark: {
            primary: "#D3B3FF",
            accent: "#A5DFFF",
            warn: "#FF9A9A",

            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },

    "Jade Twilight": {
        name: "Jade Twilight",
        displayName:"غروب یشم",
        backgroundPreset: "clean-white",
        light: {
            primary: "#005F73",
            accent: "#94D2BD",
            warn: "#EE6055",
            background: "#bde7e7",
            surface: "#FFFFFF",
            onSurface: "#102A34"
        },
        dark: {
            primary: "#6CC5BD",
            accent: "#A8E8D7",
            warn: "#FF8C7C",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },


    "Indigo Quartz": {
        name: "Indigo Quartz",
        displayName:"کوارتز نیلی",
        backgroundPreset: "indigo-quartz",
        light: {
            primary: "#3F3D56",
            accent: "#00A8E8",
            warn: "#D7263D",
            background: "#F7F9FC",
            surface: "#FFFFFF",
            onSurface: "#202020"
        },
        dark: {
            primary: "#9EA0D9",
            accent: "#4ECDFB",
            warn: "#FF8991",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },

    "Amber Spark": {
        name: "Amber Spark",
        displayName:"جرقهٔ کهربا",
        backgroundPreset: "amber-spark",
        light: {
            primary: "rgb(254,95,2)",
            accent: "#0031E5",
            warn: "#d32f2f",
            background: "linear-gradient(135deg, #FFF2E6, #FFE5D1, #FFD1B5)",
            surface: "#ffffff",
            onSurface: "#1e1e1e"
        },
        dark: {
            primary: "rgb(254,95,2)",
            accent: "#5c6bff",
            warn: "#ff8a80",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },


    "Flame Citrine": {
        name: "Flame Citrine",
        displayName:"سیترین شعله‌ای",
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
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },



    "Ashen Opal": {
        name: "Ashen Opal",
        displayName:"اوپال خاکستری",
        backgroundPreset: "softGray",
        light: {
            primary: "#8AB4F8",
            accent: "#5F6368",
            warn: "#D32F2F",
            background: "#E0E0E0",
            surface: "#FAFAFA",
            onSurface: "#424242"
        },
        dark: {
            primary: "#90CAF9",
            accent: "#B0BEC5",
            warn: "#FF8A80",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },

    "Ocean Lapis": {
        name: "Ocean Lapis",
        displayName:"لاجورد اقیانوس",
        light: {
            primary: "#2E86AB",
            accent: "#F18F01",
            warn: "#d32f2f",
            background: "#F8F9FA",
            surface: "#ffffff",
            onSurface: "#212529"
        },
        dark: {
            primary: "#4EA8C8",
            accent: "#FFB347",
            warn: "#ff8a80",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },

    "Emerald Grove": {
        name: "Emerald Grove",
        displayName:"بیشهٔ زمردی",
        light: {
            primary: "#2D6A4F",
            accent: "#D4A373",
            warn: "#d32f2f",
            background: "rgba(147,164,164,0.52)",
            surface: "#ffffff",
            onSurface: "#343A40"
        },
        dark: {
            primary: "#40916C",
            accent: "#E6C8A8",
            warn: "#ff8a80",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },


    "Ruby Sunset": {
        name: "Ruby Sunset",
        displayName:"غروب یاقوتی",
        light: {
            primary: "#E63946",
            accent: "#F1C40F",
            warn: "#d84315",
            background: "#FFF3E0",
            surface: "#ffffff",
            onSurface: "#5D4037"
        },
        dark: {
            primary: "#FF6B6B",
            accent: "#FFD870",
            warn: "#ff8a65",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },

    "Violet Amethyst": {
        name: "Violet Amethyst",
        displayName:"آمتیست بنفش",
        light: {
            primary: "#6A4C93",
            accent: "#F7B2AD",
            warn: "#c2185b",
            background: "rgba(220,215,220,0.78)",
            surface: "#ffffff",
            onSurface: "#4A148C"
        },
        dark: {
            primary: "#9D7AD0",
            accent: "#FFCDD5",
            warn: "#ff80ab",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },

    "Neon Ruby": {
        name: "Neon Ruby",
        displayName:"یاقوت نئونی",
        light: {
            primary: "#FF006E",
            accent: "#3A86FF",
            warn: "#d32f2f",
            background: "#FFFFFF",
            surface: "#F8F8F8",
            onSurface: "#1A1A1D"
        },
        dark: {
            primary: "#FF3F9F",
            accent: "#6BA6FF",
            warn: "#ff8a80",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },

    "Ivory Quartz": {
        name: "Ivory Quartz",
        displayName:"کوارتز عاجی",
        light: {
            primary: "#C9ADA7",
            accent: "#9A8C98",
            warn: "#d84315",
            background: "#F2E9E4",
            surface: "#ffffff",
            onSurface: "#4A4E69"
        },
        dark: {
            primary: "#D5C9C4",
            accent: "#B5AABB",
            warn: "#ff8a80",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    },

    "Onyx Surge": {
        name: "Onyx Surge",
        displayName:"موج اونیکس",
        light: {
            primary: "#00BCD4",
            accent: "#E91E63",
            warn: "#d32f2f",
            background: "#E3F2F4",
            surface: "#ffffff",
            onSurface: "#212121"
        },
        dark: {
            primary: "#00E5FF",
            accent: "#FF4F8B",
            warn: "#ef9a9a",
            background: DARK_BG,
            surface: DARK_SURFACE,
            onSurface: DARK_TEXT
        }
    }
};

/* ---------------------------------------------------
 * 6) CARD PRESETS
 * --------------------------------------------------- */
export const CARD_PRESETS = {
    white: {
        light: {
            bg: "#ffebee",
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

    mirror: {
        light: {
            bg: "var(--app-background)",
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
            bg: "var(--app-background)",
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
            bg: "var(--app-background)",
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
            bg: "var(--app-background)",
            border: "1px solid rgba(255,255,255,0.45)",
            shadow: "0 4px 18px rgba(0,0,0,0.08)",
            radius: "20px"
        },
        dark: {
            bg: "var(--app-background)",
            border: "1px solid rgba(255,255,255,0.15)",
            shadow: "0 4px 18px rgba(0,0,0,0.55)",
            radius: "20px"
        }
    },
    bankElegant: {
        light: {
            bg: "#FFFFFF",
            border: "1px solid rgba(27,58,87,0.25)",
            shadow: "0 4px 14px rgba(0,0,0,0.06)",
            radius: "18px"
        },
        dark: {
            bg: "var(--app-background)",
            border: "1px solid rgba(255,255,255,0.08)",
            shadow: "0 4px 16px rgba(0,0,0,0.55)",
            radius: "18px"
        }
    },

    neoBankGlass: {
        light: {
            bg: "rgba(255,255,255,0.35)",
            border: "1px solid rgba(255,255,255,0.5)",
            shadow: "0 8px 22px rgba(0,0,0,0.04)",
            radius: "22px"
        },
        dark: {
            bg: "var(--app-background)",
            border: "1px solid rgba(255,255,255,0.12)",
            shadow: "0 8px 32px rgba(0,0,0,0.55)",
            radius: "22px"
        }
    },

    bankGreenTrust: {
        light: {
            bg: "#F2FFF8",
            border: "1px solid #8ECDAA",
            shadow: "0 6px 14px rgba(0,0,0,0.05)",
            radius: "16px"
        },
        dark: {
            bg: "var(--app-background)",
            border: "1px solid #5EA884",
            shadow: "0 6px 16px rgba(0,0,0,0.55)",
            radius: "16px"
        }
    },

    financeMinimal: {
        light: {
            bg: "#FFFFFF",
            border: "1px solid #ECECEC",
            shadow: "0 2px 4px rgba(0,0,0,0.04)",
            radius: "12px"
        },
        dark: {
            bg: "var(--app-background)",
            border: "1px solid rgba(255,255,255,0.05)",
            shadow: "0 2px 8px rgba(0,0,0,0.45)",
            radius: "12px"
        }
    },

    bankFrost: {
        light: {
            bg: "linear-gradient(145deg, #FFFFFFAA, #F7F7F788)",
            border: "1px solid rgba(255,255,255,0.4)",
            shadow: "0 4px 16px rgba(0,0,0,0.06)",
            radius: "20px"
        },
        dark: {
            bg: "var(--app-background)",
            border: "1px solid rgba(255,255,255,0.1)",
            shadow: "0 4px 20px rgba(0,0,0,0.6)",
            radius: "20px"
        }
    },
    sapphireEmberRed: {
        light: {
            bg: "#ffebee",                                  // پس‌زمینه قرمز خیلی روشن
            border: "1px solid #ef5350",                    // بوردر قرمز
            shadow: "0 8px 20px rgba(239,83,80,0.25)",      // شَدو قرمز نرم
            radius: "16px"
        },
        dark: {
            bg: "#3b0f12",                                  // قرمز خیلی تیره برای دارک مود
            border: "1px solid #ef9a9a",
            shadow: "0 10px 28px rgba(0,0,0,0.75)",
            radius: "16px"
        }
    },

    neoBlue: {
        light: {
            bg: "var(--app-background)",
            border: "1px solid #DCE6FF",
            shadow: "0 6px 18px rgba(0,49,229,0.06)",
            radius: "18px"
        },
        dark: {
            bg: "var(--app-background)",
            border: "1px solid rgba(80,110,235,0.3)",
            shadow: "0 8px 26px rgba(0,0,0,0.6)",
            radius: "18px"
        }
    },

    bankPremiumBlack: {
        light: {
            bg: "var(--app-background)",
            border: "1px solid #C4A878",
            shadow: "0 10px 24px rgba(196,168,120,0.2)",
            radius: "20px"
        },
        dark: {
            bg: "var(--app-background)",
            border: "1px solid #C4A878",
            shadow: "0 10px 32px rgba(0,0,0,0.75)",
            radius: "20px"
        }
    },

    corporateSharp: {
        light: {
            bg: "#FFFFFF",
            border: "2px solid #1B3A57",
            shadow: "0 3px 12px rgba(0,0,0,0.05)",
            radius: "10px"
        },
        dark: {
            bg: "var(--app-background)",
            border: "2px solid #4D6A89",
            shadow: "0 3px 12px rgba(0,0,0,0.55)",
            radius: "10px"
        }
    }

};

