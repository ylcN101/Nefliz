import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end()
    }

    const { email, name, password } = req.body

    console.log(req.body)
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return res.status(422).json({ error: 'Email taken' })
    }

    console.log(existingUser)

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: `https://avatars.dicebear.com/api/avataaars/${email}.svg`,
        emailVerified: new Date(),
      },
    })

    console.log(user)

    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` })
  }
}
