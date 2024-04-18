/*
  Warnings:

  - You are about to drop the column `Status` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "Status",
ADD COLUMN     "status" "TaskStatus"[];
