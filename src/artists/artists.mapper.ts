import { Artist } from '@prisma/client';
import { ConnectTag } from '../common/tagsId.definition';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdatedArtistResponseDto } from './dto/updatedArtistResponse.dto';

export class ArtistsMapper {
	static toArtistPrisma(createArtistDto: CreateArtistDto) {
		const artist: Artist = {} as Artist;

		Object.assign(artist, createArtistDto);

		return artist;
	}

	static mapIdToTagsIdList(tags: number[]) {
		const listConnectTag = tags.map(
			(tagId) =>
				({
					tag: {
						connect: {
							id: tagId,
						},
					},
				} as ConnectTag),
		);
		return listConnectTag;
	}

	static mapToUpdatedResponse(updatedArtist: Artist) {
		const response: UpdatedArtistResponseDto = {} as UpdatedArtistResponseDto;

		Object.assign(response, updatedArtist);

		return response;
	}
}
