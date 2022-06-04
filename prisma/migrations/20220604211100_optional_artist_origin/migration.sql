-- DropForeignKey
ALTER TABLE "origins" DROP CONSTRAINT "origins_artistId_fkey";

-- AlterTable
ALTER TABLE "origins" ALTER COLUMN "artistId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "origins" ADD CONSTRAINT "origins_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
