import { Pixiv } from '@prisma/client';
import { CreatePixivDTO } from './dto/createPixiv.dto';

type TagId = {
	id: number;
};

export class PixivMapper {
	static toPixivPrisma(createTagDto: CreatePixivDTO) {
		const pixiv: Pixiv = {} as Pixiv;

		Object.assign(pixiv, createTagDto);

		return pixiv;
	}

	static toConnectTags(createPixivDTO: CreatePixivDTO) {
		const tagsId = createPixivDTO.tags.map(
			(tagId): TagId => ({
				id: tagId,
			}),
		);
		return tagsId;
	}
}
