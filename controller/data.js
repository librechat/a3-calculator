const characters = [
	'佐久間 咲也', '碓冰 真澄', '皆木 綴', '茅崎 至', '希特隆',
	'皇 天馬', '瑠璃川 幸', '向坂 椋', '斑鳩 三角', '三好 一成',
	'攝津 萬里', '兵頭 十座', '七尾 太一', '伏見 臣', '古市 左京',
	'月岡 紬', '高遠 丞', '御影 密', '有栖川 譽', '雪白 東'
];
const group = [
	['佐久間 咲也', '碓冰 真澄', '皆木 綴', '茅崎 至', '希特隆'],
	['皇 天馬', '瑠璃川 幸', '向坂 椋', '斑鳩 三角', '三好 一成'],
	['攝津 萬里', '兵頭 十座', '七尾 太一', '伏見 臣', '古市 左京'],
	['月岡 紬', '高遠 丞', '御影 密', '有栖川 譽', '雪白 東']
];
const redskill = [
	{
		// bug from komoe
		name: '新生秋組',
		buff: 1.6,
		members: ['攝津 萬里', '兵頭 十座', '七尾 太一', '伏見 臣', '古市 左京']
	},
	{
		name: '組長們',
		buff: 1.36,
		members: ['佐久間 咲也','皇 天馬','攝津 萬里','月岡 紬']
	},
	{
		// bug from komoe
		name: '團內足球社',
		buff: 1.36,
		members: ['皆木 綴','伏見 臣','高遠 丞']
	},
	{
		name: '歌舞伎愛好者',
		buff: 1.24,
		members: ['希特隆','瑠璃川 幸','高遠 丞']
	},
	{
		name: '歐華高中組',
		buff: 1.24,
		members: ['皇 天馬','兵頭 十座','七尾 太一']
	},
	{
		name: '50m賽跑最佳紀錄',
		buff: 1.24,
		members: ['向坂 椋','御影 密','斑鳩 三角']
	},
	{
		name: '國外旅行狂熱者',
		buff: 1.12,
		members: ['三好 一成','雪白 東']
	},
	{
		name: '棉花糖供給',
		buff: 1.12,
		members: ['御影 密','有栖川 譽']
	},
	{
		name: '痴心男孩',
		buff: 1.12,
		members: ['佐久間 咲也','兵頭 十座']
	},
	{
		name: '雙親在國外',
		buff: 1.12,
		members: ['皇 天馬','碓冰 真澄']
	},
	{
		// bug from komoe
		name: '毒舌',
		buff: 1.24,
		members: ['碓冰 真澄','瑠璃川 幸']
	},
	{
		name: '電玩部',
		buff: 1.12,
		members: ['茅崎 至','攝津 萬里']
	},
	{
		name: '垃圾食物愛好者',
		buff: 1.12,
		members: ['茅崎 至','七尾 太一']
	},
	{
		name: '青梅竹馬',
		buff: 1.12,
		members: ['月岡 紬','高遠 丞']
	}
];
const blueskill = [
	{
		// bug from komoe
		name: '新生春組',
		buff: 1.6,
		members: ['佐久間 咲也', '碓冰 真澄', '皆木 綴', '茅崎 至', '希特隆']
	},
	{
		name: '新生冬組',
		buff: 1.48,
		members: ['月岡 紬', '高遠 丞', '御影 密', '有栖川 譽', '雪白 東']
	},
	{
		name: '團內麻將社',
		buff: 1.36,
		members: ['希特隆','三好 一成','古市 左京','雪白 東']
	},
	{
		name: '花咲學園組',
		buff: 1.24,
		members: ['佐久間 咲也','碓冰 真澄','攝津 萬里']
	},
	{
		// bug from komoe
		name: '孑然一身',
		buff: 1.36,
		members: ['佐久間 咲也','御影 密','雪白 東']
	},
	{
		name: '大人的飯糰俱樂部',
		buff: 1.24,
		members: ['斑鳩 三角','古市 左京','雪白 東']
	},
	{
		name: '夏組火藥庫',
		buff: 1.12,
		members: ['皇 天馬','瑠璃川 幸']
	},
	{
		name: '一瞑大一寸',
		buff: 1.12,
		members: ['碓冰 真澄','御影 密']
	},
	{
		name: '葉星大學組',
		buff: 1.12,
		members: ['皆木 綴','伏見 臣']
	},
	{
		name: '擅長教人',
		buff: 1.12,
		members: ['茅崎 至','月岡 紬']
	},
	{
		// bug from komoe
		name: '表兄弟',
		buff: 1.24,
		members: ['向坂 椋','兵頭 十座']
	},
	{
		name: 'G的洗禮',
		buff: 1.12,
		members: ['七尾 太一','高遠 丞']
	},
	{
		name: '前不良',
		buff: 1.12,
		members: ['古市 左京','伏見 臣']
	}
];
const yellowskill = [
	{
		// bug from komoe
		name: '新生夏組',
		buff: 1.6,
		members: ['皇 天馬', '瑠璃川 幸', '向坂 椋', '斑鳩 三角', '三好 一成']
	},
	{
		name: '甜食派',
		buff: 1.36,
		members: ['向坂 椋','兵頭 十座','御影 密','雪白 東']
	},
	{
		name: '聖芙羅拉組',
		buff: 1.24,
		members: ['瑠璃川 幸','向坂 椋','有栖川 譽']
	},
	{
		name: 'Trouble Makers',
		buff: 1.24,
		members: ['希特隆','斑鳩 三角','有栖川 譽']
	},
	{
		name: '少女漫畫同好會',
		buff: 1.24,
		members: ['向坂 椋','三好 一成','古市 左京']
	},
	{
		name: '飛特族',
		buff: 1.24,
		members: ['斑鳩 三角','月岡 紬','雪白 東']
	},
	{
		name: '滿開游泳俱樂部',
		buff: 1.24,
		members: ['佐久間 咲也','碓冰 真澄','高遠 丞']
	},
	{
		name: '目標是相聲巨星',
		buff: 1.12,
		members: ['皆木 綴','希特隆']
	},
	{
		name: '團內文藝部',
		buff: 1.12,
		members: ['皆木 綴','有栖川 譽']
	},
	{
		name: '討厭魚卵',
		buff: 1.12,
		members: ['茅崎 至','有栖川 譽']
	},
	{
		name: '購物同伴',
		buff: 1.12,
		members: ['皇 天馬','攝津 萬里']
	},
	{
		name: '團內手工部',
		buff: 1.12,
		members: ['瑠璃川 幸','伏見 臣']
	},
	{
		name: '汪汪搭檔',
		buff: 1.12,
		members: ['三好 一成','七尾 太一']
	},
	{
		// bug from komoe
		name: '藝術家氣質',
		buff: 1.24,
		members: ['三好 一成','有栖川 譽']
	}
];
module.exports = {
	characters,
	redskill,
	blueskill,
	yellowskill,
	group
};