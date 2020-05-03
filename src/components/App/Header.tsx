import React from 'react';
import Link from 'next/link';
import HeaderLink from './HeaderLink';
import {FaBars, FaHamburger} from 'react-icons/fa';

const Header: React.FC = () => {
	const [isMenuOpen, setOpenMenu] = React.useState<boolean>(false);

	const closeMenu = () => {
		setOpenMenu(false);
	};

	return (
		<header className="bg-green-700 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
			<div className="flex justify-between items-center px-4 py-3 sm:p-0">
				<div>
					<Link href="/">
						<a onClick={closeMenu}>
							<img className="h-10" src="/icons/favicon-96x96.png" alt="Logo" />
						</a>
					</Link>
				</div>
				<div>
					<button
						type="button"
						className="block text-gray-300 hover:text-white focus:text-white sm:hidden"
						onClick={() => {
							setOpenMenu(!isMenuOpen);
						}}
					>
						{isMenuOpen ? <FaHamburger /> : <FaBars />}
					</button>
				</div>
			</div>
			<nav className={`px-2 pt-2 pb-4 sm:flex sm:p-0 ${isMenuOpen ? 'block' : 'hidden'}`}>
				<HeaderLink target="/villagers" name="Villagers" onClick={closeMenu} />
				<HeaderLink target="/island" name="Islands" onClick={closeMenu} />
			</nav>
		</header>
	);
};

export default Header;
