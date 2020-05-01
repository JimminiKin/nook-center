import React, { MouseEventHandler } from "react";
import Link from "next/link";
import { FaBars, FaHamburger } from "react-icons/fa";

const Header: React.FC<{
  onClick: MouseEventHandler;
  target: string;
  name: string;
}> = ({ onClick, target, name }) => {
  return (
    <Link href={target}>
      <a
        className="sm:mt-0 mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-green-900"
        onClick={onClick}
      >
        {name}
      </a>
    </Link>
  );
};

export default Header;
