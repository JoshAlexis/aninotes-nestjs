import { Test, TestingModule } from '@nestjs/testing';
import { mockedTagsService, mockedTag } from '../../utils/mocks/tagsMocks';
import { TagsService } from '../services/tags.service';
import { TagsController } from './tags.controller';

describe('TagsController', () => {
	let controller: TagsController;
	let service: TagsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: TagsService,
					useValue: mockedTagsService,
				},
			],
			controllers: [TagsController],
		}).compile();

		controller = module.get<TagsController>(TagsController);
		service = module.get<TagsService>(TagsService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('calling createTag', () => {
		expect(controller.createTag(mockedTag)).not.toEqual(null);
		expect(service.createTag).toBeCalledWith(mockedTag);
	});

	it('calling findTagById', () => {
		expect(controller.findTagById(1)).not.toEqual(null);
		expect(service.findOneById).toBeCalledWith(1);
	});

	it('calling findTagsByName', () => {
		expect(controller.getTags(1, 10)).not.toHaveLength(0);
		expect(service.getTags).toBeCalledWith(1, 10);
	});

	it('calling updateTag', () => {
		expect(controller.updateTag(1, mockedTag)).not.toEqual(null);
		expect(service.updateTag).toBeCalledWith(1, mockedTag);
	});
});
