import Link from 'next/link';

export const getStaticProps = () => {
	return {
		props: {},
	};
};
const Index = () => {
	return (
		<div className="p-10">
			<h1 className="text-green-900 font-bold text-5xl text-center">Welcome to Nook Center</h1>
			<p className="p-4 mt-4 text-xl">
				This website can currently be used to help you through villager hunting in Animal Crossing : New Horizons
			</p>
			<p className="p-4 text-xl">
				Details on the methods can be found in the{' '}
				<Link href="/hunting">
					<a className="font-bold">hunting</a>
				</Link>{' '}
				page
			</p>
			<p className="p-4 text-xl">Checklist of potential future features : </p>
			<ul className="p-4 py-2 mx-8 -my-2 text-xl list-disc">
				<li>Localization</li>
				<li>Flower breeding helper (based on the datamined genetics method)</li>
			</ul>
		</div>
	);
};

export default Index;
