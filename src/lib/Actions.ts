"use server";

import { DEFAULT_IMG } from "@/lib/Constants";
import { writeFile } from "fs/promises";
import path from "path";
import { Auth } from "./Auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const Register = async (formData: FormData) => {
	// The as string | null assertions are used because formData.get()
	// can return either a string, a File object, or null.
	const name = formData.get("name") as string | null;
	const email = formData.get("email") as string | null;
	const password = formData.get("password") as string | null;
	const password_confirmation = formData.get("password_confirmation") as
		| string
		| null;

	// Use a two-step type assertion to treat the value as a File
	// Step 1: Assert to 'unknown' (acknowledging type uncertainty)
	// Step 2: Assert from 'unknown' to 'File' (specifying our intended type)
	const file: File | null = formData.get("avatar") as unknown as File | null;

	// Check if a file was submitted
	const image = await ProcessImage(file);

	const result = await Auth.register(
		name,
		email,
		password,
		password_confirmation,
		image
	);

	// If registration succeed redirect to homepage
	if (!result.errors) {
		return redirect("/");
	}

	// If registration failed return errors
	return result.errors;
};

const ProcessImage = async (image: File | null): Promise<string> => {
	// Now 'file' is treated as a File object (or null)
	// This allows us to use File methods and properties on 'file'
	if (image.size === 0) {
		return DEFAULT_IMG;
	}

	try {
		// We can now safely use File properties and methods
		const bytes = await image.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// With the file data in the buffer, you can do whatever you want with it.
		// For this example, we'll just write it to the public directory
		const filename = Date.now() + "_" + image.name.replaceAll(" ", "_");

		const filepath = path.join(process.cwd(), "public/uploads/" + filename);

		// return filepath;
		await writeFile(filepath, buffer);

		return `/uploads/${filename}`;
	} catch (error) {
		console.error("Error processing image:", error);
	}
};

export const Logout = () => {
	Auth.logout();
	revalidatePath("/");
	return redirect("/");
};
