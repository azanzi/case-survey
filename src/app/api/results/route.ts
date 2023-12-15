import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { createObjectCsvStringifier } from "csv-writer";

const prisma = new PrismaClient();

export const fetchCache = 'force-no-store';

function parseObject(input: { tasks: { time: number }[] }) {
  const resultObject: { tasks: { time: number }[] } = { ...input };
  // @ts-ignore
  delete resultObject.tasks;

  input.tasks.forEach((task, index) => {
    // @ts-ignore
    resultObject[`t${index + 1}`] = task.time;
  });

  return resultObject;
}

// GET /api/results
export async function GET(req: NextRequest) {
  const results = await prisma.user.findMany({
    select: {
      id: true,
      age: true,
      createdAt: true,
      codeAtHome: true,
      education: true,
      experience: true,
      field: true,
      occupation: true,
      sex: true,
      tasks: {
        select: {
          taskId: true,
          time: true,
        },
        orderBy: {
          taskId: "asc",
        },
      },
    },
    where: {
      done: true,
      age: {
        lt: 99,
      },
    },
  });

  // get csv
  const csv = createObjectCsvStringifier({
    header: [
      { id: "id", title: "ID" },
      { id: "age", title: "AGE" },
      { id: "sex", title: "SEX" },
      { id: "occupation", title: "OCCUPATION" },
      { id: "field", title: "FIELD" },
      { id: "education", title: "EDUCATION" },
      { id: "experience", title: "USAGE" },
      { id: "codeAtHome", title: "CODES-AT-HOME" },
      { id: "t1", title: "CC-1" },
      { id: "t2", title: "CC-2" },
      { id: "t3", title: "CC-3" },
      { id: "t4", title: "CC-4" },
      { id: "t5", title: "CC-5" },
      { id: "t6", title: "CC-6" },
      { id: "t7", title: "CC-7" },
      { id: "t8", title: "CC-8" },
      { id: "t9", title: "CC-9" },
      { id: "t10", title: "CC-10" },
      { id: "t11", title: "KC-1" },
      { id: "t12", title: "KC-2" },
      { id: "t13", title: "KC-3" },
      { id: "t14", title: "KC-4" },
      { id: "t15", title: "KC-5" },
      { id: "t16", title: "KC-6" },
      { id: "t17", title: "KC-7" },
      { id: "t18", title: "KC-8" },
      { id: "t19", title: "KC-9" },
      { id: "t20", title: "KC-10" },
      { id: "t21", title: "LC-1" },
      { id: "t22", title: "LC-2" },
      { id: "t23", title: "LC-3" },
      { id: "t24", title: "LC-4" },
      { id: "t25", title: "LC-5" },
      { id: "t26", title: "LC-6" },
      { id: "t27", title: "LC-7" },
      { id: "t28", title: "LC-8" },
      { id: "t29", title: "LC-9" },
      { id: "t30", title: "LC-10" },
    ],
  });

  const parsedResults = [];
  for (let entry of results) {
    parsedResults.push(parseObject(entry));
  }

  const headers = new Headers();
  const csvString = csv.getHeaderString() + csv.stringifyRecords(parsedResults);

  headers.append("Content-Disposition", "attachment; filename=results.csv");
  headers.append("Content-Type", "text/csv");
  headers.append(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, max-age=0"
  );

  return new Response(csvString, { headers });
}
