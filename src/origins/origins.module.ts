import { Module } from '@nestjs/common';
import { OriginsController } from './controllers/origins.controller';
import { OriginsService } from './service/origins.service';

@Module({
	controllers: [OriginsController],
	providers: [OriginsService],
})
export class OriginsModule {}
