import { Injectable } from '@nestjs/common';
import { Pixiv } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePixivDTO } from '../dto/createPixiv.dto';

@Injectable()
export class PixivService {
	constructor(private readonly prismaService: PrismaService) {}

	findPixiv(page: number, limit: number): Promise<Pixiv[]> {
		const skip = page * limit;
		return this.prismaService.pixiv.findMany({
			skip,
			take: limit,
		});
	}

	createPixiv(createPixivDTO: CreatePixivDTO) {
		const pixiv: Pixiv = {} as Pixiv;
		return this.prismaService.pixiv.create({
			data: pixiv,
		});
	}
}
