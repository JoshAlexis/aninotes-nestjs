import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PixivModule } from './pixiv/pixiv.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagsModule } from './tags/tags.module';
import { ArtistsModule } from './artists/artists.module';
import { OriginsModule } from './origins/origins.module';

@Module({
	imports: [PixivModule, PrismaModule, TagsModule, ArtistsModule, OriginsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
