const validator = require("validator");

/**
 * @typedef {Object} InputFields
 * @property {string} [username] - The username to validate.
 * @property {string} [name] - The name to validate.
 * @property {string} [email] - The email address to validate.
 * @property {string} [password] - The password to validate.
 * @property {string} [password_confirmation] - The password confirmation to validate.
 * @property {string} [message] - The message the user would enter in the contact form.
 */

/**
 * @typedef {Object} ValidationResult
 * @property {InputFields} errors - An object with field names as keys and error messages as values.
 * @property {boolean} isValid - Indicates whether the input data is valid (true) or not (false).
 */

/**
 * Validates an object containing user input data.
 *
 * @param {InputFields} data - An object containing string fields to be validated.
 *
 * @returns {ValidationResult} An object containing validation results.
 */

const validation = (data) => {
	const errors = {};
	let result = {};

	const usernameRegex = /^[A-Za-z0-9\s]{3,20}$/i;

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
			if (!validator.isEmail(field))
				errors[key] = "Invalid email address";
		}

		// Password validation
		else if (key === "password") {
			// FOR DEBUGGING REMOVE ON PRODUCTION!!!
			if (field === "123") continue;

			// length validation
			if (field.length < 8 || field.length > 20) {
				errors[key] =
					"Password must be between 8 and 20 characters long";
			}
			// regex validation
			else if (!validator.isStrongPassword(field)) {
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

		// Message validation
		else if (key === "message") {
			if (field.length < 3)
				errors[key] = "Message must be at least 3 characters";
		}
	}

	const isValid = Object.keys(errors).length === 0;
	result = { errors, isValid };
	return result;
};

module.exports = { validator: validation };
