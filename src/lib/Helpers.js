/**
 * @typedef {Object} InputData
 * @property {string} [username] - The username to validate.
 * @property {string} [name] - The name to validate.
 * @property {string} [email] - The email address to validate.
 * @property {string} [password] - The password to validate.
 * @property {string} [password_confirmation] - The password confirmation to validate.
 */

/**
 * Validates an object containing user input data.
 *
 * @param {InputData} data - An object containing string fields to be validated.
 *
 * @returns {Object} An object containing validation results.
 * @returns {Object.<string, string>} errors - An object with field names as keys and error messages as values.
 * @returns {boolean} isValid - Indicates whether the input data is valid (true) or not (false).
 */

export const validator = (data) => {
	const errors = {};

	const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;

	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,12}$/;

	const usernameRegex = /^[A-Za-z0-9]{3,20}$/i;

	for (const [key, field] of Object.entries(data)) {
		// Empty fields validation
		if (field === "" || field === null || field === undefined) {
			// displaying a custom message for password confirmation errors
			if (key === "password_confirmation") {
				errors[key] = `Confirm password field is required`;
			}

			// default message for other empty fields
			else errors[key] = `${key} field is required`;
			continue;
		}

		// Username/name validation
		if (key === "username" || key === "name") {
			// length validation
			if (field.length < 3 || field.length > 20) {
				errors[key] = `${key} must be between 3 and 20 characters long`;
			}
			// regex validation
			else if (!usernameRegex.test(field)) {
				errors[key] = `${key} can only contain letters and numbers`;
			}
		}

		// Email validation
		else if (key === "email") {
			// regex validation
			if (!emailRegex.test(field)) errors[key] = "Invalid email address";
		}

		// Password validation
		else if (key === "password") {
			// length validation
			if (field.length < 8 || field.length > 12) {
				errors[key] =
					"Password must be between 8 and 12 characters long";
			}
			// regex validation
			else if (!passwordRegex.test(field)) {
				errors[key] =
					"Password must include an uppercase letter, lowercase letter, number, and a special character { $@$!%*?& }.";
			}
		}

		// Confirm password validation
		else if (key === "password_confirmation") {
			// matching passwords validation
			if (field !== data?.password)
				errors[key] = "Passwords do not match";
		}
	}

	const isValid = Object.keys(errors).length === 0;
	return { errors, isValid };
};
