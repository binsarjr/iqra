const getChapterInfo = async (chapter: number) => {
	const url = `https://api.quran.com/api/v3/chapters/${chapter}`;
	const resp = await fetch(url);
	const json: {
		chapter: {
			id: number;
			revelation_place: string;
			revelation_order: number;
			bismillah_pre: boolean;
			name_simple: string;
			name_complex: string;
			name_arabic: string;
			verses_count: number;
		};
	} = await resp.json();
	return json;
};

export const getRandomSurah = async () => {
	const surahId = Math.floor(Math.random() * 114) + 1;
	const url = `https://api.quran.com/api/v3/chapters/${surahId}/info?language=id`;

	const resp = await fetch(url);
	const json: {
		chapter_info: {
			short_text: string;
			text: string;
		};
	} = await resp.json();
	const info = await getChapterInfo(surahId);

	console.log(json, 'json');
	const text = `
**${info.chapter.name_complex} (${info.chapter.name_arabic})**

${json.chapter_info.short_text}

${json.chapter_info.text}


    `.trim();

	return text;
};
