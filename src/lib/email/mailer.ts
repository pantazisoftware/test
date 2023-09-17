import { serverEnv } from "@/env/server";
import { Resend } from "resend";
import MagicLinkEmail from "./templates/magic-link";

export const resend = new Resend(serverEnv.RESEND_SECRET);

export async function sendMagicLinkEmail(to: string, signInLink: string) {
  const data = await resend.emails.send({
    from: "no-reply@mozocode.com",
    to: [to],
    subject: "Signin to MozoCode",
    react: MagicLinkEmail({ signInLink: signInLink, sentTo: to }),
  });
}
