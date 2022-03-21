import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { PixivService } from './pixiv.service';

describe('PixivService', () => {
	let service: PixivService;
	let prismaService: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PixivService,
				{
					provide: PrismaService,
					useValue: {
						save: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<PixivService>(PixivService);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('Prisma service should be defined', () => {
		expect(prismaService).toBeDefined();
	});
});
