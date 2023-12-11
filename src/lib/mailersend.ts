import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend'

import { z } from 'zod'

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  subject: z.string(),
})

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_TOKEN!,
})

type sendEmailProps = {
  toEmail: string
  toName?: string
  subject: string
  html: string
  text: string
}

export const sendEmail = async (data: sendEmailProps) => {
  const recipients = [new Recipient(data.toEmail, data.toName)]
  const sentFrom = new Sender('hi@edgaras.com', 'Edgaras')

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject(data.subject)
    .setHtml(data.html)
    .setText(data.text)

  return await mailersend.email.send(emailParams)
}
