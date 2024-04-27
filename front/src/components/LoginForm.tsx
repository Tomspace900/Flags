import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { loginFormSchema, LoginFormSchema } from '@/utils/formSchema';
import { APILogin } from '@/utils/apiCalls';
import { useMyContext } from './Context';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const { setUser } = useMyContext();
	const navigate = useNavigate();

	const form = useForm<LoginFormSchema>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const handleLogin = async (data: LoginFormSchema) => {
		const user = await APILogin(data);
		setUser(user);
		navigate('/');
	};

	function onSubmit(values: LoginFormSchema) {
		handleLogin(values);
	}

	return (
		<Form {...form}>
			<div className='flex flex-col justify-between gap-8'>
				<h1 className='text-4xl'>Sign in</h1>
				<form onSubmit={form.handleSubmit(onSubmit)} className='h-full flex flex-col justify-center gap-4 w-[300px]'>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormControl>
									<Input type='username' placeholder='Username' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormControl>
									<Input type='password' placeholder='Password' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type='submit'>Login</Button>
				</form>
			</div>
		</Form>
	);
};

export default LoginForm;
