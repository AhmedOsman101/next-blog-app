import { APP_NAME } from "./Constants";
import { IInputFields, IValidationResults } from "./Interfaces";

const validator = require("validator");

/**
 * Validates an object containing user input data.
 *
 * @param data - An object containing string fields to be validated.
 *
 * @returns An object containing validation results.
 */
export const Validator = (data: IInputFields): IValidationResults => {
	const errors = {};

	const usernameRegex = /^[A-Za-z0-9\s]{3,20}$/i;

	for (const [key, field] of Object.entries(data)) {
		// Empty fields validation
		if (field === "" || field === null || field === undefined) {
			// displaying a custom message for password confirmation errors
			if (key === "password_confirmation") {
				errors[key] = `Confirm password field is required`;
				continue;
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
	return { errors, isValid };
};

/**
 * Truncates a string to a specified limit and appends "..." if the string exceeds the limit.
 * @param string - The input string that you want to limit in terms of length.
 * @param  limit - The maximum length that the input `string` should be truncated to. If the length of the input `string` exceeds this `limit`, it will be truncated and "..." will be appended to indicate that it has been shortened.
 * @returns The truncated string or the original string if length is below limit.
 */
export const StringLimit = (string: string, limit: number): string => {
	if (string.length > limit) {
		return `${string.substring(0, limit - 3)}...`;
	}

	return string;
};

/**
 * Formats a date string into a localized, human-readable format.
 *
 * @param date - The date to be formatted. Can be a date string, timestamp, or Date object.
 * @returns A formatted date string in the format "MMM D, YYYY" (e.g., "1 Jan 2023").
 *
 * @example
 * // Returns "1 Jan 2023"
 * FormattedDate("2023-01-01T00:00:00Z");
 *
 * @example
 * // Returns the current date in the format "D MMM YYYY"
 * FormattedDate(new Date());
 */
export const FormattedDate = (date: string | number | Date): string => {
	const dateObject = new Date(date);

	// format the string
	const intl = new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	// Return the formatted string
	return intl.format(dateObject);
};

/**
 * Generates a formatted title for the application.
 * @param title - The specific page or section title.
 * @returns A formatted string combining the app name and the provided title.
 */
export const GenerateTitle = (title: string): string => {
	return `${APP_NAME} | ${title}`;
};

/**
 * Checks if an object is empty.
 *
 * This function uses Object.entries() to determine if the given object
 * has any own enumerable string-keyed properties. An object is considered
 * empty if it has no such properties.
 *
 * @param object - The object to check for emptiness.
 * @returns Returns true if the object is empty, false otherwise.
 *
 * @example
 * const emptyObj = {};
 * const nonEmptyObj = { key: 'value' };
 *
 * console.log(IsEmptyObject(emptyObj));     // true
 * console.log(IsEmptyObject(nonEmptyObj));  // false
 */
export const IsEmptyObject = (object: object): boolean => {
	return Object.entries(object).length === 0;
};
