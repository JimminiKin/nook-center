import React from 'react';
import Header from './Header';
import CurrentInhabitantsProvider from '@contexts/CurrentInhabitantsContext';
import PastInhabitantsProdiver from '@contexts/PastInhabitantsContext';
import PastCampersProvider from '@contexts/PastCampersContext';

const Layout: React.FC = ({children}) => {
	return (
		<>
			<Header />
			<main>
				<PastCampersProvider>
					<PastInhabitantsProdiver>
						<CurrentInhabitantsProvider>{children}</CurrentInhabitantsProvider>
					</PastInhabitantsProdiver>
				</PastCampersProvider>
			</main>
		</>
	);
};

export default Layout;
