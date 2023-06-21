import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(400).json({ name: 'Search term not foind' })
}