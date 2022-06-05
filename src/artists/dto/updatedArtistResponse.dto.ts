import { Expose } from 'class-transformer';

export class UpdatedArtistResponseDto {
	@Expose()
	id: number;

	@Expose()
	name: string;
}
