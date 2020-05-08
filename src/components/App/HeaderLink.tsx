import React, {MouseEventHandler} from 'react';
import Link from 'next/link';
import useTranslation from '@hooks/useTranslation';

const Header: React.FC<{
	onClick: MouseEventHandler;
	target: string;
	name: string;
}> = ({onClick, target, name}) => {
	const {locale} = useTranslation();
	return (
		<Link href={`/[lang]${target}`} as={`/${locale}${target}`} prefetch={false}>
			<a className="sm:mt-0 mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-green-900" onClick={onClick}>
				{name}
			</a>
		</Link>
	);
};

export default Header;
