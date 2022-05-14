import { Injectable } from '@nestjs/common';
import { Pixiv, PixivTag } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePixivDTO } from '../dto/createPixiv.dto';
import { TagItem } from '../dto/pixiv.dto';
import { UpdatePixivDto } from '../dto/updatePixiv.dto';
import { UpdatePixivTagDto } from '../dto/updatePixivTag.dto';
import { PixivMapper } from '../pixiv.mapper';

export type TagsList = {
	tags: {
		id: number;
		tag: TagItem;
	}[];
};

export interface PixivItem {
	id: number;
	idPixiv: number;
	favorite: number;
	pixivName: string;
	link: string;
	quality: number;
	tags: {
		tag: {
			id: number;
			name: string;
		};
	}[];
}

@Injectable()
export class PixivService {
	constructor(private readonly prismaService: PrismaService) {}

	async findPixiv(page: number, limit: number): Promise<PixivItem[]> {
		const skip = (page - 1) * limit;
		const pixivList = await this.prismaService.pixiv.findMany({
			skip,
			take: limit,
			select: {
				id: true,
				idPixiv: true,
				favorite: true,
				pixivName: true,
				link: true,
				quality: true,
				tags: {
					select: {
						id: true,
						tag: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
		});
		return pixivList;
	}

	async createPixiv(createPixivDTO: CreatePixivDTO): Promise<Pixiv> {
		const createdPixiv = await this.prismaService.pixiv.create({
			data: {
				...PixivMapper.toPixivPrisma(createPixivDTO),
				tags: {
					create: PixivMapper.toConnectTags(createPixivDTO).map((idTag) => ({
						tag: {
							connect: {
								id: idTag.id,
							},
						},
					})) as any,
				},
			},
		});
		return createdPixiv;
	}

	async getByIdPixiv(idPixiv: number): Promise<Pixiv & TagsList> {
		const pixiv = await this.prismaService.pixiv.findFirst({
			where: {
				idPixiv,
			},
			include: {
				tags: {
					select: {
						id: true,
						tag: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
		});
		return pixiv;
	}

	async getById(id: number): Promise<Pixiv & TagsList> {
		const pixiv = await this.prismaService.pixiv.findUnique({
			where: {
				id,
			},
			include: {
				tags: {
					select: {
						id: true,
						tag: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
		});
		return pixiv;
	}

	async updatePixiv(id: number, updatePixivDto: UpdatePixivDto) {
		const updatedPixiv = await this.prismaService.pixiv.update({
			data: updatePixivDto,
			where: {
				id,
			},
		});

		return updatedPixiv;
	}

	async updatePixivTag(
		pixivId: number,
		updatePixivTagDto: UpdatePixivTagDto,
	): Promise<PixivTag> {
		if (updatePixivTagDto.action === 'add') {
			const updatedTag = await this.prismaService.pixivTag.create({
				data: {
					pixivId,
					tagId: updatePixivTagDto.tagId,
				},
			});
			return updatedTag;
		} else if (updatePixivTagDto.action === 'remove') {
			const updatedTag = await this.prismaService.pixivTag.delete({
				where: {
					id: updatePixivTagDto.pixivTagId,
				},
			});
			return updatedTag;
		}
	}
}
