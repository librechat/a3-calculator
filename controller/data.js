const characters = [
	'佐久間咲也', '碓冰真澄', '皆木綴', '茅崎至', '希特隆',
	'皇天馬', '瑠璃川幸', '向坂椋', '斑鳩三角', '三好一成',
	'攝津萬里', '兵頭十座', '七尾太一', '伏見臣', '古市左京',
	'月岡紬', '高遠丞', '御影密', '有栖川譽', '雪白東'
];
const redskill = [
	{
		name: '新生秋組',
		buff: 1.5,
		members: ['攝津萬里', '兵頭十座', '七尾太一', '伏見臣', '古市左京']
	},
	{
		name: '組長們',
		buff: 1.4,
		members: ['佐久間咲也','皇天馬','攝津萬里','月岡紬']
	},
	{
		name: '團內足球社',
		buff: 1.3,
		members: ['皆木綴','伏見臣','高遠丞']
	},
	{
		name: '歌舞伎愛好者',
		buff: 1.3,
		members: ['希特隆','瑠璃川幸','高遠丞']
	},
	{
		name: '歐華高中組',
		buff: 1.3,
		members: ['皇天馬','兵頭十座','七尾太一']
	},
	{
		name: '痴心男孩',
		buff: 1.2,
		members: ['佐久間咲也','兵頭十座']
	},
	{
		name: '雙親在國外',
		buff: 1.2,
		members: ['皇天馬','碓冰真澄']
	},
	{
		name: '毒舌',
		buff: 1.2,
		members: ['碓冰真澄','瑠璃川幸']
	},
	{
		name: '電玩部',
		buff: 1.2,
		members: ['茅崎至','攝津萬里']
	},
	{
		name: '垃圾食物愛好者',
		buff: 1.2,
		members: ['茅崎至','七尾太一']
	},
	{
		name: '運動神經發達怪物',
		buff: 1.2,
		members: ['斑鳩三角','御影密']
	},
	{
		name: '青梅竹馬',
		buff: 1.2,
		members: ['月岡紬','高遠丞']
	}
];
const blueskill = [
	{
		name: '新生春組',
		buff: 1.5,
		members: ['佐久間咲也', '碓冰真澄', '皆木綴', '茅崎至', '希特隆']
	},
	{
		name: '新生冬組',
		buff: 1.5,
		members: ['月岡紬', '高遠丞', '御影密', '有栖川譽', '雪白東']
	},
	{
		name: '團內麻將社',
		buff: 1.4,
		members: ['希特隆','三好一成','古市左京','雪白東']
	},
	{
		name: '花咲學園組',
		buff: 1.3,
		members: ['佐久間咲也','碓冰真澄','攝津萬里']
	},
	{
		name: '孑然一身',
		buff: 1.3,
		members: ['佐久間咲也','御影密','雪白東']
	},
	{
		name: '一瞑大一寸',
		buff: 1.2,
		members: ['碓冰真澄','御影密']
	},
	{
		name: '葉星大學組',
		buff: 1.2,
		members: ['皆木綴','伏見臣']
	},
	{
		name: '擅長教人',
		buff: 1.2,
		members: ['茅崎至','月岡紬']
	},
	{
		name: '表兄弟',
		buff: 1.2,
		members: ['向坂椋','兵頭十座']
	},
	{
		name: 'G的洗禮',
		buff: 1.2,
		members: ['七尾太一','高遠丞']
	},
	{
		name: '前不良',
		buff: 1.2,
		members: ['古市左京','伏見臣']
	},
	{
		name: '最年長組',
		buff: 1.2,
		members: ['古市左京','雪白東']
	}
];
const yellowskill = [
	{
		name: '新生夏組',
		buff: 1.5,
		members: ['皇天馬', '瑠璃川幸', '向坂椋', '斑鳩三角', '三好一成']
	},
	{
		name: '甜食派',
		buff: 1.4,
		members: ['向坂椋','兵頭十座','御影密','雪白東']
	},
	{
		name: 'Trouble Makers',
		buff: 1.3,
		members: ['希特隆','斑鳩三角','有栖川譽']
	},
	{
		name: '少女漫畫同好會',
		buff: 1.3,
		members: ['向坂椋','三好一成','古市左京']
	},
	{
		name: '飛特族',
		buff: 1.3,
		members: ['斑鳩三角','月岡紬','雪白東']
	},
	{
		name: '目標是相聲巨星',
		buff: 1.2,
		members: ['皆木綴','希特隆']
	},
	{
		name: '團內文藝部',
		buff: 1.2,
		members: ['皆木綴','有栖川譽']
	},
	{
		name: '討厭魚卵',
		buff: 1.2,
		members: ['茅崎至','有栖川譽']
	},
	{
		name: '購物同伴',
		buff: 1.2,
		members: ['皇天馬','攝津萬里']
	},
	{
		name: '聖芙羅拉中學組',
		buff: 1.2,
		members: ['瑠璃川幸','向坂椋']
	},
	{
		name: '團內手工部',
		buff: 1.2,
		members: ['瑠璃川幸','伏見臣']
	},
	{
		name: '汪汪搭檔',
		buff: 1.2,
		members: ['三好一成','七尾太一']
	},
	{
		name: '藝術家氣質',
		buff: 1.2,
		members: ['三好一成','有栖川譽']
	}
];
module.exports = {
	characters,
	redskill,
	blueskill,
	yellowskill
};