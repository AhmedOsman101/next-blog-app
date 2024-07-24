import { User } from "@/db/models/User";
import { compare, genSalt, hash } from "bcryptjs";
import { Validator } from "./Helpers";
import { IUser, IAuthError, IAuthReturn } from "./Interfaces";

export class Auth {
	protected static user: IUser | null;
	public static async login(
		email: string,
		password: string
	): Promise<IAuthReturn> {
		try {
			// Validate data
			const { isValid, errors } = Validator({ email, password });

			// Handle invalid data
			if (!isValid) {
				return { errors };
			}

			// Call login API
			const user = await User.findWith("email", email);

			// Handle not existing user
			if (!user) {
				return { errors: { message: "This email is not registered" } };
			}

			// Compare passwords
			const isCorrectPassword = await compare(password, user.password);

			// handle existing user with invalid credentials
			if (!isCorrectPassword) {
				return { errors: { message: "Invalid credentials" } };
			}

			// On successful login store the user
			Auth.user = user;

			// Return the user
			return { errors: null, user: Auth.user };
		} catch (error) {
			console.info("Login failed");
			throw new AuthError(error, "LOGIN FAILED");
		}
	}

	public static async register(
		name: string,
		email: string,
		password: string,
		password_confirmation: string,
		image: string
	): Promise<IAuthReturn> {
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
				return { errors };
			}

			// Generate salt and hash password
			const salt = await genSalt();
			const hashedPassword = await hash(password, salt);

			// Create user in database
			const user = await User.create({
				name,
				email,
				password: hashedPassword,
				image,
			});

			// handle failed creation
			if (!user) {
				return {
					errors: {
						message: "User creation failed. Please try again.",
					},
				};
			}

			// On successful register store the user
			Auth.user = user;

			// Return the user
			return { errors: null, user: Auth.user };
		} catch (error) {
			console.error("Registration failed");
			throw new AuthError(error, "REGISTRATION FAILED");
		}
	}

	public static async get(): Promise<IUser | null> {
		if (Auth.check()) {
			Auth.user = await User.find(Auth.user.id);
			return Auth.user;
		}

		return null;
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
