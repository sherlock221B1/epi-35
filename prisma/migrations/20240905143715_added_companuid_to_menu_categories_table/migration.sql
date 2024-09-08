-- AlterTable
ALTER TABLE "MenusCategories" ADD COLUMN     "companyId" INTEGER;

-- AddForeignKey
ALTER TABLE "MenusCategories" ADD CONSTRAINT "MenusCategories_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
