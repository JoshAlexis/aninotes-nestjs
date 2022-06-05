import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateArtistDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	origin: number;
}
