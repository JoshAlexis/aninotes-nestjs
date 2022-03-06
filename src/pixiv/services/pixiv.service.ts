import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePixivDTO } from '../dto/createPixiv.dto';
import { Pixiv } from '../pixiv.entity';
import { PixivMapper } from '../pixiv.mapper';

@Injectable()
export class PixivService {
	constructor(
		@InjectRepository(Pixiv)
		private readonly pixivRepository: Repository<Pixiv>,
	) {}

	createPixiv(createPixivDTO: CreatePixivDTO): Promise<Pixiv> {
		const pixiv = PixivMapper.toPixiv(createPixivDTO);
		return this.pixivRepository.save(pixiv);
	}
}
