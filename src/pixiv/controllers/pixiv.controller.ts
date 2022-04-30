import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Query,
} from '@nestjs/common';
import { CreatePixivDTO } from '../dto/createPixiv.dto';
import { PixivService } from '../services/pixiv.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pixiv')
@Controller({
	path: 'pixiv',
	version: '1',
})
export class PixivController {
	constructor(private readonly pixivService: PixivService) {}

	//@Serialize(ResponsePixivDto)
	@Post('/create')
	@HttpCode(HttpStatus.CREATED)
	create(@Body() createPixivDTO: CreatePixivDTO) {
		return this.pixivService.createPixiv(createPixivDTO);
	}

	@Get('/idPixiv/:idPixiv')
	findPixivByIdPixiv(@Param('idPixiv', ParseIntPipe) idPixiv: number) {
		return this.pixivService.getByIdPixiv(idPixiv);
	}

	@Get()
	findPixiv(
		@Query('page', ParseIntPipe) page: number,
		@Query('limit', ParseIntPipe) limit: number,
	) {
		return this.pixivService.findPixiv(page, limit);
	}

	// @Serialize(ResponsePixivDto)
	@Get('/:id')
	getPixivByPK(@Param('id', ParseIntPipe) id: number) {
		return this.pixivService.getById(id);
	}
}
