import * as z from "zod";

export const usernameValidation = (username : string) => {
    const schema = z.string().min(3, {message: "Username must be 3 characters."}).max(20, {message: "Username must not be more than 20 characters."}).regex(/^[a-zA-Z0-9_]+$/, {message: "Username must only contain letters, numbers and underscores."});
    return schema.safeParse(username);
}