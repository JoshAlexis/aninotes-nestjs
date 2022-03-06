import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pixiv } from '../pixiv.entity';
import { PixivService } from '../services/pixiv.service';
import { PixivController } from './pixiv.controller';

describe('PixivController', () => {
	let controller: PixivController;

	const mockedPixiv = {
		id: 1,
		idPixiv: 14764274,
		pixivName: 'GAMBE@',
		favorite: 'F',
		quality: 4,
		link: 'https://www.pixiv.net/member_illust.php?id=14764274',
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PixivController],
			providers: [
				PixivService,
				{
					provide: getRepositoryToken(Pixiv),
					useValue: {
						create: jest.fn().mockResolvedValue(mockedPixiv),
					},
				},
			],
		}).compile();

		controller = module.get<PixivController>(PixivController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
