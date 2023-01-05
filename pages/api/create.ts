import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { formType } from "../create";


export default async function handler(req : NextApiRequest,res : NextApiResponse) {

    const {name,email,isMale,isActive} : formType = req.body;

    
    res.status;

    try {
        await prisma.employee.create({
            data : {
                email,
                name,
                isMale,
                isActive
            }
        })

        res.status(200).json({message: 'Note Created'})

    
    }catch (error){
        console.log(error)
    }
}