import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
	@ApiProperty({
		description: 'The name of the new tag',
		example: 'Genshin Impact',
	})
	@IsString()
	@IsNotEmpty()
	name: string;
}
