import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export const Loader = (): void => {
	MySwal.fire({
		title: "Loading...",
		html: `
		<div className="Loader-1">
			<div className="Loader-2"></div>
		</div>`,
		allowOutsideClick: false,
		allowEscapeKey: false,
		showConfirmButton: false,
	});
};

export const Success = (
	title: string | HTMLElement | JQuery = "Succeed!",
	html: string | HTMLElement | JQuery,
	link: string = null,
	navigate = null
): void => {
	MySwal.fire({
		title,
		html,
		icon: "success",
		didClose: () => {
			if (link && navigate) navigate(link);
		},
	});
};

export const Fail = (
	title: string | HTMLElement | JQuery = "Oops...",
	text: string
): void => {
	MySwal.fire({
		icon: "error",
		title,
		text,
	});
};

export const Close = (): void => {
	MySwal.close();
};

export const InfoAC = (
	title: string | HTMLElement | JQuery,
	duration: number = 2500
): void => {
	MySwal.fire({
		title: title,
		icon: "info",
		timer: duration,
		allowEscapeKey: false,
		showConfirmButton: false,
	});
};
