import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdatedTagDto {
	@ApiProperty({
		description: 'The name tag updated',
	})
	@Expose()
	name: string;

	@ApiProperty({
		description: 'The date of update',
	})
	@Expose()
	updatedAt: string;
}
