import {
	ArrayNotEmpty,
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsString,
} from 'class-validator';

export class CreateArtistDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	origin: number;

	@IsNotEmpty()
	@IsArray()
	@ArrayNotEmpty()
	@IsNumber({}, { each: true })
	tags: number[];
}
