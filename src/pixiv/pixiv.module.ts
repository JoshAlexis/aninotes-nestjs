import { Module } from '@nestjs/common';
import { PixivController } from './controllers/pixiv.controller';
import { PixivService } from './services/pixiv.service';

@Module({
	controllers: [PixivController],
	providers: [PixivService],
})
export class PixivModule {}
