import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { History, LogOut, User } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { Link } from 'react-router-dom';

const ProfilePopover = () => {
	const { user, scores, logout } = useAuth();

	return (
		user && (
			<Popover>
				<Button asChild variant={'secondary'}>
					<PopoverTrigger>
						{user.firstname || user.username}
						<User className='ml-2 h-4 w-4' />
					</PopoverTrigger>
				</Button>
				<PopoverContent className='flex flex-col gap-4 mx-4 w-fit min-w-[220px]'>
					<div className='flex flex-col gap-2 px-2'>
						<span className='text-lg'>{`@${user.username}`}</span>
						{user.firstname && <span className='text-lg'>{user.firstname}</span>}
						{user.lastname && <span className='text-lg'>{user.lastname.toUpperCase()}</span>}
						{scores && scores.length > 0 && (
							<div className='flex justify-between text-lg'>
								<span>{`Games played:`}</span>
								<span>{scores.length}</span>
							</div>
						)}
					</div>
					<div className='flex flex-col gap-2'>
						<Button asChild disabled={scores && scores.length > 0}>
							{/** // TODO */}
							<Link to={'/history'}>
								History
								<History className='ml-2 h-4 w-4' />
							</Link>
						</Button>

						<Button asChild variant={'destructive'} onClick={() => logout()}>
							<Link to={'/'}>
								Logout
								<LogOut className='ml-2 h-4 w-4' />
							</Link>
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		)
	);
};

export default ProfilePopover;
