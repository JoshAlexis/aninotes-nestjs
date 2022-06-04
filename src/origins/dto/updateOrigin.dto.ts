import { IsNotEmpty, IsString } from 'class-validator';

// export type UpdateOriginDto = CreateOriginDto;
export class UpdateOriginDto {
	@IsNotEmpty()
	@IsString()
	name: string;
}
