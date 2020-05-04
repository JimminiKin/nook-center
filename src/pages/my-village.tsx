import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {NextPage} from 'next';

import {withApollo} from '@apollo/client';

const MyVillagers = dynamic(() => import('@components/Villager/MyVillagers'), {ssr: false});

const MyVillageStatus: NextPage = (props) => {
	return (
		<>
			<Head>
				<title>My Village - Nook Center</title>
			</Head>
			<MyVillagers />
		</>
	);
};

export default withApollo(MyVillageStatus, {ssr: false});
