import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { LogOut, User } from 'lucide-react';
import { useMyContext } from './Context';
import { Link } from 'react-router-dom';

const ProfilePopover = () => {
	const { user, logout } = useMyContext();

	return (
		user && (
			<Popover>
				<PopoverTrigger>
					<Button variant={'secondary'}>
						{user.firstname || user.username}
						<User className='ml-2 h-4 w-4' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='flex flex-col gap-4 mx-4 w-fit min-w-[220px]'>
					<div className='flex flex-col gap-2'>
						<h4 className='text-lg w-full'>{`@${user.username}`}</h4>
						{user.firstname && <h4 className='text-lg w-full'>Firstname: {user.firstname}</h4>}
						{user.lastname && <h4 className='text-lg w-full'>Lastname: {user.lastname}</h4>}
					</div>
					<Button asChild variant={'destructive'} onClick={() => logout()}>
						<Link to={'/'}>
							Logout
							<LogOut className='ml-2 h-4 w-4' />
						</Link>
					</Button>
				</PopoverContent>
			</Popover>
		)
	);
};

export default ProfilePopover;
