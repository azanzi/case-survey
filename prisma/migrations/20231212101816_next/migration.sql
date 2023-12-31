-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sex" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "occupation" TEXT,
    "field" TEXT,
    "education" TEXT,
    "experience" TEXT NOT NULL,
    "codeAtHome" TEXT NOT NULL,
    "step" INTEGER NOT NULL DEFAULT 0,
    "done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
