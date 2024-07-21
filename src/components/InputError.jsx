const InputError = ({ message }) => {
	return (
		<>
			{message && (
				<p className="text-sm text-red-600 dark:text-red-400 my-1">
					{message}
				</p>
			)}
		</>
	);
};

export default InputError;
