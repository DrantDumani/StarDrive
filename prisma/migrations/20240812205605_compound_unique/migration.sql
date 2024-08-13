/*
  Warnings:

  - A unique constraint covering the columns `[name,userId,folderId]` on the table `Files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId,parentId]` on the table `Folders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Files_name_key";

-- DropIndex
DROP INDEX "Folders_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Files_name_userId_folderId_key" ON "Files"("name", "userId", "folderId");

-- CreateIndex
CREATE UNIQUE INDEX "Folders_name_userId_parentId_key" ON "Folders"("name", "userId", "parentId");
