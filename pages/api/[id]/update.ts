import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { formType } from "../../create";



export default async function handler(req : NextApiRequest,res : NextApiResponse) {

    const empId = req.query.id;
    const {name,email,isMale,isActive} : formType = req.body;

    if (req.method == "PATCH") {
        await prisma.employee.update({
            where : {
                id : ""+empId
            },
            data : {
                name,
                email,
                isMale,
                isActive
            }
        }).then(_ => {
            return res.status(200).json({message : "Successfully Updated"})
        })
    }else{
        return res.status(400).json({message : "Invalid Method"})
    }
        

}