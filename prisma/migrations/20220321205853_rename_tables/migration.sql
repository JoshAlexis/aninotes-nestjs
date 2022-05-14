/*
  Warnings:

  - You are about to drop the `PixivTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PixivTag" DROP CONSTRAINT "PixivTag_pixivId_fkey";

-- DropForeignKey
ALTER TABLE "PixivTag" DROP CONSTRAINT "PixivTag_tagId_fkey";

-- DropTable
DROP TABLE "PixivTag";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pixivTags" (
    "pixivId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "pixivTags_pkey" PRIMARY KEY ("pixivId","tagId")
);

-- AddForeignKey
ALTER TABLE "pixivTags" ADD CONSTRAINT "pixivTags_pixivId_fkey" FOREIGN KEY ("pixivId") REFERENCES "pixiv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pixivTags" ADD CONSTRAINT "pixivTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
