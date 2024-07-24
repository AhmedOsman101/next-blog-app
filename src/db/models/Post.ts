import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import DB from "../PrismaConnection";
import { IPost } from "@/lib/Interfaces";

/**
 * Class representing post operations in the database.
 * @class Post
 */
export class Post {
	/**
	 * Prisma client instance for database operations.
	 * @public
	 * @static
	 */
	public static prisma: Prisma.PostDelegate<DefaultArgs> = DB.connection.post;

	/**
	 * Retrieves all posts from the database.
	 * @static
	 * @async
	 * @returns {Promise<IPost[]>} A promise that resolves to an array of posts.
	 * @throws {Error} If there's an error fetching the posts.
	 */
	public static async all(): Promise<IPost[]> {
		try {
			const posts = await Post.prisma.findMany({
				include: {
					user: true,
				},
			});
			return posts;
		} catch (error) {
			console.error("Failed to fetch posts");
			throw new Error(error);
		}
	}

	/**
	 * Finds a specific post by its ID.
	 * @static
	 * @async
	 * @param {string} id - The ID of the post to find.
	 * @returns {Promise<IPost | null>} A promise that resolves to the found post or null if not found.
	 * @throws {Error} If there's an error fetching the post.
	 */
	public static async find(id: string): Promise<IPost | null> {
		try {
			const post = await Post.prisma.findUnique({
				where: { id },
				include: {
					user: true,
				},
			});
			return post;
		} catch (error) {
			console.error("Failed to fetch the post");
			throw new Error(error);
		}
	}

	/**
	 * Creates a new post in the database.
	 * @static
	 * @async
	 * @param {any} data - The data for creating the new post.
	 * @returns {Promise<IPost>} A promise that resolves to the created post.
	 * @throws {Error} If there's an error creating the post.
	 */
	public static async create(data: Prisma.PostCreateInput): Promise<IPost> {
		try {
			const post = await Post.prisma.create({
				data,
			});
			return post;
		} catch (error) {
			console.error("Failed to create post");
			throw new Error(error);
		}
	}
}
