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
            return registerUser(req, res)
        default:
            res.status(400).json({message: "The endpoint is not valid"})
    }
    
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { email = '', password = '', name = ' ' } = req.body;

    await db.connect();

    const user = await User.findOne({ email });

     if ( user ) {
        await db.disconnect();
        return res.status(400).json({message: "The email is already registered"});
    }

    // TODO: Validate EMAIL
    // if ( email )

    if ( password.length < 6 ) {
        return res.status(400).json({
            message: "Password must be 6+ characters"
        })
    }

    if ( name.length < 2 ) {
        return res.status(400).json({
            message: "Name must be 2+ characters"
        })
    }

    const newUser = new User({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name,
    });

    try {
        await newUser.save({validateBeforeSave:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error, check server logs for more info"})
    }

   

    const { _id, role } = newUser;

    const token = jwt.signToken(_id, email);

    return res.status(200).json({
        token, //Jason Web Token
        user: {
            name, 
            email, 
            role
        }
    })

}
