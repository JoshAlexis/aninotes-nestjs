-- CreateTable
CREATE TABLE "pixiv" (
    "id" SERIAL NOT NULL,
    "idPixiv" INTEGER NOT NULL,
    "pixivName" TEXT DEFAULT E'In Japanese',
    "link" TEXT NOT NULL,
    "favorite" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pixiv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PixivTag" (
    "pixivId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "PixivTag_pkey" PRIMARY KEY ("pixivId","tagId")
);

-- AddForeignKey
ALTER TABLE "PixivTag" ADD CONSTRAINT "PixivTag_pixivId_fkey" FOREIGN KEY ("pixivId") REFERENCES "pixiv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PixivTag" ADD CONSTRAINT "PixivTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
