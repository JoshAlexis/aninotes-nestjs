import {
	Controller,
	HttpStatus,
	Get,
	Post,
	HttpCode,
	Body,
	Put,
	Param,
	ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Artist, ArtistTag } from '@prisma/client';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CreateArtistDto } from '../dto/createArtist.dto';
import { UpdateArtistDto } from '../dto/updateArtist.dto';
import { UpdateArtistTagDto } from '../dto/updateArtistTag.dto';
import { UpdatedArtistResponseDto } from '../dto/updatedArtistResponse.dto';
import { ArtistsService } from '../services/artists.service';

@ApiTags('artists')
@Controller({
	path: 'artists',
	version: '1',
})
export class ArtistsController {
	constructor(private readonly artistsService: ArtistsService) {}

	@Post('/create')
	@HttpCode(HttpStatus.CREATED)
	create(@Body() data: CreateArtistDto): Promise<Artist> {
		return this.artistsService.createArtist(data);
	}

	@Serialize(UpdatedArtistResponseDto)
	@Put('/update/:id')
	updateArtist(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: UpdateArtistDto,
	): Promise<Artist> {
		return this.artistsService.updateArtis(id, data);
	}

	@Get('/')
	findAll(): Promise<Artist[]> {
		return this.artistsService.fetchAll();
	}

	@Put('/tags/:id')
	updateArtistTags(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: UpdateArtistTagDto,
	): Promise<ArtistTag> {
		return this.artistsService.updateTags(id, data);
	}
}
