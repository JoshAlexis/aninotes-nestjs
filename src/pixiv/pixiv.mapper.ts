import { Pixiv } from '@prisma/client';
import { flatArrayObj } from '../flatObject.util';
import { CreatePixivDTO } from './dto/createPixiv.dto';
import { PixivDto, TagItem } from './dto/pixiv.dto';
import { PixivItem, TagsList } from './services/pixiv.service';

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

	static toPixivDto(pixiv: Pixiv & TagsList) {
		let responsePixiv: PixivDto = {} as PixivDto;

		const flattenTags = flatArrayObj(pixiv.tags);

		const responseTags: TagItem[] = [];

		for (const tag of flattenTags) {
			const tagItem: TagItem = {} as TagItem;

			tagItem.id = tag['tag.id'];
			tagItem.name = tag['tag.name'];

			responseTags.push(tagItem);
		}

		responsePixiv = {
			...pixiv,
			tags: responseTags,
		};

		return responsePixiv;
	}

	static toPixivList(pixivItems: PixivItem[]) {
		const pixivList: PixivDto[] = [];

		for (const pixivItem of pixivItems) {
			let pixivDto: PixivDto = {} as PixivDto;

			const flattedTags = flatArrayObj(pixivItem.tags);
			const responseTags: TagItem[] = [];

			for (const tag of flattedTags) {
				const tagItem: TagItem = {} as TagItem;

				tagItem.id = tag['tag.id'];
				tagItem.name = tag['tag.name'];

				responseTags.push(tagItem);
			}

			pixivDto = {
				...pixivItem,
				tags: responseTags,
			};

			pixivList.push(pixivDto);
		}

		return pixivList;
	}
}
