const { PrismaClient } = require("@prisma/client");

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
	private static prisma: DB;

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
	public static get connection(): DB {
		if (!DB.prisma) {
			DB.prisma = new PrismaClient();
		}

		return DB.prisma;
	}
}
