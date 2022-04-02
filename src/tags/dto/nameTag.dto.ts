import { IsNotEmpty, IsString } from 'class-validator';

export class NameTagDto {
	@IsNotEmpty()
	@IsString()
	name: string;
}
