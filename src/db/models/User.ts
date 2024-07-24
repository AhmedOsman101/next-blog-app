import { Prisma } from "@prisma/client";
import DB from "../PrismaConnection";
import { IUser } from "@/lib/Interfaces";
import { DefaultArgs } from "@prisma/client/runtime/library";

/**
 * Class representing user operations in the database.
 * @class User
 */
export class User {
	/**
	 * Prisma client instance for database operations.
	 * @public
	 * @static
	 */
	public static prisma: Prisma.UserDelegate<DefaultArgs> = DB.connection.user;

	/**
	 * Retrieves all users from the database.
	 * @static
	 * @async
	 * @param {boolean} [withPosts=false] - Whether to include associated posts.
	 * @returns {Promise<IUser[]>} A promise that resolves to an array of users.
	 * @throws {Error} If there's an error fetching the users.
	 */
	public static async all(
		withPosts: boolean = false
	): Promise<IUser[] | false> {
		try {
			const users = await User.prisma.findMany({
				include: {
					posts: withPosts,
				},
			});
			return users;
		} catch (error) {
			console.error("Failed to fetch users", error);
			return false;
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
	): Promise<IUser | null | false> {
		try {
			const user = User.prisma.findUnique({
				where: { id },
				include: {
					posts: withPosts,
				},
			});

			if (!user) return null;

			return user;
		} catch (error) {
			console.error("Failed to fetch the user", error);
			return false;
		}
	}

	public static async findWith(
		field: string,
		value: any
	): Promise<IUser | null | false> {
		try {
			const user = await User.prisma.findFirst({
				where: {
					[field]: value,
				},
			});
			return user ?? null;
		} catch (error) {
			console.error("Failed to find user by field/value", error);
			return false;
		}
	}

	public static async create(
		data: Prisma.UserCreateInput
	): Promise<IUser | false> {
		try {
			const user = await User.prisma.create({ data });

			return user;
		} catch (error) {
			console.error("Failed to create user", error);
			return false;
		}
	}
}
