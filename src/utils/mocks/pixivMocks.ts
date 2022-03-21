export const mockedPixiv = {
	id: 1,
	idPixiv: 14764274,
	pixivName: 'GAMBE@',
	favorite: 'F',
	quality: 4,
	link: 'https://www.pixiv.net/member_illust.php?id=14764274',
	tags: [3, 5, 7],
};

const mockedPixivList = [
	{
		id: 1,
		idPixiv: 14764274,
		pixivName: 'GAMBE@',
		favorite: 'F',
		quality: 4,
		link: 'https://www.pixiv.net/member_illust.php?id=14764274',
		tags: [3, 5, 7],
	},
	{
		id: 1,
		idPixiv: 14764274,
		pixivName: 'GAMBE@',
		favorite: 'F',
		quality: 4,
		link: 'https://www.pixiv.net/member_illust.php?id=14764274',
		tags: [3, 5, 7],
	},
];

export const mockedPixivService = {
	findPixiv: jest.fn().mockResolvedValue(mockedPixivList),
	createPixiv: jest.fn().mockResolvedValue(mockedPixiv),
};
