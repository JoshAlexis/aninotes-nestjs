import {
	CallHandler,
	ExecutionContext,
	NestInterceptor,
	UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassContructor {
	new (...args: unknown[]): unknown;
}

export function Serialize(dto: ClassContructor) {
	return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
	constructor(private readonly dto: ClassContructor) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(
			map((data: unknown) => {
				return plainToInstance(this.dto, data, {
					excludeExtraneousValues: true,
				});
			}),
		);
	}
}
