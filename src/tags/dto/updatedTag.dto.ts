import { Expose } from 'class-transformer';

export class UpdatedTagDto {
	@Expose()
	name: string;

	@Expose()
	updatedAt: string;
}
