/* ---------------------------------------------------
 * 1) PRESET NAMES
 * --------------------------------------------------- */
export const PRESET_NAMES = [
    "Amber Spark",
    "Sapphire Ember",
    "Coral Horizon",
    "Royal Sapphire",
    "Soft Amber",
    "Neon Aquamarine",
    "Flame Citrine",
    "Imperial Ember",
    "Azure Citrine",
    "Galactic Amber",
    "Steel Sapphire",
    "Obsidian Frost",
    "Amethyst Breeze",
    "Jade Twilight",
    "Golden Topaz",
    "Peridot Pulse",
    "Indigo Quartz",
    "Ashen Opal",

    "Ocean Lapis",
    "Emerald Grove",
    "Graphite Emerald",
    "Ruby Sunset",
    "Violet Amethyst",
    "Sky Aquamarine",
    "Earthy Jasper",
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
    "metal-blue"
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
    glass: {
        light: "rgba(255,255,255,0.55)",
        dark: "rgba(0,0,0,0.40)"
    },

    /* -------------------------------
       7) Subtle Pattern Dot
    --------------------------------*/
    "pattern-dots": {
        light: `repeating-radial-gradient(circle at 0 0, #EDEDED 0, #EDEDED 3px, #FFFFFF 3px, #FFFFFF 12px)`,
        dark: `repeating-radial-gradient(circle at 0 0, #1E1E1E 0, #1E1E1E 3px, #0E0E0E 3px, #0E0E0E 12px)`
    },

    /* -------------------------------
       8) Subtle Line Pattern
    --------------------------------*/
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
    }
};

/* ---------------------------------------------------
 * 5) THEME PRESETS (کامل، بدون حذف)
 * --------------------------------------------------- */
