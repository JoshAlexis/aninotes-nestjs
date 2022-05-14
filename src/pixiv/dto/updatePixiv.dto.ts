import { IsOptional, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePixivDto {
	@IsNotEmpty()
	@IsNumber()
	idPixiv: number;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	pixivName?: string;

	@IsNotEmpty()
	@IsNumber()
	favorite: number;

	@IsNotEmpty()
	@IsNumber()
	quality: number;

	@IsNotEmpty()
	@IsString()
	link: string;
}
