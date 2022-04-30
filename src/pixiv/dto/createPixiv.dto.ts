import {
	IsOptional,
	IsNotEmpty,
	IsArray,
	ArrayNotEmpty,
	IsNumber,
	IsString,
} from 'class-validator';
export class CreatePixivDTO {
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

	@IsNotEmpty()
	@IsArray()
	@ArrayNotEmpty()
	@IsNumber({}, { each: true })
	tags: number[];
}
