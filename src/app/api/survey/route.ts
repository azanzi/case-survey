import { tasks } from "@/lib/tasks";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const flow = req.nextUrl.searchParams.get("flow");
  if (!flow) {
    return Response.json({ message: "No Flow" }, { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: flow,
    },
  });

  if (!user) {
    return Response.json({ message: "Invalid Flow" }, { status: 404 });
  }

  if (user.step >= tasks.length) {
    if (!user.done) {
      await prisma.user.update({
        data: {
          done: true,
        },
        where: {
          id: flow,
        },
      });
    }
    return new Response(null, { status: 204 });
  }

  const task = tasks[user.step];

  return Response.json(
    { task: { prompt: task.prompt, options: task.options } },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const flow = req.nextUrl.searchParams.get("flow");
  if (!flow) {
    return Response.json({ message: "No Flow" }, { status: 404 });
  }

  const { answer, time } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      id: flow,
    },
  });

  if (!user) {
    return Response.json({ message: "Invalid Flow" }, { status: 404 });
  }

  await prisma.task.create({
    data: {
      taskId: user.step,
      correct: tasks[user.step].prompt === answer,
      time,
      user: {
        connect: {
          id: flow,
        },
      },
    },
  });

  const updatedUser = await prisma.user.update({
    where: {
      id: flow,
    },
    data: {
      step: user.step + 1,
    },
  });

  return Response.json({ message: "ok" }, { status: 200 });
}
