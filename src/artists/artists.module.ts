import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ArtistsController } from './controllers/artists.controller';
import { ArtistsService } from './services/artists.service';

@Module({
	imports: [PrismaModule],
	controllers: [ArtistsController],
	providers: [ArtistsService],
})
export class ArtistsModule {}
