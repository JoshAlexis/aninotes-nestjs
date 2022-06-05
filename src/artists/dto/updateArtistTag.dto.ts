import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateArtistTagDto {
	@IsNotEmpty()
	@IsNumber()
	tagId: number;

	@IsNotEmpty()
	@IsNumber()
	artistTagId: number;

	@IsNotEmpty()
	@IsString()
	action: string;
}
