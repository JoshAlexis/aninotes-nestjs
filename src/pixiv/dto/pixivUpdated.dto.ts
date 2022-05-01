import { Expose } from 'class-transformer';

export class PixivUpdatedDto {
	@Expose()
	id: number;

	@Expose()
	idPixiv: number;

	@Expose()
	pixivName: string;

	@Expose()
	link: string;

	@Expose()
	favorite: number;

	@Expose()
	quality: number;
}
