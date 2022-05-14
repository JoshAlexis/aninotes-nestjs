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
import { UpdatePixivDto } from '../dto/updatePixiv.dto';
import { PixivMapper } from '../pixiv.mapper';
import { PixivUpdatedResponseDto } from '../dto/pixivUpdatedResponse.dto';
import { UpdatePixivTagDto } from '../dto/updatePixivTag.dto';

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
	async findPixivByIdPixiv(@Param('idPixiv', ParseIntPipe) idPixiv: number) {
		const pixiv = await this.pixivService.getByIdPixiv(idPixiv);
		return PixivMapper.toPixivDto(pixiv);
	}

	@Serialize(PixivUpdatedResponseDto)
	@Put('/update/:id')
	updatePixiv(
		@Body() updatePixivDto: UpdatePixivDto,
		@Param('id', ParseIntPipe) id: number,
	) {
		return this.pixivService.updatePixiv(id, updatePixivDto);
	}

	@Put('/update/tags/:id')
	updatePixivTag(
		@Body() updatePixivTagDto: UpdatePixivTagDto,
		@Param('id', ParseIntPipe) id: number,
	) {
		return this.pixivService.updatePixivTag(id, updatePixivTagDto);
	}

	@Get()
	async findPixiv(
		@Query('page', ParseIntPipe) page: number,
		@Query('limit', ParseIntPipe) limit: number,
	) {
		const pixivList = await this.pixivService.findPixiv(page, limit);
		return PixivMapper.toPixivList(pixivList);
	}

	@Get('/:id')
	async getPixivByPK(@Param('id', ParseIntPipe) id: number) {
		const pixiv = await this.pixivService.getById(id);
		return PixivMapper.toPixivDto(pixiv);
	}
}
