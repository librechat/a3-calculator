!function(e){var r={};function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,r,t){a.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:t})},a.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},a.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(r,"a",r),r},a.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},a.p="",a(a.s=5)}([function(e,r){e.exports={characters:["佐久間咲也","碓冰真澄","皆木綴","茅崎至","希特隆","皇天馬","瑠璃川幸","向坂椋","斑鳩三角","三好一成","攝津萬里","兵頭十座","七尾太一","伏見臣","古市左京","月岡紬","高遠丞","御影密","有栖川譽","雪白東"],redskill:[{name:"新生秋組",buff:1.5,members:["攝津萬里","兵頭十座","七尾太一","伏見臣","古市左京"]},{name:"組長們",buff:1.4,members:["佐久間咲也","皇天馬","攝津萬里","月岡紬"]},{name:"團內足球社",buff:1.3,members:["皆木綴","伏見臣","高遠丞"]},{name:"歌舞伎愛好者",buff:1.3,members:["希特隆","瑠璃川幸","高遠丞"]},{name:"歐華高中組",buff:1.3,members:["皇天馬","兵頭十座","七尾太一"]},{name:"痴心男孩",buff:1.1,members:["佐久間咲也","兵頭十座"]},{name:"雙親在國外",buff:1.1,members:["皇天馬","碓冰真澄"]},{name:"毒舌",buff:1.1,members:["碓冰真澄","瑠璃川幸"]},{name:"電玩部",buff:1.1,members:["茅崎至","攝津萬里"]},{name:"垃圾食物愛好者",buff:1.1,members:["茅崎至","七尾太一"]},{name:"運動神經發達怪物",buff:1.1,members:["斑鳩三角","御影密"]},{name:"青梅竹馬",buff:1.1,members:["月岡紬","高遠丞"]}],blueskill:[{name:"新生春組",buff:1.5,members:["佐久間咲也","碓冰真澄","皆木綴","茅崎至","希特隆"]},{name:"新生冬組",buff:1.5,members:["月岡紬","高遠丞","御影密","有栖川譽","雪白東"]},{name:"團內麻將社",buff:1.4,members:["希特隆","三好一成","古市左京","雪白東"]},{name:"花咲學園組",buff:1.3,members:["佐久間咲也","碓冰真澄","攝津萬里"]},{name:"孑然一身",buff:1.3,members:["佐久間咲也","御影密","雪白東"]},{name:"一瞑大一寸",buff:1.1,members:["碓冰真澄","御影密"]},{name:"葉星大學組",buff:1.1,members:["皆木綴","伏見臣"]},{name:"擅長教人",buff:1.1,members:["茅崎至","月岡紬"]},{name:"表兄弟",buff:1.1,members:["向坂椋","兵頭十座"]},{name:"G的洗禮",buff:1.1,members:["七尾太一","高遠丞"]},{name:"前不良",buff:1.1,members:["古市左京","伏見臣"]},{name:"最年長組",buff:1.1,members:["古市左京","雪白東"]}],yellowskill:[{name:"新生夏組",buff:1.5,members:["皇天馬","瑠璃川幸","向坂椋","斑鳩三角","三好一成"]},{name:"甜食派",buff:1.4,members:["向坂椋","兵頭十座","御影密","雪白東"]},{name:"Trouble Makers",buff:1.3,members:["希特隆","斑鳩三角","有栖川譽"]},{name:"少女漫畫同好會",buff:1.3,members:["向坂椋","三好一成","古市左京"]},{name:"飛特族",buff:1.3,members:["斑鳩三角","月岡紬","雪白東"]},{name:"目標是相聲巨星",buff:1.1,members:["皆木綴","希特隆"]},{name:"團內文藝部",buff:1.1,members:["皆木綴","有栖川譽"]},{name:"討厭魚卵",buff:1.1,members:["茅崎至","有栖川譽"]},{name:"購物同伴",buff:1.1,members:["皇天馬","攝津萬里"]},{name:"聖芙羅拉中學組",buff:1.1,members:["瑠璃川幸","向坂椋"]},{name:"團內手工部",buff:1.1,members:["瑠璃川幸","伏見臣"]},{name:"汪汪搭檔",buff:1.1,members:["三好一成","七尾太一"]},{name:"藝術家氣質",buff:1.1,members:["三好一成","有栖川譽"]}],group:[["佐久間咲也","碓冰真澄","皆木綴","茅崎至","希特隆"],["皇天馬","瑠璃川幸","向坂椋","斑鳩三角","三好一成"],["攝津萬里","兵頭十座","七尾太一","伏見臣","古市左京"],["月岡紬","高遠丞","御影密","有栖川譽","雪白東"]]}},function(e,r){const a={count:"至少要有5張卡才能使用組隊功能",character_count:"重複角色太多",empty_character:"不能有空白角色",illegal_cardfile:"卡組資料格式錯誤",illegal_value:"卡片數值請用數字填入",illegal_star:"卡片星級請用數字填入，僅限1~4",illegal_dupe:"卡片突破請用數字填入，僅限0~4",illegal_character:"請填入正確角色名稱",illegal_name:"請用文字敘述卡片名稱",illegal_event:"倍卡格式錯誤"},t={colors:["red","blue","yellow"],team_template:{total:0,skillname:"無技能",skillbuff:1.0,groupbuff:1.0,members:[]},card_template:{id:-1,star:1,character:"",cardname:"",red:0,blue:0,yellow:0,event:!1,dupe:0},member_template:{id:-1,star:1,character:"",cardname:"",value:0,event:!1,dupe:0},warning:a};CheckNaturalNum=function(e){return void 0!=e&&!!(Number.isInteger(e)&&e>-1)},CopyByValue=function(e){return JSON.parse(JSON.stringify(e))},Arrangeable=function(e,r){if(e.length<5)return a.count;for(var t=0,n={},l=0;l<r.length;l++)n[r[l]]=0;for(l=0;l<e.length;l++){var u=e[l].character;if(""===u)return a.empty_character;if(void 0===n[u])return a.illegal_character;n[u]<3&&(t++,n[u]++)}return null},IsLegal=function(e,r){if(void 0==e||null==e)return a.illegal_cardfile;if(e.constructor!==Array)return a.illegal_cardfile;for(var t={},n=0;n<r.length;n++)t[r[n]]=0;for(n=0;n<e.length;n++){if(!CheckNaturalNum(e[n].red)||!CheckNaturalNum(e[n].blue)||!CheckNaturalNum(e[n].yellow))return a.illegal_value;if(!CheckNaturalNum(e[n].star)||e[n].star>4)return a.illegal_value;if(!CheckNaturalNum(e[n].dupe)||e[n].dupe>4)return a.illegal_value;if("string"!=typeof e[n].character)return a.illegal_character;if(void 0===t[e[n].character])return a.illegal_character;if("string"!=typeof e[n].cardname)return a.illegal_name;if("boolean"!=typeof e[n].event)return a.illegal_event}return null},array_dupe=function(){for(var e=this.concat(),r=0;r<e.length;++r)for(var a=r+1;a<e.length;++a)e[r]===e[a]&&e.splice(a,1);return e},array_equals=function(e){if(!e)return!1;if(this.length!=e.length)return!1;for(var r=0;r<this.length;r++){if(e[r]instanceof Array&&this[r]instanceof Array)return this[r].equals(e[r]);if(e[r]!==this[r])return!1}return!0},ExtendArray=function(){Array.prototype.dupe=array_dupe,Array.prototype.equals=array_equals},e.exports={CheckNaturalNum:CheckNaturalNum,CopyByValue:CopyByValue,ExtendArray:ExtendArray,Arrangeable:Arrangeable,IsLegal:IsLegal,Const:t}},function(e,r,a){var t=a(0),n=a(1);n.ExtendArray(),sort_cards=function(e,r,a,t){if(!(a>=t)){var n=e[a][r];1==e[a].event&&(n=e[a][r]*(e[a].dupe+2));for(var l=a,u=t+1;;){for(;l+1<=t&&card_greater(e[++l],r,n););for(;u-1>=a&&card_less(e[--u],r,n););if(!(l<u))break;var o=e[l];e[l]=e[u],e[u]=o}o=e[a];e[a]=e[u],e[u]=o,sort_cards(e,r,a,u-1),sort_cards(e,r,u+1,t)}},card_to_team=function(e,r){return{id:e.id,star:e.star,character:e.character,cardname:e.cardname,value:e[r],event:e.event,dupe:e.dupe}},card_greater=function(e,r,a){return!0===e.event?value=e[r]*(e.dupe+2):value=e[r],value>a},card_less=function(e,r,a){return!0===e.event?value=e[r]*(e.dupe+2):value=e[r],value<a},calculate_total=function(e,r,a){for(var n=0,l=1,u="",o=0;o<e.members.length;o++){var c=e.members[o].value;!0===e.members[o].event&&(c*=e.members[o].dupe+2),-1!==t.characters.indexOf(e.members[o].character)&&(n+=c)}r.forEach(function(r){for(var a=0,t=[],n=0;n<e.members.length;n++)-1===t.indexOf(e.members[n].character)&&-1!==r.members.indexOf(e.members[n].character)&&(a++,t.push(e.members[n].character));a==r.members.length&&(l*=r.buff,u=0===u.length?r.name:u+"+"+r.name)});var s=0;if(-1!=a)for(var m=t.group[a],i=0;i<e.members.length;i++)-1!==m.indexOf(e.members[i].character)&&(s+=2.5);return s=1+s/100,e.total=Math.floor(n*l*s),e.skillbuff=l.toFixed(2),e.groupbuff=s.toFixed(3),e.skillname=0===u.length?"無技能":u,e.total},arrange=function(e,r,a,l,u,o,c){var s=[];(a=a.filter(function(e){return 6!=e.members.length||-1!==e.members.indexOf(o.character)||!t.characters.indexOf(o.character)})).forEach(function(a){var t=n.CopyByValue(n.Const.team_template),l=0;a.members.every(function(a){if(l>=5)return!1;var n=r.findIndex(function(e){return e.character===a&&-1===u.indexOf(e.id)});if(-1===n||-1!==u.indexOf(r[n].id))return!1;var c=card_to_team(r[n],e);return!(c.value<o.value&&o.character===c.character)&&(t.members.push(c),l++,!0)});var c=!1;a.members.length-t.members.length>0&&-1===t.members.indexOf(o.character)&&-1!==a.members.indexOf(o.character)&&(c=!0),(t.members.length===a.members.length||c)&&(t.skillname=a.name,t.skillbuff=a.buff,s.push(t))}),s.push(n.CopyByValue(n.Const.team_template)),s.forEach(function(a){for(var t=0;a.members.length<5&&t<r.length;)-1===a.members.findIndex(function(e){return e.id==r[t].id})&&-1===u.indexOf(r[t].id)?a.members.push(card_to_team(r[t],e)):t++;a.members.push(o)});var m=-1,i=null;if(s.forEach(function(a){total=calculate_total(a,l,c);for(var t=!1,u=0;u<5;u++){for(var o=r.find(function(e){return e.id==a.members[u].id}),s=!0,f=0;f<n.Const.colors.length;f++)if(n.Const.colors[f]!=e&&o[n.Const.colors[f]]>o[e]){s=!1;break}if(s){t=!0;break}}total>m&&t&&(m=total,i=a)}),null!==i)for(var f=0;f<i.members.length;f++)u.push(i.members[f].id);else console.log(s);return i},multiple_skill=function(e,r){var a=0,t=r.length;do{for(var l=r.length,u=l-1;u>=a;u--)for(var o=u<t?u-1:t-1;o>=0;o--){var c=r[u],s=r[o],m=c.members.concat(s.members).dupe();if(m.length<=6)if(void 0===r.find(function(e){if(n.CopyByValue(e.members).sort().equals(m.sort())){var r=e.name.split("+"),a=c.name.split("+"),t=s.name.split("+"),l=a.concat(t).dupe();return l.length!==a.length+t.length||l.length===r.length}return!1})){var i=0;for(o=0;o<m.length;o++)if(c.members.indexOf(m[o])>-1&&s.members.indexOf(m[o])>-1){var f=m[o];m[o]=m[i],m[i]=f,i++}m.length===c.members.length&&(r.splice(u,1),u<t&&t--,u<l&&l--),m.length===s.members.length&&(r.splice(o,1),o<t&&t--,o<l&&l--),r.push({name:c.name+"+"+s.name,members:m,buff:c.buff*s.buff})}}a=l}while(a!==r.length);return r},e.exports={sort_cards:sort_cards,calculate_total:calculate_total,arrange:arrange,multiple_skill:multiple_skill,card_to_team:card_to_team}},function(e,r){toggle_alert=function(e,r,a){var t=angular.element(document.getElementById("arrangealert"));r?(e.warning_msg="",t.fadeOut()):(e.warning_msg=a,console.log(e.warning_msg),t.fadeIn())},e.exports={toggle_alert:toggle_alert}},function(e,r,a){var t=a(1),n=a(0),l=a(3),u=a(2);t.ExtendArray();var o=angular.module("A3Calculator",[]),c=new FileReader;o.controller("CardGroup",["$scope",function(e){e.characters=[],e.redskill=[],e.blueskill=[],e.yellowskill=[],e.redteam=null,e.blueteam=null,e.yellowteam=null,e.cards=[],e.teams={red:e.redteam,blue:e.blueteam,yellow:e.yellowteam},e.guest=null,e.skill={},e.eventgroup=-1,e.color="gray",e.cardcount=5,e.groupstyle=3,e.warning_msg="",e.imagepath={red:"../resource/action-web.png",blue:"../resource/serious-web.png",yellow:"../resource/comedy-web.png",gray:""},e.init=function(){c.onload=function(r){var a,n=r.target.result;try{a=JSON.parse(n)}catch(r){return console.log(r),void l.toggle_alert(e,!1,t.Const.warning.illegal_cardfile)}var u=t.IsLegal(a,e.characters);if(console.log(u),l.toggle_alert(e,null===u,u),null===u){for(var o=(new Date).getTime(),c=0,s=0;s<a.length;s++)null==a[s].id&&(a[s].id=o+c,c++);e.cards=a,e.cardcount=a.length,e.$apply()}else e.$apply()};var r=t.CopyByValue(t.Const.card_template);r.id=0,e.cards.push(r),e.guest=t.CopyByValue(t.Const.card_template);for(var a=0;a<3;a++){for(var o=t.Const.colors[a],s=t.CopyByValue(t.Const.team_template),m=0;m<5;m++){var i=t.CopyByValue(t.Const.member_template);s.members.push(i)}s.members.push(u.card_to_team(e.guest,o)),e.teams[o]=s}e.cardcount=e.cards.length,e.characters=n.characters,e.redskill=n.redskill,e.blueskill=n.blueskill,e.yellowskill=n.yellowskill,e.skill={red:e.redskill,blue:e.blueskill,yellow:e.yellowskill}},e.calculate=function(){var r=e.color;console.log(e.teams[r].members.length),u.calculate_total(e.teams[r],e.skill[r],e.eventgroup)},e.changecolor=function(r){e.color=r},e.changecardcount=function(){var r=e.cards.length;if((void 0==e.cardcount||null==e.cardcount||e.cardcount<1)&&(e.cardcount=1),r!=e.cardcount){e.cards.length=e.cardcount;var a=(new Date).getTime(),n=0;if(r<e.cards.length)for(var l=r;l<e.cards.length;l++)e.cards[l]=t.CopyByValue(t.Const.card_template),e.cards[l].id=a+n,n++}},e.autoarrangeall=function(){var r=t.Arrangeable(e.cards,e.characters);if(l.toggle_alert(e,null===r,r),null===r)for(var a=t.CopyByValue(e.cards),n=0;n<t.Const.colors.length;n++){var u=t.Const.colors[n];e.arrangebycolor(a,u)}},e.arrangebycolor=function(r,a){var n=u.card_to_team(e.guest,a),l=t.CopyByValue(e.skill[a]),o=u.multiple_skill(a,l);u.sort_cards(r,a,0,r.length-1);e.teams[a]=u.arrange(a,r,o,e.skill[a],[],n,e.eventgroup)},e.clear=function(){e.cardcount=1,e.cards.length=1,e.cards[0]=t.CopyByValue(t.Const.card_template),e.cards[0].id=(new Date).getTime(),e.guest=t.CopyByValue(t.Const.card_template),angular.element(document.getElementsByName("cardfile")[0]).val(null)},e.download=function(){var r=new Date,a=(r.getMonth()+1).toString();1==a.length&&(a="0"+a);var t=r.getDate().toString();1==t.length&&(t="0"+t);var n="a3_cards_"+r.getFullYear()+a+t+".txt",l=JSON.stringify(e.cards),u=document.createElement("a");u.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(l)),u.setAttribute("download",n),u.display="none",document.body.appendChild(u),u.click(),document.body.removeChild(u)},e.upload=function(){if(void 0!=event&&void 0!=event.target&&0!=event.target.files.length){var e=event.target.files[0],r=e.name;console.log(r),c.readAsText(e)}},e.addcard=function(r,a){var n,l=(new Date).getTime();console.log(a),(n=a?t.CopyByValue(t.Const.card_template):t.CopyByValue(e.cards[r])).id=l,console.log(n),e.cards.splice(r+1,0,n)},e.removecard=function(r){if(1==e.cards.length){var a=e.cards[0].id;e.cards[0]=t.CopyByValue(t.Const.card_template),e.cards[0].id=a}else e.cards.splice(r,1)},e.$watch("cards",function(){var r=t.Arrangeable(e.cards,e.characters);l.toggle_alert(e,null===r,r),e.cardcount=e.cards.length},!0),e.init()}]),o.directive("customFileChange",function(){return{restict:"A",link:function(e,r,a){var t=e.$eval(a.customFileChange);r.on("change",t)}}}),o.directive("optionValue",function(){return{require:"ngModel",link:function(e,r,a,t){t.$parsers.push(function(e){return null!=e?parseInt(e,10):null}),t.$formatters.push(function(e){return null!=e?""+e:null})}}}),o.filter("floor",function(){return function(e){return Math.floor(e)}}),window.onload=function(){$(".loading").slideUp(500)},$(document).ready(function(){$("#cardcount").keyup(function(e){13==e.keyCode&&$(this).blur()})})},function(e,r,a){e.exports=a(4)}]);