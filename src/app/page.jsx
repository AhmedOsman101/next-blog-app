import Image from "next/image";
import Link from "next/link";

const Home = () => {
	return (
		<>
			<div className="flex justify-between w-full gap-24 items-stretch mt-2 mb-6 md:mb-8">
				<div className="flex-1 flex flex-col gap-12">
					<h1 className="text-[65px]">Creative Thoughts Agency.</h1>
					<p className="text-xl">
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Vero blanditiis adipisci minima reiciendis a autem
						assumenda dolore.
					</p>
					<div className="flex gap-5">
						<Link
							href="about"
							className="text-center px-5 py-4 min-w-[7.5rem] bg-blue-500 rounded-md">
							Learn More
						</Link>
						<Link
							href="contact"
							className="text-center rounded-md px-5 py-4 min-w-[7.5rem] bg-gray-200 text-gray-950">
							Contact
						</Link>
					</div>
					<div className="w-[31.25rem] h-12 relative grayscale-[1]">
						<Image
							src="/imgs/brands.png"
							alt="brands"
							fill
							className=""
						/>
					</div>
				</div>
				{/* hero image */}
				<div className="flex-1 relative w-1 aspect-square">
					<Image src="/imgs/hero.svg" alt="hero" fill />
				</div>
			</div>
		</>
	);
};

export default Home;
