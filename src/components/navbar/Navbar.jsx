import Link from "next/link";
import NavLink from "./NavLink";
import LogoutButton from "./Logout";
import { APP_NAME } from "@/lib/Constants";
import { Auth } from "@/lib/Auth";

/**
 * @typedef {Object} NavLink
 * @property {string} label - The text to display for the link
 * @property {string} to - The URL path for the link
 * @property {boolean} active - The link is active or not
 */

/**
 * @type {NavLink[]}
 */
const links = [
	{
		label: "Blog",
		to: "/blog",
	},
	{
		label: "About",
		to: "/about",
	},
	{
		label: "Contact",
		to: "/contact",
	},
];

const Navbar = () => {
	const isAuth = Auth.check();
	const isAdmin = Auth.authUser?.isAdmin;
	return (
		<>
			<header className="p-4 sticky top-0 bg-gray-950 z-[999]">
				<div className="container flex justify-between h-16 mx-auto">
					<Link
						rel="noopener noreferrer"
						href="/"
						aria-label="Back to homepage"
						className="flex items-center p-2 font-bold text-2xl">
						{APP_NAME}
					</Link>
					<div className="items-stretch hidden space-x-3 md:flex">
						{links.map((link) => {
							return (
								<NavLink
									link={link}
									key={link.label}
								/>
							);
						})}

						{isAuth ? (
							<>
								{isAdmin && (
									<NavLink
										link={{ label: "Admin", to: "/admin" }}
									/>
								)}

								<LogoutButton />
							</>
						) : (
							<div className="self-center">
								<Link
									href="/login"
									className="rounded-lg px-5 py-3 bg-blue-500">
									Login
								</Link>
							</div>
						)}
					</div>
					<button className="flex justify-end p-4 md:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</header>
			<hr className="sticky top-[102px] header-hr" />
		</>
	);
};

export default Navbar;
