"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas/index";
import { getUserByEmail } from "@/data/user";
import { generateVerifiactionToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";


export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid credentials" }
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10)

    const userExists = await getUserByEmail(email);

    if (userExists) {
        return {
            error: "Email already in use!"
        }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerifiactionToken(email)
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );

    return { success: "Confirmation email sent!" }
}