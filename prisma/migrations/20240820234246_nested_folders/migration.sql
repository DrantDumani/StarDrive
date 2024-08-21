/*
  Warnings:

  - A unique constraint covering the columns `[name,userId,parentId]` on the table `Folders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Folders_name_userId_key";

-- AlterTable
ALTER TABLE "Folders" ADD COLUMN     "parentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Folders_name_userId_parentId_key" ON "Folders"("name", "userId", "parentId");

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
