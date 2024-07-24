import { Logout } from "@/lib/Actions";
import { TbLogout } from "react-icons/tb";

const LogoutButton = () => {
	return (
		<>
			<form
				action={Logout}
				className="self-center">
				<button className="flex space-x-2 rounded-lg px-4 py-3 items-center bg-blue-500">
					<span className="text-white">Logout</span>
					<TbLogout />
				</button>
			</form>
		</>
	);
};

export default LogoutButton;
