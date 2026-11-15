import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export const GetDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || ''
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as jwt.JwtPayload & { _id: string }
    return decodedToken.id
  } catch (error) {
      throw error
    }
  }
