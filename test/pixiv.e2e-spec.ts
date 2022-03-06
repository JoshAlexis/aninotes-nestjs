import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PixivModule } from '../src/pixiv/pixiv.module';

describe('PixivController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [PixivModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	it('/api/v1/pixiv/ (GET)', async () => {
		return await request(app.getHttpServer())
			.get('/pixiv')
			.expect(200)
			.expect('Pixiv item');
	});
});
