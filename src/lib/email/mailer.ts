import { Resend } from 'resend';
import MagicLinkEmail from './templates/magic-link';
import { serverEnv } from '@/env/server';

export const resend = new Resend(serverEnv.RESEND_SECRET);

export async function sendMagicLinkEmail(to: string, signInLink: string) {
    const data = await resend.emails.send({
        from: 'no-reply@saasplanet.app',
        to: [to],
        subject: "Magic sign-in link",
        react: MagicLinkEmail({ signInLink: signInLink, sentTo: to }),
    });
}