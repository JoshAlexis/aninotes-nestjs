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
import {
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CreateTagDto } from '../dto/createTag.dto';
import { NameTagDto } from '../dto/nameTag.dto';
import { ResponseTagDto } from '../dto/responseTag.dto';
import { UpdatedTagDto } from '../dto/updatedTag.dto';
import { TagsService } from '../services/tags.service';

@ApiTags('Tags')
@Controller({
	path: 'tags',
	version: '1',
})
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@ApiOperation({
		summary: 'Creates a new tag',
		description: 'Creates a new tag and returns the tag created with the date',
	})
	@ApiBody({
		type: CreateTagDto,
	})
	@ApiCreatedResponse({
		description: 'Tag created sucessfully',
		type: ResponseTagDto,
	})
	@Serialize(ResponseTagDto)
	@Post('/create')
	createTag(@Body() createTagDto: CreateTagDto) {
		return this.tagsService.createTag(createTagDto);
	}

	@ApiOperation({
		summary: 'Gets tags by name',
		description:
			'Retrieves a list with the tags that matches the name indicated',
	})
	@ApiBody({
		type: NameTagDto,
	})
	@ApiOkResponse({
		description: 'List of tags',
	})
	@Get('/name')
	findTagsByName(@Body() nameTagDto: NameTagDto) {
		return this.tagsService.findTagsByName(nameTagDto);
	}

	@ApiOperation({
		summary: 'Gets all tags paginated',
	})
	@ApiOkResponse({
		description: 'List of tags',
	})
	@Get()
	getTags(
		@Query('page', ParseIntPipe) page: number,
		@Query('limit', ParseIntPipe) limit: number,
	) {
		return this.tagsService.getTags(page, limit);
	}

	@ApiOperation({
		description: 'Get tag by id',
	})
	@ApiOkResponse({
		description: 'A single tag',
		type: ResponseTagDto,
	})
	@Get('/:id')
	findTagById(@Param('id', ParseIntPipe) id: number) {
		return this.tagsService.findOneById(id);
	}

	@ApiOperation({
		description: 'Updates a tag',
	})
	@ApiBody({
		type: CreateTagDto,
	})
	@ApiOkResponse({
		description: 'Tag updated sucessfully',
		type: UpdatedTagDto,
	})
	@Serialize(UpdatedTagDto)
	@Put('/update/:id')
	updateTag(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateTagDto: CreateTagDto,
	) {
		return this.tagsService.updateTag(id, updateTagDto);
	}
}
