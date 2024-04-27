import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useMyContext } from './Context';
import ProfilePopover from './ProfilePopover';

const NavBar = () => {
	const { user } = useMyContext();
	const location = useLocation();

	// Hide the NavBar on login page
	if (location.pathname === '/login') {
		return null;
	}

	return (
		<div className='flex h-24 w-full justify-end items-center px-4'>
			<div className='flex gap-2'>
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
