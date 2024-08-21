/*
  Warnings:

  - You are about to drop the column `created_at` on the `ShareLinks` table. All the data in the column will be lost.
  - You are about to drop the column `expiresInDays` on the `ShareLinks` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `ShareLinks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShareLinks" DROP COLUMN "created_at",
DROP COLUMN "expiresInDays",
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;
