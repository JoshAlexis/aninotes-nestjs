import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PixivModule } from '../src/pixiv/pixiv.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TagsModule } from '../src/tags/tags.module';
import { mockedPixiv } from '../src/utils/mocks/pixivMocks';
import { mockedTag } from '../src/utils/mocks/tagsMocks';

describe('PixivController (e2e)', () => {
	let app: INestApplication;
	let appTag: INestApplication;
	let prisma: PrismaService;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [PixivModule],
		}).compile();

		const moduleTag: TestingModule = await Test.createTestingModule({
			imports: [TagsModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		appTag = moduleTag.createNestApplication();
		prisma = moduleFixture.get(PrismaService);
		await prisma.pixivTag.deleteMany();
		await prisma.pixiv.deleteMany();
	});

	beforeEach(async () => {
		await appTag.init();
		await app.init();
	});

	afterEach(async () => {
		await appTag.close();
		await app.close();
	});

	describe('CRUD Pixiv', () => {
		it('POST /api/v1/pixiv/create', async () => {
			const responseTag = await request(appTag.getHttpServer())
				.post('/tags/create')
				.send(mockedTag);
			expect(responseTag.status).toBe(201);
			expect(responseTag.body).toHaveProperty('id');
			const idTag = responseTag.body.id;

			mockedPixiv.tags = [idTag];
			console.log(mockedPixiv);
			const responsePixiv = await request(app.getHttpServer())
				.post('/pixiv/create')
				.send(mockedPixiv);
			expect(responsePixiv.status).toBe(201);
			expect(responsePixiv.body).toHaveProperty('id');
		});

		it('GET /api/v1/pixiv/', async () => {
			return await request(app.getHttpServer())
				.get('/pixiv')
				.query({
					page: 1,
					limit: 10,
				})
				.expect(200);
		});

		it('GET /api/v1/pixiv/idPixiv/:idPixiv', async () => {
			const response = await request(app.getHttpServer()).get(
				`/pixiv/idPixiv/${mockedPixiv.idPixiv}`,
			);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('id');
		});
	});
});
