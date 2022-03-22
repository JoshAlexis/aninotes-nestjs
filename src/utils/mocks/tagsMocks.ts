export const mockedTag = {
	name: 'Genshin Impact',
};

const mockedListTags = [
	{
		name: 'Genshin Impact',
	},
	{
		name: 'Arknights',
	},
];

export const mockedTagsService = {
	createTag: jest.fn().mockReturnValue('created'),
	findOneById: jest.fn().mockReturnValue(mockedTag),
	findByName: jest.fn().mockReturnValue(mockedListTags),
	getTags: jest.fn().mockReturnValue(mockedListTags),
	updateTag: jest.fn().mockReturnValue(mockedTag),
};
