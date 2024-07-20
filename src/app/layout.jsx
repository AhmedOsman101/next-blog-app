import { DM_Sans } from "next/font/google";
import "./globals.css";
import dotenv from "dotenv";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

dotenv.config();

const font = DM_Sans({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
	preload: true,
});

export const metadata = {
	title: process.env.APP_NAME,
	description: "Fullstack web application built with Next.Js 14",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="dark">
			<body
				className={`${font.className} bg-gray-950 text-gray-100 grid grid-rows-[auto_1fr_auto] min-h-dvh`}>
				<Navbar />
				<main className="flex flex-col items-center px-20">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
