import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from '../dto/createTag.dto';
import { TagsMapper } from '../tags.mapper';

@Injectable()
export class TagsService {
	constructor(private readonly prismaService: PrismaService) {}

	createTag(createTagDto: CreateTagDto): Promise<Tag> {
		return this.prismaService.tag.create({
			data: TagsMapper.toTagPrisma(createTagDto),
		});
	}

	findOneById(id: number) {
		const tag: CreateTagDto = {} as CreateTagDto;
		return tag;
	}

	findTagsByName(name: string) {
		return '';
	}

	getTags(page: number, limit: number) {
		return '';
	}

	updateTag(id: number, updateTagDto: CreateTagDto) {
		return '';
	}
}
