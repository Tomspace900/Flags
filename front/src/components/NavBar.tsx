import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from './AuthProvider';
import ProfilePopover from './ProfilePopover';
import ThemeSwitcher from './ThemeSwitcher';

const NavBar = () => {
	const { user } = useAuth();
	const location = useLocation();

	// Hide the NavBar on login page
	if (location.pathname === '/login') {
		return null;
	}

	return (
		<div className='flex h-24 w-full justify-end items-center px-4'>
			<div className='flex items-center gap-4'>
				<ThemeSwitcher />
				{user ? (
					<ProfilePopover />
				) : (
					<Button asChild>
						<Link to={'/login'}>Login</Link>
					</Button>
				)}
			</div>
		</div>
	);
};

export default NavBar;
