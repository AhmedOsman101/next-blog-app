import { User } from "@/db/models/User";
import { compare, genSalt, hash } from "bcryptjs";
import { Validator } from "./Helpers";
import { IUser, IAuthError, IAuthReturn } from "./Interfaces";
import jwt from "jsonwebtoken";

export class Auth {
	protected static authUser: IUser | null;
	protected static authToken: string;

	private static readonly JWT_SECRET: string = process.env.JWT_SECRET;
	private static readonly TOKEN_EXPIRY: string = "1d";

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
			Auth.authUser = user;

			// Generate JWT token
			Auth.authToken = Auth.generateToken(user);

			// Return the user
			return { errors: null, user: Auth.authUser };
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
			Auth.authUser = user;

			// Return the user
			return { errors: null, user: Auth.authUser };
		} catch (error) {
			console.error("Registration failed");
			throw new AuthError(error, "REGISTRATION FAILED");
		}
	}

	protected static async get(): Promise<IUser | null> {
		if (Auth.check()) {
			Auth.authUser = await User.find(Auth.authUser.id);
			return Auth.authUser;
		}

		return null;
	}

	public static async user() {
		await Auth.get();
		return Auth.authUser;
	}

	public static logout(): void {
		Auth.authUser = null;
	}

	public static check(): boolean {
		return Auth.authUser ? true : false;
	}

	// Placeholder methods for future JWT implementation
	private static generateToken(user: IUser): string {
		const payload = {
			id: user.id,
		};

		const token = jwt.sign(payload, Auth.JWT_SECRET, {
			expiresIn: Auth.TOKEN_EXPIRY,
		});

		return token;
	}

	public static async verifyToken(token: string): Promise<IUser> {
		try {
			const decoded = jwt.verify(token, this.JWT_SECRET) as {
				id: string;
			};
			const user = await User.find(decoded.id);

			if (!user) {
				throw new AuthError("User not found", "USER_NOT_FOUND");
			}

			return user;
		} catch (error) {
			console.info(error);
			throw new AuthError("Invalid token", "INVALID_TOKEN");
		}
	}
}

class AuthError extends Error implements IAuthError {
	constructor(message: string, public code: string) {
		super(message);
		this.name = "AuthError";
	}
}
