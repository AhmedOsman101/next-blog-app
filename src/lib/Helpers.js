export const validator = (fields) => {
	const errors = {};
	let emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
	let passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,12}$/;
	for (const key in fields) {
		const field = fields[key];
		if (field === "" || field === null || field === undefined) {
			if (key === "password_confirmation")
				errors[key] = `Confirm password field is required`;
			else errors[key] = `${key} field is required`;
		}

		if (key === "username" || key === "name") {
			if (field.length < 3 || field.length > 20) {
				errors[key] = `${key} must be between 3 and 20 characters long`;
			}
		} else if (key === "email") {
			if (!emailRegex.test(field)) errors[key] = "Invalid email address";
		} else if (key === "password") {
			if (field.length < 8 || field.length > 12) {
				errors[key] =
					"Password must be between 8 and 12 characters long";
			} else {
				if (!passwordRegex.test(field)) {
					errors[key] =
						"Password must include an uppercase letter, lowercase letter, number, and a special character { $@$!%*?& }.";
				}
			}
		} else if (key === "password_confirmation") {
			if (field !== fields?.password) {
				errors[key] = "Passwords do not match";
			}
		}
	}
	return errors;
};
