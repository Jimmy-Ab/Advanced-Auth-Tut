"use server"

import bcrypt from "bcryptjs";
import * as z from "zod";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import { db } from "@/lib/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return { error: "token missing!" }
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { password } = validatedFields.data;

    const existingtoken = await getPasswordResetTokenByToken(token);
    if (!existingtoken) {
        return { error: "invalid token" }
    }

    const hasExpired = new Date(existingtoken.expires) < new Date();
    if (hasExpired) {
        return { error: "Token has expired!" }
    }

    const existingUser = await getUserByEmail(existingtoken.email);
    if (!existingUser) {
        return { error: "Email doesn't exist!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where: { id: existingtoken.id }
    })

    return { success: "Password Reset successful" }
}