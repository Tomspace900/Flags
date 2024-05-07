import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '@/contexts/AuthProvider';

const Login = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	if (user) {
		navigate('/');
		return null;
	}

	return (
		<div className='flex h-full items-center'>
			<div className='flex gap-16'>
				<RegisterForm />
				<div className='w-[1px] h-auto bg-input'></div>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
