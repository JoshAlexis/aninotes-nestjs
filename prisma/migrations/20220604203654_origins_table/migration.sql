/*
  Warnings:

  - You are about to drop the column `origin` on the `artist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artist" DROP COLUMN "origin";

-- CreateTable
CREATE TABLE "origins" (
    "id" SERIAL NOT NULL,
    "artistId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "origins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "origins_artistId_key" ON "origins"("artistId");

-- AddForeignKey
ALTER TABLE "origins" ADD CONSTRAINT "origins_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
