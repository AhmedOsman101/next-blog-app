/**
 * Defines the shape of input fields that need to be validated.
 *
 * @interface IInputFields
 * @property {string} [username] - The username field.
 * @property {string} [name] - The name field.
 * @property {string} [email] - The email field.
 * @property {string} [password] - The password field.
 * @property {string} [password_confirmation] - The password confirmation field.
 * @property {string} [message] - The message field.
 */
export interface IInputFields {
	username?: string;
	name?: string;
	email?: string;
	password?: string;
	password_confirmation?: string;
	message?: string;
}

/**
 * Defines the shape of the validation result.
 *
 * @interface IValidationResult
 * @property {IInputFields} errors - An object containing validation errors for each field.
 * @property {boolean} isValid - A flag indicating whether the validation was successful.
 */

export interface IValidationResults {
	errors: IInputFields;
	isValid: boolean;
}

export interface IAuthError {
	message: string;
	code: string;
}

/**
 * Represents a user in the application.
 * @interface IUser
 * @property {string} id - Unique identifier for the user.
 * @property {string} name - Name of the user.
 * @property {string} email - Email address of the user.
 * @property {string} password - Hashed password of the user.
 * @property {string} [image] - Optional URL to the user's profile image.
 * @property {boolean} [isAdmin] - Indicates whether the user has admin privileges.
 * @property {IPost[]} [posts] - Array of posts associated with the user.
 */
export interface IUser {
	id?: string;
	name: string;
	email: string;
	password: string;
	image?: string;
	isAdmin?: boolean;
	posts?: IPost[] | [];
}

/**
 * Represents a blog post in the application.
 * @interface IPost
 * @property {string} id - Unique identifier for the post.
 * @property {string} title - Title of the post.
 * @property {string} body - Main content of the post.
 * @property {string} [image] - Optional URL to an image associated with the post.
 * @property {string} user_id - Identifier of the user who created the post.
 * @property {Date} [created_at] - Timestamp of when the post was created.
 * @property {IUser} [user] - User object associated with the post.
 */
export interface IPost {
	id: string;
	title: string;
	body: string;
	image?: string;
	user_id: string;
	created_at?: Date;
	user?: IUser;
}

/**
 * Represents the result of an authentication operation, containing any errors and the authenticated user (if successful).
 * @interface IAuthReturn
 * @property {IInputFields} errors - Any errors that occurred during the authentication process.
 * @property {IUser | null} [user] - The authenticated user, if the authentication was successful.
 */
export interface IAuthReturn {
	errors: IInputFields | null;
	user?: IUser | null;
}
