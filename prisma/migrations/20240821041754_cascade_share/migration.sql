-- DropForeignKey
ALTER TABLE "ShareLinks" DROP CONSTRAINT "ShareLinks_folderId_fkey";

-- AddForeignKey
ALTER TABLE "ShareLinks" ADD CONSTRAINT "ShareLinks_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
