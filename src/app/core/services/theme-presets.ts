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
