import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

connect ()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const {email, password} = reqBody
    console.log(reqBody)

    const user = await User.findOne({email})
    console.log('Login lookup:', {
  email: JSON.stringify(email),
  database: mongoose.connection.name,
  collection: User.collection.name,
})
    if (!user) {
      return NextResponse.json({error: 'user don exits >:['},
        {status: 400})
    }
    console.log('user exist')

    const validPassword = await bcryptjs.compare(password, user.password)
      console.log('Password valid:', validPassword)
      if(!validPassword) {
        return NextResponse.json({error: 'invalid password'}, {status: 400})
      }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

    const response = NextResponse.json({
      message: 'Login success',
      success: true,
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/'
    })

    return response

  } catch (error) {
    return NextResponse.json( { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      {status: 500})
  }
}
