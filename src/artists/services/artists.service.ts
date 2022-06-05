import { Injectable } from '@nestjs/common';
import { Artist, ArtistTag } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ArtistsMapper } from '../artists.mapper';
import { CreateArtistDto } from '../dto/createArtist.dto';
import { UpdateArtistDto } from '../dto/updateArtist.dto';
import { UpdateArtistTagDto } from '../dto/updateArtistTag.dto';

@Injectable()
export class ArtistsService {
	constructor(private readonly prismasService: PrismaService) {}

	async createArtist(data: CreateArtistDto): Promise<Artist> {
		const createdArtist = await this.prismasService.artist.create({
			data: {
				...ArtistsMapper.toArtistPrisma(data),
				tags: {
					create: ArtistsMapper.mapIdToTagsIdList(data.tags) as any[],
				},
				origin: {
					connect: {
						id: data.origin,
					},
				},
			},
		});

		return createdArtist;
	}

	async updateArtis(id: number, data: UpdateArtistDto): Promise<Artist> {
		const updateArtist = this.prismasService.artist.update({
			data: {
				name: data.name,
			},
			where: {
				id,
			},
		});

		const disconnectOrigin = this.prismasService.artist.update({
			data: {
				origin: {
					disconnect: true,
				},
			},
			where: {
				id,
			},
		});

		const connectNewOrigin = this.prismasService.artist.update({
			data: {
				origin: {
					connect: {
						id: data.origin,
					},
				},
			},
			where: {
				id,
			},
		});

		const [artists, disconnect, connect] =
			await this.prismasService.$transaction([
				updateArtist,
				disconnectOrigin,
				connectNewOrigin,
			]);

		return artists;
	}

	async fetchAll(): Promise<Artist[]> {
		const artists = await this.prismasService.artist.findMany({
			include: {
				origin: true,
				tags: true,
			},
		});
		return artists;
	}

	async updateTags(id: number, data: UpdateArtistTagDto): Promise<ArtistTag> {
		if (data.action === 'add') {
			const newTag = await this.prismasService.artistTag.create({
				data: {
					artistId: id,
					tagId: data.tagId,
				},
			});

			return newTag;
		}

		const deletedTag = await this.prismasService.artistTag.delete({
			where: {
				id: data.artistTagId,
			},
		});

		return deletedTag;
	}
}
