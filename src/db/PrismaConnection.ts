import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

/**
 * DB class for managing Prisma database connection.
 * @class
 */
class DB {
	/**
	 * Static private property to hold the Prisma client instance.
	 * @static
	 * @private
	 */
	static prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

	/**
	 * Empty private constructor for the DB class to prevent creating new instances using the new keyword.
	 * @constructor
	 * @private
	 */
	private constructor() {}

	/**
	 * Get or create a Prisma client connection.
	 * @static
	 * @returns The Prisma client instance.
	 */
	public static get connection(): PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		DefaultArgs
	> {
		if (!DB.prisma) {
			DB.prisma = new PrismaClient();
		}

		return DB.prisma;
	}
}

export default DB;
