import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixivController } from './controllers/pixiv.controller';
import { Pixiv } from './pixiv.entity';
import { PixivService } from './services/pixiv.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pixiv])],
  controllers: [PixivController],
  providers: [PixivService],
})
export class PixivModule {}
