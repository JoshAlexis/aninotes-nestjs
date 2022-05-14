import { Tag } from '@prisma/client';
import { CreateTagDto } from './dto/createTag.dto';

export class TagsMapper {
	static toTagPrisma(createTagDto: CreateTagDto) {
		const tag: Tag = {} as Tag;

		tag.name = createTagDto.name;

		return tag;
	}
}
