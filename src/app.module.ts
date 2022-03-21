import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PixivModule } from './pixiv/pixiv.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagsModule } from './tags/tags.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), PixivModule, PrismaModule, TagsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
