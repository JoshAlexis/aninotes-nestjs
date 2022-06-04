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
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CreateArtistDto } from '../dto/createArtist.dto';
import { UpdateArtistDto } from '../dto/updateArtist.dto';
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
	create(@Body() data: CreateArtistDto) {
		return this.artistsService.createArtist(data);
	}

	@Serialize(UpdatedArtistResponseDto)
	@Put('/update')
	updateArtist(@Param(ParseIntPipe) id: number, @Body() data: UpdateArtistDto) {
		return this.artistsService.updateArtis(id, data);
	}
}
