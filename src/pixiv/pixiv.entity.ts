import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pixiv')
export class Pixiv {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	idPixiv: number;

	@Column()
	pixivName: string;

	@Column({
		type: 'varchar',
		length: 3,
	})
	favorite: string;

	@Column()
	quality: number;

	@Column()
	link: string;
}
