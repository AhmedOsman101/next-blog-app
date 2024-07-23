import { Prisma, PrismaClient } from "@prisma/client";
import DB from "../PrismaConnection";
import { IPost } from "./Post";
import { DefaultArgs } from "@prisma/client/runtime/library";

export interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
	image?: string;
	isAdmin?: boolean;
	posts?: IPost[] | [];
}

class User {
	protected static prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		DefaultArgs
	> = DB.connection;

	public static async all(withPosts = false): Promise<IUser[]> {
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

	public static async find(
		id: string,
		withPosts = false
	): Promise<IUser | null> {
		try {
			const user = User.prisma.user.findUnique({
				where: { id },
				include: {
					posts: withPosts,
				},
			});

			if (!user) {
				throw new Error("User was not found");
			}

			return user;
		} catch (error) {
			console.info("Failed to fetch the user", error);
		}
	}
}