export const THEME_PRESETS: Record<MinimalPresetName, MinimalPreset> = {

    "Sapphire Ember": {
        name: "Sapphire Ember",
        displayName: "یاقوت کبودِ گداخته",
        backgroundPreset: "ocean",
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
            background: "#121212",
            surface: "#1D1D1D",
            onSurface: "#EAEAEA"
        }
    },

    "Amethyst Breeze": {
        name: "Amethyst Breeze",
        displayName:"نسیم آمتیست",
        backgroundPreset: "pattern-dots",
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
            background: "#221832",
            surface: "#322545",
            onSurface: "#F0E6FF"
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
            background: "#F1FAFA",
            surface: "#FFFFFF",
            onSurface: "#102A34"
        },
        dark: {
            primary: "#6CC5BD",
            accent: "#A8E8D7",
            warn: "#FF8C7C",
            background: "#0C1D1E",
            surface: "#143235",
            onSurface: "#DFF3F2"
        }
    },

    "Golden Topaz": {
        name: "Golden Topaz",
        displayName:"توپاز زرین",
        backgroundPreset: "enterprise-gray",
        light: {
            primary: "#C59D5F",
            accent: "#1B3A57",
            warn: "#C0392B",
            background: "#FAF6EF",
            surface: "#FFFFFF",
            onSurface: "#2F2F2F"
        },
        dark: {
            primary: "#E7C78A",
            accent: "#4579A6",
            warn: "#FF8273",
            background: "#171310",
            surface: "#241F1A",
            onSurface: "#F0E8D8"
        }
    },

    "Peridot Pulse": {
        name: "Peridot Pulse",
        displayName:"پالس پریدوت",
        backgroundPreset: "metal-blue",
        light: {
            primary: "#A3FF00",
            accent: "#0AFFE2",
            warn: "#F72585",
            background: "#FFFFFF",
            surface: "#F4F7F8",
            onSurface: "#1A1A1A"
        },
        dark: {
            primary: "#BAFF4A",
            accent: "#37FFE9",
            warn: "#FF79B0",
            background: "#0B0F12",
            surface: "#171C20",
            onSurface: "#E1E1E1"
        }
    },

    "Indigo Quartz": {
        name: "Indigo Quartz",
        displayName:"کوارتز نیلی",
        backgroundPreset: "finance-soft",
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
            background: "#12141A",
            surface: "#1C1D26",
            onSurface: "#E6E6E6"
        }
    },

    "Amber Spark": {
        name: "Amber Spark",
        displayName:"جرقهٔ کهربا",
        backgroundPreset: "gradientBlue",
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
            background: "#121212",
            surface: "#1e1e1e",
            onSurface: "#eeeeee"
        }
    },

    "Coral Horizon": {
        name: "Coral Horizon",
        displayName:"افق مرجانی",
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

    "Royal Sapphire": {
        name: "Royal Sapphire",
        displayName:"یاقوت کبود شاهانه",
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

    "Soft Amber": {
        name: "Soft Amber",
        displayName:"کهربای نرم",
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

    "Neon Aquamarine": {
        name: "Neon Aquamarine",
        displayName:"آکوآمارین نئونی",
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
            background: "#141414",
            surface: "#1f1f1f",
            onSurface: "#eeeeee"
        }
    },

    "Imperial Ember": {
        name: "Imperial Ember",
        displayName:"اخگر امپراتوری",
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

    "Azure Citrine": {
        name: "Azure Citrine",
        displayName:"سیترین آبی",
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

    "Galactic Amber": {
        name: "Galactic Amber",
        displayName:"کهربای کهکشانی",
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
    },

    "Steel Sapphire": {
        name: "Steel Sapphire",
        displayName:"یاقوت فولادی",
        backgroundPreset: "finance-soft",
        light: {
            primary: "#1B3A57",
            accent: "#C9A86B",
            warn: "#D32F2F",
            background: "#F5F7FA",
            surface: "#FFFFFF",
            onSurface: "#1A1A1A"
        },
        dark: {
            primary: "#4D6A89",
            accent: "#E6C48C",
            warn: "#FF8A80",
            background: "#0F131A",
            surface: "#1A222C",
            onSurface: "#E8EBEF"
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
            background: "#1E1E1E",
            surface: "#2A2A2A",
            onSurface: "#E0E0E0"
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
            background: "#0F1B24",
            surface: "#1A2A33",
            onSurface: "#E0E0E0"
        }
    },

    "Emerald Grove": {
        name: "Emerald Grove",
        displayName:"بیشهٔ زمردی",
        light: {
            primary: "#2D6A4F",
            accent: "#D4A373",
            warn: "#d32f2f",
            background: "#FEFAE0",
            surface: "#ffffff",
            onSurface: "#343A40"
        },
        dark: {
            primary: "#40916C",
            accent: "#E6C8A8",
            warn: "#ff8a80",
            background: "#1B2C22",
            surface: "#25382C",
            onSurface: "#E8E6E3"
        }
    },

    "Graphite Emerald": {
        name: "Graphite Emerald",
        displayName:"زمرد گرافیتی",
        light: {
            primary: "#495057",
            accent: "#20C997",
            warn: "#d32f2f",
            background: "#FFFFFF",
            surface: "#F8F9FA",
            onSurface: "#212529"
        },
        dark: {
            primary: "#6C757D",
            accent: "#38E8B8",
            warn: "#ef9a9a",
            background: "#121212",
            surface: "#1E1E1E",
            onSurface: "#E0E0E0"
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
            background: "#2A1B1A",
            surface: "#3A2A28",
            onSurface: "#F5EDEB"
        }
    },

    "Violet Amethyst": {
        name: "Violet Amethyst",
        displayName:"آمتیست بنفش",
        light: {
            primary: "#6A4C93",
            accent: "#F7B2AD",
            warn: "#c2185b",
            background: "#F3E5F5",
            surface: "#ffffff",
            onSurface: "#4A148C"
        },
        dark: {
            primary: "#9D7AD0",
            accent: "#FFCDD5",
            warn: "#ff80ab",
            background: "#2A1A3A",
            surface: "#3A294C",
            onSurface: "#EEDDF7"
        }
    },

    "Sky Aquamarine": {
        name: "Sky Aquamarine",
        displayName:"آکوآمارین آسمانی",
        light: {
            primary: "#0077B6",
            accent: "#90E0EF",
            warn: "#e53935",
            background: "#CAF0F8",
            surface: "#ffffff",
            onSurface: "#03045E"
        },
        dark: {
            primary: "#00A5E4",
            accent: "#B8F3FF",
            warn: "#ef9a9a",
            background: "#0A1A2A",
            surface: "#0F2438",
            onSurface: "#E0F4FF"
        }
    },

    "Earthy Jasper": {
        name: "Earthy Jasper",
        displayName:"جاسپر خاکی",
        light: {
            primary: "#8B4513",
            accent: "#BC6C25",
            warn: "#d32f2f",
            background: "#FAEBD7",
            surface: "#ffffff",
            onSurface: "#3E2723"
        },
        dark: {
            primary: "#A06030",
            accent: "#D98745",
            warn: "#ff8a80",
            background: "#2A1A12",
            surface: "#3A2820",
            onSurface: "#EDDACF"
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
            background: "#1A1A1D",
            surface: "#242427",
            onSurface: "#F5F5F5"
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
            background: "#2E2A32",
            surface: "#3A363E",
            onSurface: "#E8E6EA"
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
            background: "#121212",
            surface: "#1D1D1D",
            onSurface: "#E0E0E0"
        }
    }
};

/* ---------------------------------------------------
 * 6) CARD PRESETS
 * --------------------------------------------------- */
export const CARD_PRESETS = {
    white: {
        light: {
            bg: "#FFFFFF",
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
            bg: "rgba(0,0,0,0.35)",
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
            bg: "#14202B",
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
            bg: "rgba(0,0,0,0.25)",
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
            bg: "#0F1F18",
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
            bg: "#1B1B1B",
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
            bg: "linear-gradient(145deg, rgba(30,30,30,0.6), rgba(10,10,10,0.45))",
            border: "1px solid rgba(255,255,255,0.1)",
            shadow: "0 4px 20px rgba(0,0,0,0.6)",
            radius: "20px"
        }
    },

    neoBlue: {
        light: {
            bg: "linear-gradient(135deg, #FFFFFF, #F5F9FF)",
            border: "1px solid #DCE6FF",
            shadow: "0 6px 18px rgba(0,49,229,0.06)",
            radius: "18px"
        },
        dark: {
            bg: "linear-gradient(135deg, #101B33, #0C1324)",
            border: "1px solid rgba(80,110,235,0.3)",
            shadow: "0 8px 26px rgba(0,0,0,0.6)",
            radius: "18px"
        }
    },

    bankPremiumBlack: {
        light: {
            bg: "linear-gradient(145deg, #FFFFFF, #F3F3F3)",
            border: "1px solid #C4A878",
            shadow: "0 10px 24px rgba(196,168,120,0.2)",
            radius: "20px"
        },
        dark: {
            bg: "#0C0C0C",
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
            bg: "#141A23",
            border: "2px solid #4D6A89",
            shadow: "0 3px 12px rgba(0,0,0,0.55)",
            radius: "10px"
        }
    }

};
