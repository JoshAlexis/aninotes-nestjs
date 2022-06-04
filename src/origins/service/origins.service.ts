import { Injectable } from '@nestjs/common';
import { Origin } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOriginDto } from '../dto/createOrigin.dto';
import { UpdateOriginDto } from '../dto/updateOrigin.dto';

@Injectable()
export class OriginsService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(data: CreateOriginDto): Promise<Origin> {
		const createdOrigin = await this.prismaService.origin.create({
			data: {
				name: data.name,
			},
		});

		return createdOrigin;
	}

	async update(id: number, data: UpdateOriginDto): Promise<Origin> {
		const updatedOrigin = await this.prismaService.origin.update({
			data: {
				name: data.name,
			},
			where: {
				id,
			},
		});

		return updatedOrigin;
	}

	async fetchAll(): Promise<Origin[]> {
		const origins = await this.prismaService.origin.findMany();
		return origins;
	}
}
