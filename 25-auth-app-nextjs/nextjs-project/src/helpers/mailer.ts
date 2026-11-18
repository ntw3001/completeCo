import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

type SendEmailProps = {
  email: string
  emailType: string
  userId: string
}

export const sendEmail = async({email, emailType, userId}: SendEmailProps) => {
  try {
    const hashedToken = bcryptjs.hash(userId.toString(), 10)
  } catch (error) {
  throw new Error(
    error instanceof Error ? error.message : 'Something went wrong'
  )
}
}
