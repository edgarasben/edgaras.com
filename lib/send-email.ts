const Recipient = require('mailersend').Recipient
const EmailParams = require('mailersend').EmailParams
const MailerSend = require('mailersend')
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    subject: z.string()
})

const mailersend = new MailerSend({
    api_key: process.env.MAILERSEND_TOKEN
})

type sendEmailProps = {
    toEmail: string
    toName?: string
    subject: string
    html: string
    text: string
}

export const sendEmail = async (data: sendEmailProps) => {
    const recipients = [new Recipient(data.toEmail, data.toName || null)]

    const emailParams = new EmailParams()
        .setFrom('hi@edgaras.com')
        .setFromName('Edgaras Benediktavicius')
        .setRecipients(recipients)
        .setReplyTo('hi@edgaras.com')
        .setReplyToName('Edgaras Benediktavicius')
        .setSubject(data.subject)
        .setHtml(data.html)
        .setText(data.text)

    return await mailersend.send(emailParams)
}
