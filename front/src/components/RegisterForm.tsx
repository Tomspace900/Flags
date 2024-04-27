import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { registerFormSchema, RegisterFormSchema } from '@/utils/formSchema';
import { APIRegister } from '@/utils/apiCalls';

const handleRegister = async (data: RegisterFormSchema) => {
	const user = await APIRegister(data);

	if (user) window.location.reload(); // ! solution temporaire
};

const RegisterForm = () => {
	const form = useForm<RegisterFormSchema>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			firstname: '',
			lastname: '',
			username: '',
			password: '',
		},
	});

	function onSubmit(values: RegisterFormSchema) {
		handleRegister(values);
	}

	return (
		<Form {...form}>
			<div className='flex flex-col justify-between gap-8'>
				<h1 className='text-4xl'>Register</h1>
				<form onSubmit={form.handleSubmit(onSubmit)} className='h-full flex flex-col justify-center gap-4 w-[300px]'>
					<FormField
						control={form.control}
						name='firstname'
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormControl>
									<Input type='firstname' placeholder='Firstname' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastname'
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormControl>
									<Input type='lastname' placeholder='Lastname' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormControl>
									<Input type='username' placeholder='Username*' {...field} />
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
									<Input type='password' placeholder='Password*' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type='submit'>Register</Button>
				</form>
			</div>
		</Form>
	);
};

export default RegisterForm;
