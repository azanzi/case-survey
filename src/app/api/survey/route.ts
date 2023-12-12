import { tasks } from "@/lib/tasks";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import lodash from "lodash";

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

  if (user.steps.length <= 0) {
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

  const tasksLeft = user.steps;
  const random = Math.floor(Math.random() * tasksLeft.length);
  const el = tasksLeft.splice(random, 1)[0];

  const task = tasks[el];
  const options = lodash.shuffle(task.options);

  return Response.json(
    { task: { id: el, prompt: task.prompt, options } },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const flow = req.nextUrl.searchParams.get("flow");
  if (!flow) {
    return Response.json({ message: "No Flow" }, { status: 404 });
  }

  const { taskId, answer, time } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      id: flow,
    },
  });

  if (!user) {
    return Response.json({ message: "Invalid Flow" }, { status: 404 });
  }

  // check if wrong answer
  if (
    tasks[taskId].prompt.replaceAll(" ", "") !==
    answer.toLowerCase().replaceAll("-", "")
  ) {
    return Response.json({ message: "wrong" }, { status: 200 });
  }

  await prisma.task.create({
    data: {
      taskId,
      time,
      user: {
        connect: {
          id: flow,
        },
      },
    },
  });

  const index = user.steps.indexOf(taskId);
  const taskLeft = user.steps;
  taskLeft.splice(index, 1);

  if (index > -1) {
    await prisma.user.update({
      where: {
        id: flow,
      },
      data: {
        steps: taskLeft,
      },
    });
  }

  return Response.json({ message: "ok" }, { status: 200 });
}
