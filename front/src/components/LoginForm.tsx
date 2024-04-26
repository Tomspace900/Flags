import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { loginFormSchema, LoginFormSchema } from '@/utils/formSchema';
import { APILogin } from '@/utils/apiCalls';

const handleLogin = async (data: LoginFormSchema) => {
	const user = await APILogin(data);

	if (user) window.location.reload(); // ! solution temporaire
};

const LoginForm = () => {
	const form = useForm<LoginFormSchema>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	function onSubmit(values: LoginFormSchema) {
		handleLogin(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center gap-4 w-[300px]'>
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
		</Form>
	);
};

export default LoginForm;
