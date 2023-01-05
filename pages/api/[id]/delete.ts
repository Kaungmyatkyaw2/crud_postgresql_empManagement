import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const empId = req.query.id;

  if (req.method === "DELETE") {
    await prisma.employee
      .delete({
        where: {
          id: ""+empId,
        },
      })
      .then(async (_) => {
        res.status(200).json({ message: "SUCCESS" });
      });
  } else {
    return res.status(400).json({ message: "failure" });
  }
}
