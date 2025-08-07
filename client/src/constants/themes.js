export const themes = {
    appThemes: {
        dark: {
            name: 'Dark',
            sidebar: 'bg-black',
            sidebarHover: 'hover:bg-gray-900',
            text: 'text-white',
            textSecondary: 'text-gray-400',
            border: 'border-gray-900',
            input: 'bg-gray-950',
            button: 'btn-primary',
        },
        light: {
            name: 'Light',
            sidebar: 'bg-white',
            sidebarHover: 'hover:bg-gray-100',
            text: 'text-black',
            textSecondary: 'text-gray-600',
            border: 'border-gray-300',
            input: 'bg-gray-100',
            button: 'btn-primary',
        },
        blue: {
            name: 'Blue',
            sidebar: 'bg-blue-900',
            sidebarHover: 'hover:bg-blue-800',
            text: 'text-white',
            textSecondary: 'text-blue-200',
            border: 'border-blue-600',
            input: 'bg-blue-800',
            button: 'btn-primary',
        },
        green: {
            name: 'Green',
            sidebar: 'bg-green-800',
            sidebarHover: 'hover:bg-green-700',
            text: 'text-white',
            textSecondary: 'text-green-200',
            border: 'border-green-600',
            input: 'bg-green-700',
            button: 'btn-success',
        },
        purple: {
            name: 'Purple',
            sidebar: 'bg-purple-800',
            sidebarHover: 'hover:bg-purple-700',
            text: 'text-white',
            textSecondary: 'text-purple-200',
            border: 'border-purple-600',
            input: 'bg-purple-700',
            button: 'btn-secondary',
        },
    },

    chatThemes: {
        default: {
            name: 'Default',
            background: 'bg-black',
            sentBubble: 'bg-blue-600',
            receivedBubble: 'bg-gray-900',
            text: 'text-white',
        },
        dark: {
            name: 'Dark Gray',
            background: 'bg-gray-900',
            sentBubble: 'bg-green-600',
            receivedBubble: 'bg-gray-700',
            text: 'text-white',
        },
        light: {
            name: 'Light',
            background: 'bg-gray-100',
            sentBubble: 'bg-blue-500',
            receivedBubble: 'bg-white',
            text: 'text-black',
        },
        forestGreen: {
            name: 'Forest Green',
            background: 'bg-[#075E54]',
            sentBubble: 'bg-[#DCF8C6]',
            receivedBubble: 'bg-[#262D31]',
            text: 'text-black',
        },
        oceanBlue: {
            name: 'Ocean Blue',
            background: 'bg-gradient-to-br from-blue-900 to-cyan-900',
            sentBubble: 'bg-blue-500',
            receivedBubble: 'bg-blue-700',
            text: 'text-white',
        },
        warmSunset: {
            name: 'Warm Sunset',
            background: 'bg-gradient-to-br from-orange-900 to-red-900',
            sentBubble: 'bg-amber-500',
            receivedBubble: 'bg-red-700',
            text: 'text-white',
        },
    },

    wallpapers: {
        none: {
            name: 'None',
            background: '',
        },
        subtle: {
            name: 'Subtle Pattern',
            background: 'bg-gradient-to-br from-gray-900 via-black to-gray-800',
        },
        nebula: {
            name: 'Cosmic Nebula',
            background: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
        },
        oceanBlue: {
            name: 'Ocean Blue',
            background: 'bg-gradient-to-br from-blue-900 to-cyan-900',
        },
        warmSunset: {
            name: 'Warm Sunset',
            background: 'bg-gradient-to-br from-orange-900 to-red-900',
        },
        forestGreen: {
            name: 'Forest Green',
            background: 'bg-gradient-to-br from-green-900 to-teal-900',
        },
        cityLights: {
            name: 'City Lights',
            background: 'bg-gradient-to-br from-gray-800 to-gray-900',
        },
        abstract: {
            name: 'Abstract Waves',
            background: 'bg-gradient-to-br from-purple-900 to-blue-900',
        },
        floral: {
            name: 'Floral Fantasy',
            background: 'bg-gradient-to-br from-pink-900 to-yellow-900',
        },
        geometric: {
            name: 'Geometric Shapes',
            background: 'bg-gradient-to-br from-teal-900 to-green-900',
        },
        vintage: {
            name: 'Vintage Vibes',
            background: 'bg-gradient-to-br from-brown-900 to-yellow-900',
        },
        galaxy: {
            name: 'Galaxy Swirl',
            background: 'bg-gradient-to-br from-indigo-900 to-purple-900',
        },
        pastel: {
            name: 'Pastel Dreams',
            background: 'bg-gradient-to-br from-pink-200 to-yellow-200',
        },
        darkMode: {
            name: 'Dark Mode',
            background: 'bg-gradient-to-br from-gray-800 to-gray-900',
        },
        lightMode: {
            name: 'Light Mode',
            background: 'bg-gradient-to-br from-white to-gray-100',
        },
        neon: {
            name: 'Neon Glow',
            background: 'bg-gradient-to-br from-purple-900 to-blue-900',
        },
        metallic: {
            name: 'Metallic Shine',
            background: 'bg-gradient-to-br from-gray-700 to-gray-800',
        },
        wood: {
            name: 'Wood Grain',
            background: 'bg-gradient-to-br from-amber-800 to-amber-900',
        },
        marble: {
            name: 'Marble Elegance',
            background: 'bg-gradient-to-br from-gray-200 to-gray-300',
        },
        cosmic: {
            name: 'Cosmic Journey',
            background: 'bg-gradient-to-br from-indigo-900 to-blue-900',
        },
        rainbow: {
            name: 'Rainbow Spectrum',
            background: 'bg-gradient-to-br from-red-500 to-yellow-500 via-green-500 to-blue-500',
        },
        autumn: {
            name: 'Autumn Leaves',
            background: 'bg-gradient-to-br from-orange-700 to-yellow-700',
        },
        winter: {
            name: 'Winter Wonderland',
            background: 'bg-gradient-to-br from-blue-200 to-white',
        },
        spring: {
            name: 'Spring Blossom',
            background: 'bg-gradient-to-br from-pink-200 to-green-200',
        },
        summer: {
            name: 'Summer Vibes',
            background: 'bg-gradient-to-br from-yellow-300 to-orange-300',
        },
        twilight: {
            name: 'Twilight Glow',
            background: 'bg-gradient-to-br from-purple-800 to-blue-800',
        },
        dusk: {
            name: 'Dusk Serenity',
            background: 'bg-gradient-to-br from-gray-600 to-gray-700',
        },
        dawn: {
            name: 'Dawn Awakening',
            background: 'bg-gradient-to-br from-yellow-200 to-orange-200',
        },
        starryNight: {
            name: 'Starry Night',
            background: 'bg-gradient-to-br from-indigo-800 to-blue-800',
        },
        crystal: {
            name: 'Crystal Clear',
            background: 'bg-gradient-to-br from-white to-gray-100',
        },
        gradient: {
            name: 'Gradient Bliss',
            background: 'bg-gradient-to-br from-purple-500 to-pink-500',
        },
        abstractArt: {
            name: 'Abstract Art',
            background: 'bg-gradient-to-br from-blue-500 to-purple-500',
        },
        watercolor: {
            name: 'Watercolor Wash',
            background: 'bg-gradient-to-br from-pink-300 to-yellow-300',
        },
        pixelArt: {
            name: 'Pixel Art',
            background: 'bg-gradient-to-br from-gray-800 to-gray-900',
        },
        glitch: {
            name: 'Glitch Effect',
            background: 'bg-gradient-to-br from-purple-700 to-blue-700',
        },
        holographic: {
            name: 'Holographic Shine',
            background: 'bg-gradient-to-br from-blue-600 to-purple-600',
        },
        cosmicDust: {
            name: 'Cosmic Dust',
            background: 'bg-gradient-to-br from-gray-800 to-gray-900',
        },
        pixelated: {
            name: 'Pixelated Pattern',
            background: 'bg-gradient-to-br from-gray-700 to-gray-800',
        },
        stripes: {
            name: 'Striped Pattern',
            background: 'bg-gradient-to-br from-gray-900 to-gray-800',
        },
    },
};
