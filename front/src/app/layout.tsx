import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthProvider';
import { ContextProvider } from '@/contexts/ContextProvider';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import Main from './main';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider defaultTheme='light'>
					<AuthProvider>
						<ContextProvider>
							<Main>{children}</Main>
						</ContextProvider>
					</AuthProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}