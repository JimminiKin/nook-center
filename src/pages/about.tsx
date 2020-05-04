import {NextPage} from 'next';

export const getStaticProps = () => {
	return {
		props: {},
	};
};
const About: NextPage = (props) => {
	return <p>plop</p>;
};

export default About;
