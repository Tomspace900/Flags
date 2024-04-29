import { LoaderIcon } from 'lucide-react';

const Loader = () => {
	return (
		<div className='flex flex-col gap-10 justify-center items-center h-full w-full'>
			<LoaderIcon className='h-24 w-24 animate-spin' />
			<span className='text-4xl mb-4'>Loading...</span>
		</div>
	);
};

export default Loader;
