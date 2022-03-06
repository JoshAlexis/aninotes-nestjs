import { CreatePixivDTO } from './dto/createPixiv.dto';
import { Pixiv } from './pixiv.entity';

export class PixivMapper {
	static toPixiv(createPixivDTO: CreatePixivDTO): Pixiv {
		const pixivEntity: Pixiv = new Pixiv();

		pixivEntity.idPixiv = createPixivDTO.idPixiv;
		pixivEntity.pixivName = createPixivDTO.pixivName;
		pixivEntity.favorite = createPixivDTO.favorite;
		pixivEntity.quality = createPixivDTO.quality;
		pixivEntity.link = createPixivDTO.link;

		return pixivEntity;
	}
}
