import { compile } from 'mdsvex';
import { getRandomSurah } from '../lib/server/quran-surah';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async () => {
	const render = async () => {
		let text = '';
		text = await getRandomSurah();
		const compiled = await compile(text);
		return compiled?.code;
	};
	return {
		text: render()
	};
};
