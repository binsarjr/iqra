import { compile } from 'mdsvex'
import { getRandomSurah } from '../lib/server/quran-surah'
import type { PageServerLoad } from './$types'

const getRandom = () => {
	const lists = [getRandomSurah];
	return lists[Math.floor(Math.random() * lists.length)]();
};

export const load: PageServerLoad = async () => {
	const render = async () => {
		let content = await getRandom();
		const compiled = await compile(content);
		return compiled?.code;
	};
	return {
		content: render()
	};
};
