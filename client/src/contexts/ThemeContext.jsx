import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { themes } from '../constants/themes';
import { ThemeContext } from './themeContext';

export const ThemeProvider = ({ children }) => {
    const [currentAppTheme, setCurrentAppTheme] = useState('dark');
    const [currentChatTheme, setCurrentChatTheme] = useState('default');
    const [currentWallpaper, setCurrentWallpaper] = useState('none');

    // Load themes from localStorage on mount
    useEffect(() => {
        const savedAppTheme = localStorage.getItem('appTheme');
        const savedChatTheme = localStorage.getItem('chatTheme');
        const savedWallpaper = localStorage.getItem('wallpaper');

        if (savedAppTheme) setCurrentAppTheme(savedAppTheme);
        if (savedChatTheme) setCurrentChatTheme(savedChatTheme);
        if (savedWallpaper) setCurrentWallpaper(savedWallpaper);
    }, []);

    const setAppTheme = (theme) => {
        setCurrentAppTheme(theme);
        localStorage.setItem('appTheme', theme);
    };

    const setChatTheme = (theme) => {
        setCurrentChatTheme(theme);
        localStorage.setItem('chatTheme', theme);
    };

    const setWallpaper = (wallpaper) => {
        setCurrentWallpaper(wallpaper);
        localStorage.setItem('wallpaper', wallpaper);
    };

    const value = {
        appTheme: themes.appThemes[currentAppTheme],
        chatTheme: themes.chatThemes[currentChatTheme],
        wallpaper: themes.wallpapers[currentWallpaper],
        currentAppTheme,
        currentChatTheme,
        currentWallpaper,
        setAppTheme,
        setChatTheme,
        setWallpaper,
        themes,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
