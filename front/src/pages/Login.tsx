import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
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
