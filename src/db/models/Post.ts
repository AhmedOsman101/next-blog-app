import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import DB from "../PrismaConnection";
import { IUser } from "./User";

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
 * Class representing post operations in the database.
 * @class Post
 */
export class Post {
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
	 * Retrieves all posts from the database.
	 * @static
	 * @async
	 * @returns {Promise<IPost[]>} A promise that resolves to an array of posts.
	 * @throws {Error} If there's an error fetching the posts.
	 */
	public static async all(): Promise<IPost[]> {
		try {
			const posts = await Post.prisma.post.findMany({
				include: {
					user: true,
				},
			});
			return posts;
		} catch (error) {
			console.info("Failed to fetch posts");
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
			const post = await Post.prisma.post.findUnique({
				where: { id },
				include: {
					user: true,
				},
			});
			return post;
		} catch (error) {
			console.info("Failed to fetch the post");
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
	public static async create(data: any): Promise<IPost> {
		try {
			const post = await Post.prisma.post.create({
				data,
			});
			return post;
		} catch (error) {
			console.info("Failed to create post");
			throw new Error(error);
		}
	}
}
