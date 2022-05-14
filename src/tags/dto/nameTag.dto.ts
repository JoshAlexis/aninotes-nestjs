import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NameTagDto {
	@ApiProperty({
		description: 'The tag name to found',
		example: 'Genshin Impact',
	})
	@IsNotEmpty()
	@IsString()
	name: string;
}
