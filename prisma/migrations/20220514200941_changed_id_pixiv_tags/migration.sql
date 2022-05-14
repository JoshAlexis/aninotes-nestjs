/*
  Warnings:

  - The primary key for the `pixivTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[idPixiv]` on the table `pixiv` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "pixivTags" DROP CONSTRAINT "pixivTags_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "pixivTags_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "pixiv_idPixiv_key" ON "pixiv"("idPixiv");
