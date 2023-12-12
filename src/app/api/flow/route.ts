import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { age, sex, experience, codeAtHome, education, field, occupation } =
    await req.json();

  const flow = uuidv4();

  const user = await prisma.user.create({
    data: {
      id: flow,
      age: parseInt(age),
      sex,
      experience,
      codeAtHome,
      education,
      field,
      occupation,
    },
  });

  return Response.json({ flow: user.id }, { status: 201 });
}
