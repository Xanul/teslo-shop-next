import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { User } from '@/models';
import bcrypt from 'bcryptjs';
import { jwt } from '@/utils';

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
        case 'POST':
            return loginUser(req, res)
        default:
            res.status(400).json({message: "The endpoint is not valid"})
    }
    
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { email = '', password = '' } = req.body;

    await db.connect();

    const user = await User.findOne({ email });

    await db.disconnect();

    if ( !user ) {
        return res.status(400).json({message: "Email or Password not valid - EMAIL"});
    }

    if ( !bcrypt.compareSync( password, user.password! )) {
        return res.status(400).json({message: "Email or Password not valid - PASSWORD"})
    }

    const {name, role, _id} = user;

    const token = jwt.signToken(_id, email);

    return res.status(200).json({
        token, //Jason Web Token
        user: {
            name, email, role
        }
    })

}
