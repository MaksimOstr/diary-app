-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('NEUTRAL', 'URGENT', 'IMPORTANT');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "Status" "TaskStatus"[];
