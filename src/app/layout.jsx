import { Inter } from "next/font/google";
import "./globals.css";
import dotenv from "dotenv";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: process.env.APP_NAME,
	description: "Fullstack web application built with Next.Js 14",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="dark">
			<body className={`${inter.className} bg-gray-950 text-gray-100`}>
				<Navbar />
				<hr />
				<main className="flex min-h-dvh flex-col items-center px-20">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
