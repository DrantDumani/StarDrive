/*
  Warnings:

  - You are about to drop the column `parentId` on the `Folders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,userId]` on the table `Folders` will be added. If there are existing duplicate values, this will fail.

*/

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- DropForeignKey
ALTER TABLE "Folders" DROP CONSTRAINT "Folders_parentId_fkey";

-- DropIndex
DROP INDEX "Folders_name_userId_parentId_key";

-- AlterTable
ALTER TABLE "Folders" DROP COLUMN "parentId";

-- CreateTable
CREATE TABLE "ShareLinks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "folderId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresInDays" INTEGER NOT NULL,

    CONSTRAINT "ShareLinks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Folders_name_userId_key" ON "Folders"("name", "userId");

-- AddForeignKey
ALTER TABLE "ShareLinks" ADD CONSTRAINT "ShareLinks_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
