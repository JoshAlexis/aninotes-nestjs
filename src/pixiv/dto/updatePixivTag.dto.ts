import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePixivTagDto {
	@IsNotEmpty()
	@IsNumber()
	tagId: number;

	@IsNotEmpty()
	@IsNumber()
	pixivTagId: number;

	@IsNotEmpty()
	@IsString()
	action: string;
}
