import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthProvider';
import Link from 'next/link';
import { Button } from './ui/button';
import ProfilePopover from './ProfilePopover';
import ThemeSwitcher from './ThemeSwitcher';

const NavBar = () => {
	const { user } = useAuth();
	const pathname = usePathname();

	// Hide the NavBar on login page
	if (pathname === '/login') {
		return null;
	}

	return (
		<div className='flex h-24 w-full justify-between items-center px-4'>
			<div className='flex items-center gap-4'>
				<Link href={'/'}>
					<h1 className='text-2xl'>Flags</h1>
				</Link>
			</div>
			<div className='flex items-center gap-4'>
				<ThemeSwitcher />
				{user ? (
					<ProfilePopover />
				) : (
					<Button asChild>
						<Link href={'/login'}>Login</Link>
					</Button>
				)}
			</div>
		</div>
	);
};

export default NavBar;
