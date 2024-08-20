/*
  Warnings:

  - The primary key for the `ShareLinks` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ShareLinks" DROP CONSTRAINT "ShareLinks_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShareLinks_pkey" PRIMARY KEY ("id");
