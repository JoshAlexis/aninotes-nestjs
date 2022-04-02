import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTagDto } from '../dto/createTag.dto';
import { NameTagDto } from '../dto/nameTag.dto';
import { TagsMapper } from '../tags.mapper';

@Injectable()
export class TagsService {
	constructor(private readonly prismaService: PrismaService) {}

	async createTag(createTagDto: CreateTagDto): Promise<Tag> {
		const createdTag = await this.prismaService.tag.create({
			data: TagsMapper.toTagPrisma(createTagDto),
		});
		return createdTag;
	}

	async findAll(): Promise<Tag[]> {
		const tags = await this.prismaService.tag.findMany();
		return tags;
	}

	async findOneById(id: number): Promise<Tag> {
		const tag = await this.prismaService.tag.findUnique({
			where: {
				id,
			},
		});
		return tag;
	}

	async findTagsByName(nameTagDto: NameTagDto) {
		const tags = await this.prismaService.tag.findMany({
			where: {
				name: {
					contains: nameTagDto.name,
					mode: 'insensitive',
				},
			},
		});
		return tags;
	}

	async getTags(page: number, limit: number) {
		const skip = (page - 1) * limit;
		const tags = await this.prismaService.tag.findMany({
			skip,
			take: limit,
		});
		return tags;
	}

	async updateTag(id: number, updateTagDto: CreateTagDto) {
		const tag = await this.prismaService.tag.update({
			where: {
				id,
			},
			data: TagsMapper.toTagPrisma(updateTagDto),
		});
		return tag;
	}
}
