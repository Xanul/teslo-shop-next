import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { User } from '@/models';
import bcrypt from 'bcryptjs';
import { jwt } from '@/utils';
import { isValidToken } from '@/utils/jwt';

type Data = 
    { message: string }
    | {
        token: string;
        user: {
            email: string,
            name: string,
            role: string
        }
    }

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method) {
        case 'GET':
            return checkJWT(req, res)
        default:
            res.status(400).json({message: "The endpoint is not valid"})
    }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { token = " " } = req.cookies;

    let userID = "";

    try {

      userID = await jwt.isValidToken( token );

    } catch (error) {
      return res.status(401).json({message: "Token is not valid"}) 
    }

    await db.connect();

    const user = await User.findById(userID).lean();

    await db.disconnect();

    if ( !user ) {
        return res.status(400).json({message: "There is no user with the ID"});
    }

    const { _id, name, email, role } = user;

    return res.status(200).json({
        token: jwt.signToken( _id, email ), //Jason Web Token
        user: {
           email,
           role,
           name
        }
    })

}
