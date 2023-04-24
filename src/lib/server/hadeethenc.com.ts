const getCategories = async () => {
	const resp = await fetch('https://hadeethenc.com/api/v1/categories/list/?language=id');
	const json: {
		id: string;
		title: string;
		hadeeths_count: string;
		parent_id?: string;
	}[] = await resp.json();
	return json;
};

export const getRandomHadeethenc = async () => {
	const categories = await getCategories();
	const category = categories[Math.floor(Math.random() * categories.length)];

	const url = `https://hadeethenc.com/api/v1/hadeeths/list/?language=id&category_id=${category.id}&page=1&per_page=10000`;
	const resp = await fetch(url);
    const json:{
        data: {
            id:number
        }[]
    } = await resp.json()

    const id = json.data[Math.floor(Math.random() * json.data.length)].id

    const resp2 = await fetch(`https://hadeethenc.com/api/v1/hadeeths/one/?language=id&id=${id}`)
    const json2: {
        id:string
        title:string
        hadeeth:string
        attribution:string
        grade:string
        explanation:string
    } = await resp2.json()



    const text=`
## ${json2.title}

**Grade:** ${json2.grade}

**Attribution:** ${json2.attribution}

${json2.hadeeth}

## Penjelasan
${json2.explanation}


    `.trim()
    return text

};
