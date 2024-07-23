import DB from "../PrismaConnection";

const prisma = DB.connection;

const getUser = async (id, withPosts = false) => {
	try {
		const user = prisma.user.findUnique({
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
};

const getAllUsers = async () => {
	try {
		const users = await prisma.user.findMany({});
		return users;
	} catch (error) {
		console.info("Failed to fetch users");
		throw new Error(error);
	}
};

module.exports = {
	getAllUsers,
	getUser,
};
