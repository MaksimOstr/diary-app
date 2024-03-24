/*
  Warnings:

  - You are about to drop the column `user_agent` on the `tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "user_agent";
