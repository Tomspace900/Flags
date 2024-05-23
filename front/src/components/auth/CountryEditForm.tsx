import _ from 'lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { CountryEditFormSchema, countryEditFormSchema } from '@/utils/formSchema';
import { Textarea } from '../ui/textarea';
import { Country } from '@/utils/types';
import Loader from '../Loader';
import { useToast } from '../ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { APIUpdateCountry } from '@/utils/apiCalls';
import { useRouter } from 'next/navigation';

type CountryEditFormProps = {
	country: Country;
	continents: string[];
	updateCountryById: (id: number, data: Country) => void;
};

const CountryEditForm = ({ country, continents, updateCountryById }: CountryEditFormProps) => {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<CountryEditFormSchema>({
		resolver: zodResolver(countryEditFormSchema),
		defaultValues: {
			continent: country.continent ?? undefined,
			about: country.about ?? undefined,
			memo: country.memo ?? undefined,
		},
	});

	const handleSaveData = async (data: Country) => {
		const countryData = await APIUpdateCountry(data);
		console.log('countryData: ', countryData);
		if (countryData) {
			toast({
				variant: 'success',
				title: 'Update success',
				description: `${country.name} updated !`,
			});
			updateCountryById(countryData.id, countryData);
			router.push('/admin/edit');
		} else {
			toast({
				variant: 'destructive',
				title: 'Update failed',
				description: 'Something went wrong, please try again.',
			});
		}
	};

	function onSubmit(values: CountryEditFormSchema) {
		const newCountry: Country = {
			...country,
			continent: values.continent ?? country.continent,
			about: values.about ?? country.about,
			memo: values.memo ?? country.memo,
		};
		console.log('country: ', country);
		console.log('newCountry: ', newCountry);
		if (!_.isEqual(country, newCountry)) {
			handleSaveData(newCountry);
		} else {
			toast({
				variant: 'default',
				title: 'No changes',
				description: 'No changes detected.',
			});
			router.push('/admin/edit');
		}
	}

	return country ? (
		<Form {...form}>
			<div className='flex flex-col justify-between gap-8'>
				<form onSubmit={form.handleSubmit(onSubmit)} className='h-full flex flex-col justify-center gap-4 w-[450px]'>
					<FormField
						control={form.control}
						name='continent'
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormDescription>Continent</FormDescription>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={country.continent ?? field.value}>
										<SelectTrigger>
											<SelectValue placeholder='Select a continent' />
										</SelectTrigger>
										<SelectContent>
											{continents.map((continent) => (
												<SelectItem key={continent} value={continent}>
													{continent}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='about'
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormDescription>About</FormDescription>
								<FormControl>
									<Textarea rows={7} {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='memo'
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormDescription>Memo</FormDescription>
								<FormControl>
									<Textarea rows={5} {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type='submit'>Save</Button>
				</form>
			</div>
		</Form>
	) : (
		<Loader />
	);
};

export default CountryEditForm;
