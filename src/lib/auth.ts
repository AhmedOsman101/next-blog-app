import { User } from "@/db/models/User";
import { compare, genSalt, hash } from "bcryptjs";
import { Validator } from "./Helpers";
import { IUser, IInputFields, IAuthError } from "./Interfaces";

export class Auth {
	public static user: IUser | null = null;
	public static errors: IInputFields;
	public static async login(
		email: string,
		password: string
	): Promise<IUser | IInputFields> {
		try {
			// Validate data
			const { isValid, errors } = Validator({ email, password });

			// Handle invalid data
			if (!isValid) {
				Auth.errors = errors;
				return Auth.errors;
			}

			// Call login API
			const user = await User.findWith("email", email);

			// Handle not existing user
			if (!user) {
				Auth.errors = { message: "This email is not registered" };
				return Auth.errors;
			}

			// Compare passwords
			const isCorrectPassword = await compare(password, user.password);

			// handle existing user with invalid credentials
			if (!isCorrectPassword) {
				Auth.errors = { message: "Invalid credentials" };
				return Auth.errors;
			}

			// On successful login return the user
			Auth.user = user;
			return Auth.user;
		} catch (error) {
			console.info("Login failed");
			throw new AuthError(error, "LOGIN FAILED");
		}
	}

	public static async register(
		name: string,
		email: string,
		password: string,
		password_confirmation: string
	): Promise<IUser | IInputFields> {
		try {
			// Validate data
			const { isValid, errors } = Validator({
				name,
				email,
				password,
				password_confirmation,
			});

			// Handle invalid data
			if (!isValid) {
				Auth.errors = errors;
				return Auth.errors;
			}

			// Generate salt and hash password
			const salt = await genSalt();
			const hashedPassword = await hash(password, salt);

			// Create user in database
			const user = await User.create({
				name,
				email,
				password: hashedPassword,
			});

			// handle failed creation
			if (!user) {
				Auth.errors = {
					message: "User creation failed. Please try again.",
				};
				return Auth.errors;
			}

			// On successful register return the user
			Auth.user = user;
			return Auth.user;
		} catch (error) {
			console.error("Registration failed");
			throw new AuthError(error, "REGISTRATION FAILED");
		}
	}

	public static logout(): void {
		Auth.user = null;
	}

	public static check(): boolean {
		return Auth.user ? true : false;
	}

	// Placeholder methods for future JWT implementation
	public static generateToken(user: IUser): string {
		// TODO: Implement JWT token generation
		return "";
	}

	public static verifyToken(token: string): IUser | null {
		// TODO: Implement JWT token verification
		return null;
	}
}

class AuthError extends Error implements IAuthError {
	constructor(message: string, public code: string) {
		super(message);
		this.name = "AuthError";
	}
}
