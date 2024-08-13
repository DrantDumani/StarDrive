-- AlterTable
ALTER TABLE "Files" ALTER COLUMN "folderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Folders" ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
