export type TagItem = {
	id: number;
	name: string;
};

export interface TagItemResponse {
	idPixivTag: number;
	idTag: number;
	name: string;
}

export class PixivDto {
	id: number;
	idPixiv: number;
	favorite: number;
	pixivName: string;
	link: string;
	quality: number;
	tags: TagItemResponse[];
}
