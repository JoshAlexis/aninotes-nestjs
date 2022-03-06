import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pixiv } from '../pixiv.entity';
import { PixivService } from './pixiv.service';

describe('PixivService', () => {
	let service: PixivService;
	let pixivRepository: Repository<Pixiv>;
	const PIXIV_REPOSITORY_TOKEN = getRepositoryToken(Pixiv);

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PixivService,
				{
					provide: PIXIV_REPOSITORY_TOKEN,
					useValue: {
						save: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<PixivService>(PixivService);
		pixivRepository = module.get<Repository<Pixiv>>(PIXIV_REPOSITORY_TOKEN);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('pixivRepository sould be defined', () => {
		expect(pixivRepository).toBeDefined();
	});
});
