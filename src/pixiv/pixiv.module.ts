import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PixivController } from './controllers/pixiv.controller';
import { PixivService } from './services/pixiv.service';

@Module({
	imports: [PrismaModule],
	controllers: [PixivController],
	providers: [PixivService],
})
export class PixivModule {}
