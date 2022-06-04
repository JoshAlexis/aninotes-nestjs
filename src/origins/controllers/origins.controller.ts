import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from '@nestjs/common';
import { Origin } from '@prisma/client';
import { CreateOriginDto } from '../dto/createOrigin.dto';
import { UpdateOriginDto } from '../dto/updateOrigin.dto';
import { OriginsService } from '../service/origins.service';

@Controller({
	path: 'origins',
	version: '1',
})
export class OriginsController {
	constructor(private readonly originsService: OriginsService) {}

	@Post('/create')
	createOrigin(@Body() data: CreateOriginDto): Promise<Origin> {
		return this.originsService.create(data);
	}

	@Put('/update/:id')
	updateOrigin(
		@Body() data: UpdateOriginDto,
		@Param('id', ParseIntPipe) id: number,
	): Promise<Origin> {
		return this.originsService.update(id, data);
	}

	@Get('/')
	findAll(): Promise<Origin[]> {
		return this.originsService.fetchAll();
	}
}
