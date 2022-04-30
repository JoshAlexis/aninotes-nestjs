import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { CreatePixivDTO } from '../dto/createPixiv.dto';
import { PixivService } from '../services/pixiv.service';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { ResponseUpdatedPixivDto } from '../dto/responseUpdatedPixiv.dto';
import { UpdatePixivDto } from '../dto/updatePixiv.dto';

@ApiTags('Pixiv')
@Controller({
	path: 'pixiv',
	version: '1',
})
export class PixivController {
	constructor(private readonly pixivService: PixivService) {}

	@Post('/create')
	@HttpCode(HttpStatus.CREATED)
	create(@Body() createPixivDTO: CreatePixivDTO) {
		return this.pixivService.createPixiv(createPixivDTO);
	}

	@Get('/idPixiv/:idPixiv')
	findPixivByIdPixiv(@Param('idPixiv', ParseIntPipe) idPixiv: number) {
		return this.pixivService.getByIdPixiv(idPixiv);
	}

	@Serialize(ResponseUpdatedPixivDto)
	@Put('/update/:id')
	updatePixiv(
		@Body() updatePixivDto: UpdatePixivDto,
		@Param('id', ParseIntPipe) id: number,
	) {
		return this.pixivService.updatePixiv(id, updatePixivDto);
	}

	@Get()
	findPixiv(
		@Query('page', ParseIntPipe) page: number,
		@Query('limit', ParseIntPipe) limit: number,
	) {
		return this.pixivService.findPixiv(page, limit);
	}

	@Get('/:id')
	getPixivByPK(@Param('id', ParseIntPipe) id: number) {
		return this.pixivService.getById(id);
	}
}
