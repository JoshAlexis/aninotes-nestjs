import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CreateTagDto } from '../dto/createTag.dto';
import { TagDto } from '../dto/tag.dto';
import { TagsService } from '../services/tags.service';

@Controller({
	path: 'tags',
	version: '1',
})
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@Serialize(TagDto)
	@Post('/create')
	createTag(@Body() createTagDto: CreateTagDto) {
		return this.tagsService.createTag(createTagDto);
	}

	@Get('/:id')
	findTagById(@Param('id', ParseIntPipe) id: number) {
		return this.tagsService.findOneById(id);
	}

	@Get('/:name')
	findTagsByName(@Param('name') name: string) {
		return this.tagsService.findTagsByName(name);
	}

	@Get()
	getTags(
		@Query('page', ParseIntPipe) page: number,
		@Query('limit', ParseIntPipe) limit: number,
	) {
		return this.tagsService.getTags(page, limit);
	}

	@Put('/update/:id')
	updateTag(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateTagDto: CreateTagDto,
	) {
		return this.tagsService.updateTag(id, updateTagDto);
	}
}
