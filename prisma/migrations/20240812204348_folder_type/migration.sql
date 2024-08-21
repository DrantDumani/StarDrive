-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Root', 'Child');

-- AlterTable
ALTER TABLE "Folders" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'Child';
