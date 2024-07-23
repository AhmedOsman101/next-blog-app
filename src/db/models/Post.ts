import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import DB from "../PrismaConnection";
import { IUser } from "./User";

export interface IPost {
	id: string;
	title: string;
	body: string;
	image?: string;
	user_id: string;
	created_at?: Date;
	user?: IUser;
}

export class Post {
	protected static prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		DefaultArgs
	> = DB.connection;

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

	public static async create(data: any) {
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
