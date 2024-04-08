-- DropIndex
DROP INDEX "tasks_id_key";

-- AlterTable
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");
