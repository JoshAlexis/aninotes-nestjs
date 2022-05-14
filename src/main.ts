import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(helmet());
	app.enableCors();
	app.setGlobalPrefix('api');
	app.enableVersioning({
		type: VersioningType.URI,
	});
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			forbidUnknownValues: true,
			validationError: {
				value: false,
			},
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('Aninotes')
		.setDescription('Aninotes API')
		.setVersion('1.0')
		.addTag('Tags')
		.addTag('Pixiv')
		.addTag('Illustrators')
		.addTag('Sauces')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	await app.listen(3000);
}
bootstrap();
