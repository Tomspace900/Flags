'use client';

import { useTheme } from '../contexts/ThemeProvider';
import { Switch } from './ui/switch';
import { useState } from 'react';
import { Theme } from '@/utils/types';

const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme();
	const [selectedTheme, setSelectedTheme] = useState<Theme>(theme);

	const handleThemeChange = () => {
		setSelectedTheme(selectedTheme === 'dark' ? 'light' : 'dark');
		setTheme(selectedTheme === 'dark' ? 'light' : 'dark');
	};

	return (
		<Switch
			isThemeSwitcher
			checked={selectedTheme === 'dark'}
			onCheckedChange={handleThemeChange}
			defaultChecked={theme === 'dark'}
		/>
	);
};

export default ThemeSwitcher;
