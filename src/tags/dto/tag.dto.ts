import { Expose } from 'class-transformer';

export class TagDto {
	@Expose()
	name: string;

	@Expose()
	createdAt: string;
}
