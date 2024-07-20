import { Inter } from "next/font/google";
import "./globals.css";
import dotenv from "dotenv";

dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: process.env.APP_NAME,
	description: "Fullstack web application built with Next.Js 14",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="dark">
			<body className={`${inter.className} bg-gray-800 text-gray-100`}>
				{children}
			</body>
		</html>
	);
}
