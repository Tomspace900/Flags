'use server';

import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	console.log('AdminLayout');
	return <div className='h-full flex flex-col mt-24 w-[450px] gap-8'>{children}</div>;
};

export default AdminLayout;
