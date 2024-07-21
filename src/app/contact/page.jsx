"use client";

import InputError from "@/components/InputError";
import { Validator } from "@/lib/Helpers";
import { Success } from "@/lib/SweetAlert";
import Image from "next/image";
import { useState } from "react";

const Contact = () => {
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		// prevent page from reloading
		e.preventDefault();

		// access the form
		const form = e.target;

		// validate the inputs
		const { errors, isValid } = Validator({
			name: form.name.value,
			email: form.email.value,
			message: form.message.value,
		});

		if (isValid) {
			// display success alert
			Success("Your message has been sent!");

			// reset form elements
			form.name.value = "";
			form.email.value = "";
			form.message.value = "";
			setErrors({});
		} else {
			setErrors(errors);
		}
	};

	return (
		<>
			<div className="my-6 max-w-screen-xl h-full grid place-items-center">
				<div className="grid w-full grid-cols-1 gap-16 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-24 bg-gray-900">
					<div className="flex flex-col justify-between">
						<div className="space-y-2">
							<h2 className="text-4xl font-bold leading-tight lg:text-5xl">
								Get in touch
							</h2>
							<div className="text-gray-500">
								Fill in the form to start a conversation
							</div>
						</div>
						<div className="p-6 h-52 md:h-64 relative">
							<Image
								src="/imgs/contact.png"
								alt="Contact image"
								className="object-scale-down"
								fill
							/>
						</div>
					</div>
					<form
						noValidate
						onSubmit={handleSubmit}
						className="space-y-4"
						method="POST">
						<div>
							<label
								htmlFor="name"
								className="text-sm">
								Full name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								placeholder="John Doe"
								className="w-full p-3 rounded-lg bg-gray-100 form-input text-gray-900"
							/>
							<InputError message={errors?.name} />
						</div>
						<div>
							<label
								htmlFor="email"
								className="text-sm">
								Email
							</label>
							<input
								id="email"
								type="email"
								name="email"
								className="w-full p-3 rounded-lg bg-gray-100 form-input text-gray-900"
								placeholder="JohnDoe@mail.com"
							/>
							<InputError message={errors?.email} />
						</div>
						<div>
							<label
								htmlFor="message"
								className="text-sm">
								Message
							</label>
							<textarea
								id="message"
								placeholder="Tell us what you need"
								rows="3"
								name="message"
								className="w-full p-3 rounded-lg bg-gray-100 form-textarea text-gray-900"
							/>
							<InputError message={errors?.message} />
						</div>
						<button
							type="submit"
							className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-blue-600 text-gray-50">
							Send Message
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Contact;
