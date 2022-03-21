import { Test, TestingModule } from '@nestjs/testing';
import { mockedPixiv, mockedPixivService } from '../../utils/mocks/pixivMocks';
import { PixivService } from '../services/pixiv.service';
import { PixivController } from './pixiv.controller';

describe('PixivController', () => {
	let controller: PixivController;
	let service: PixivService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PixivController],
			providers: [
				{
					provide: PixivService,
					useValue: mockedPixivService,
				},
			],
		}).compile();

		controller = module.get<PixivController>(PixivController);
		service = module.get<PixivService>(PixivService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should call create pixiv', () => {
		expect(controller.create(mockedPixiv)).not.toEqual({});
		expect(service.createPixiv).toHaveBeenCalledWith(mockedPixiv);
	});

	it('should get a list of pixiv', async () => {
		expect(await controller.findPixiv(1, 10)).not.toHaveLength(0);
		expect(service.findPixiv).toHaveBeenCalledWith();
	});
});
