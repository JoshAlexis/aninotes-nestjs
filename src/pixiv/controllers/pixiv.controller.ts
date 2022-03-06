import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { CreatePixivDTO } from '../dto/createPixiv.dto';
import { PixivService } from '../services/pixiv.service';

@Controller('pixiv')
export class PixivController {
	constructor(private readonly pixivService: PixivService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createPixivDTO: CreatePixivDTO) {
		return await this.pixivService.createPixiv(createPixivDTO);
	}
}
