import { Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ArtistsMapper } from '../artists.mapper';
import { CreateArtistDto } from '../dto/createArtist.dto';
import { UpdateArtistDto } from '../dto/updateArtist.dto';

@Injectable()
export class ArtistsService {
	constructor(private readonly prismasService: PrismaService) {}

	async createArtist(data: CreateArtistDto): Promise<Artist> {
		const createdArtist = await this.prismasService.artist.create({
			data: {
				...ArtistsMapper.toArtistPrisma(data),
				tags: {
					connect: ArtistsMapper.mapIdToTagsIdList(data.tags) as any[],
				},
			},
		});

		return createdArtist;
	}

	async updateArtis(id: number, data: UpdateArtistDto): Promise<Artist> {
		const updatedArtist = await this.prismasService.artist.update({
			data,
			where: {
				id,
			},
		});

		return updatedArtist;
	}
}
