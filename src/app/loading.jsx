const Loading = () => {
	return (
		<>
			<div className="w-full h-full z-50 overflow-hidden flex flex-col items-center justify-center gap-3">
				<div className="loader ease-linear rounded-full border-[6px] border-t-[6px] border-gray-200 h-16 w-16 mb-4" />
				<h2 className="text-center text-white text-3xl font-semibold">
					Loading...
				</h2>
				<p className="w-1/3 text-center text-gray-600 text-sm">
					This may take a few seconds, please don&apos;t close this
					page.
				</p>
			</div>
		</>
	);
};

export default Loading;
