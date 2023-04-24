import { compile } from 'mdsvex'
import { getRandomHadeethenc } from '../lib/server/hadeethenc.com'
import { getRandomSurah } from '../lib/server/quran-surah'
import type { PageServerLoad } from './$types'

const getRandom = () => {
	let lists = [getRandomHadeethenc,getRandomSurah];
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
