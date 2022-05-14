import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseTagDto {
	@ApiProperty({
		description: 'The id of the tag',
		example: 1,
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'The name of the tag created',
		example: 'Genshin Impact',
	})
	@Expose()
	name: string;

	@ApiProperty({
		description: 'The date of creation (timestamp with no zone)',
		example: '2022-04-02T22:07:17.408Z',
	})
	@Expose()
	createdAt: string;
}
