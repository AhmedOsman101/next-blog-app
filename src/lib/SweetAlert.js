import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export const Loader = () => {
	MySwal.fire({
		title: "Loading...",
		html: `
		<div class="Loader-1">
			<div class="Loader-2"></div>
		</div>`,
		allowOutsideClick: false,
		allowEscapeKey: false,
		showConfirmButton: false,
	});
};

export const Success = (html, link = null, navigate = null) => {
	MySwal.fire({
		title: "Succeed!",
		html: html,
		icon: "success",
		didClose: () => {
			if (link && navigate) navigate(link);
		},
	});
};

export const Fail = (title = null, text) => {
	MySwal.fire({
		icon: "error",
		title: title || "Oops...",
		text: text,
	});
};

export const Close = () => {
	MySwal.close();
};

export const InfoAC = (msg, duration = 2500) => {
	return MySwal.fire({
		title: msg,
		icon: "info",
		timer: duration,
		allowEscapeKey: false,
		showConfirmButton: false,
	});
};
