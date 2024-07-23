import { GenerateTitle } from "@/lib/Helpers";
import Image from "next/image";

export const metadata = {
	title: GenerateTitle("About"),
	description: "Learn more about our agency and what we do",
};

const About = () => {
	return (
		<>
			<div className="flex gap-24 mb-12">
				<div className="flex flex-1 flex-col gap-12">
					<h2 className="text-3xl text-blue-500 font-bold mt-12">
						About Agency
					</h2>
					<h1 className="text-[3.4rem]">
						We create digital ideas that are bigger, bolder, braver
						and better.
					</h1>
					<p className="text-xl font-light">
						We create digital ideas that are bigger, bolder, braver
						and better. We believe in good ideas flexibility and
						precision We’re world’s Our Special Team best consulting
						& finance solution provider. Wide range of web and
						software development services.
					</p>
					<div className="flex items-center justify-between">
						<div className="flex flex-col gap-1">
							<h1 className="text-3xl text-blue-800 font-bold">
								10K+
							</h1>
							<p>Years of experience</p>
						</div>
						<div className="flex flex-col gap-1">
							<h1 className="text-3xl text-blue-800 font-bold">
								20K+
							</h1>
							<p>Happy customers</p>
						</div>
						<div className="flex flex-col gap-1">
							<h1 className="text-3xl text-blue-800 font-bold">
								15K+
							</h1>
							<p>Blogs written</p>
						</div>
					</div>
				</div>
				<div className="flex-1 relative">
					<Image
						src="/imgs/about.png"
						alt="about image"
						fill
						className="object-scale-down"
					/>
				</div>
			</div>
		</>
	);
};

export default About;
