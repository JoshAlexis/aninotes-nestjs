import { Pixiv } from '@prisma/client';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	ParseIntPipe,
	Post,
	Query,
} from '@nestjs/common';
import { CreatePixivDTO } from '../dto/createPixiv.dto';
import { PixivService } from '../services/pixiv.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pixiv')
@Controller('pixiv')
export class PixivController {
	constructor(private readonly pixivService: PixivService) {}

	@Get()
	async findPixiv(
		@Query('page', ParseIntPipe) page: number,
		@Query('limit', ParseIntPipe) limit: number,
	): Promise<Pixiv[]> {
		return await this.pixivService.findPixiv(page, limit);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createPixivDTO: CreatePixivDTO) {
		return await this.pixivService.createPixiv(createPixivDTO);
	}
}
