"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavLink = ({ link }) => {
	const [active, setActive] = useState(false);
	const pathName = usePathname();

	useEffect(() => {
		setActive(pathName.startsWith(link.to));
	}, [pathName, link]);

	return (
		<>
			<li className="flex">
				<Link
					rel="noopener noreferrer"
					href={link.to}
					className={`flex items-center px-4 -mb-1 border-b-2 ${
						active
							? "text-blue-400 border-blue-400 font-semibold"
							: "border-transparent"
					}`}>
					{link.label}
				</Link>
			</li>
		</>
	);
};

export default NavLink;
