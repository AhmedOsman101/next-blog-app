import { Prisma, PrismaClient } from "@prisma/client";
import DB from "../PrismaConnection";
import { IPost } from "./Post";
import { DefaultArgs } from "@prisma/client/runtime/library";

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
	id: string;
	name: string;
	email: string;
	password: string;
	image?: string;
	isAdmin?: boolean;
	posts?: IPost[] | [];
}

/**
 * Class representing user operations in the database.
 * @class User
 */
class User {
	/**
	 * Prisma client instance for database operations.
	 * @private
	 * @static
	 */
	protected static prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		DefaultArgs
	> = DB.connection;

	/**
	 * Retrieves all users from the database.
	 * @static
	 * @async
	 * @param {boolean} [withPosts=false] - Whether to include associated posts.
	 * @returns {Promise<IUser[]>} A promise that resolves to an array of users.
	 * @throws {Error} If there's an error fetching the users.
	 */
	public static async all(withPosts: boolean = false): Promise<IUser[]> {
		try {
			const users = await User.prisma.user.findMany({
				include: {
					posts: withPosts,
				},
			});
			return users;
		} catch (error) {
			console.info("Failed to fetch users");
			throw new Error("Failed to fetch users");
		}
	}

	/**
	 * Finds a specific user by their ID.
	 * @static
	 * @async
	 * @param {string} id - The ID of the user to find.
	 * @param {boolean} [withPosts=false] - Whether to include associated posts.
	 * @returns {Promise<IUser | null>} A promise that resolves to the found user or null if not found.
	 * @throws {Error} If there's an error fetching the user or if the user is not found.
	 */
	public static async find(
		id: string,
		withPosts: boolean = false
	): Promise<IUser | null> {
		try {
			const user = User.prisma.user.findUnique({
				where: { id },
				include: {
					posts: withPosts,
				},
			});

			if (!user) return null;

			return user;
		} catch (error) {
			console.info("Failed to fetch the user");
			throw new Error(error);
		}
	}
}
