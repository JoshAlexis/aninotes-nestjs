import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TagsModule } from '../src/tags/tags.module';
import { mockedTag } from '../src/utils/mocks/tagsMocks';
import * as request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';

describe('TagsController (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let tagId;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [TagsModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		prisma = moduleFixture.get(PrismaService);
		await prisma.pixivTag.deleteMany();
		await prisma.tag.deleteMany();
	});

	beforeEach(async () => {
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	describe('CRUD tags', () => {
		it('POST /api/v1/tags/create', async () => {
			const response = await request(app.getHttpServer())
				.post('/tags/create')
				.send(mockedTag);
			expect(response.status).toBe(201);
			expect(response.body).toBeDefined();
			expect(response.body).toHaveProperty('name');
			expect(response.body).toHaveProperty('createdAt');
		});

		it('GET /api/v1/tags', async () => {
			const response = await request(app.getHttpServer()).get('/tags').query({
				page: 1,
				limit: 10,
			});
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('length');
			expect(response.body.length).toBeGreaterThan(0);
			tagId = response.body[0].id;
		});

		it('GET /api/v1/tags/:id', async () => {
			const response = await request(app.getHttpServer()).get(`/tags/${tagId}`);
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('id');
		});

		it('GET /api/v1/tags/name', async () => {
			const response = await request(app.getHttpServer())
				.get('/tags/name')
				.send({
					name: 'impact',
				});
			expect(response.status).toBe(200);
			expect(response.body).not.toHaveLength(0);
		});

		it('PUT /api/v1/tags/:id', async () => {
			const response = await request(app.getHttpServer())
				.put(`/tags/update/${tagId}`)
				.send({
					name: 'Honkai Impact',
				});
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('name');
			expect(response.body).toHaveProperty('updatedAt');
		});
	});
});
