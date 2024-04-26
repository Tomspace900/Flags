import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useMyContext } from './Context';

const NavBar = () => {
	const { user, logout } = useMyContext();

	return (
		<div className='flex h-24 w-full justify-end items-center'>
			<div className='flex gap-2'>
				{user?.username}
				{user ? (
					<Button onClick={() => logout()}>
						<Link to={'/'}>Logout</Link>
					</Button>
				) : (
					<Button>
						<Link to={'/login'}>Login</Link>
					</Button>
				)}
			</div>
		</div>
	);
};

export default NavBar;
