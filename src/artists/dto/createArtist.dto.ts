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
	@IsString()
	origin: string;

	@IsNotEmpty()
	@IsArray()
	@ArrayNotEmpty()
	@IsNumber({}, { each: true })
	tags: number[];
}
