var data = require('./data.js');
var util = require('./util.js');
util.ExtendArray();

sort_cards = function(cards, color, left, right){
	if(left >= right) return;
	var pivot = cards[left][color];
	if(cards[left].event == true) pivot = cards[left][color] * (cards[left].dupe * 1 + 2);
	var i=left;
	var j=right+1;
	while(true){
		var value = 0;
		while(i+1 <= right && card_greater(cards[++i], color, pivot));
		while(j-1 >= left && card_less(cards[--j], color, pivot));
		if(i < j) {
			//swap
			var temp = cards[i];
			cards[i] = cards[j];
			cards[j] = temp;
		}
		else break;
	}
	var temp = cards[left];
	cards[left] = cards[j];
	cards[j] = temp;
	sort_cards(cards, color, left, j-1);
	sort_cards(cards, color, j+1, right);
}
card_to_team = function(card, color){
	return {id: card.id, star: card.star, character: card.character, cardname: card.cardname, value: card[color], event: card.event, dupe: card.dupe};
}
card_greater = function(card, color, pivot){
	if(card.event === true) value = card[color] * (card.dupe * 1 + 2);
	else value = card[color];
	return value > pivot;
}
card_less = function(card, color, pivot){
	if(card.event === true) value = card[color] * (card.dupe * 1 + 2);
	else value = card[color];
	return value < pivot;
}
calculate_total = function(team, skill, eventgroup){
	var sum = 0;
	var buffs = 1;
	var buff_name = '';
	for(var j=0; j<team.members.length; j++){
		var value = team.members[j].value;
		if(team.members[j].event === true) value *= (team.members[j].dupe * 1 + 2);
		if(data.characters.indexOf(team.members[j].character) !== -1) sum += value;
	}
	
	//find available skills
	skill.forEach(function(value){
		var count = 0;
		var used_members = [];
		for(var j=0; j < team.members.length; j++){
			if(used_members.indexOf(team.members[j].character) === -1
				&& value.members.indexOf(team.members[j].character) !== -1){
				count++;
				used_members.push(team.members[j].character);
			}
		}
		if(count == value.members.length){
			buffs *= value.buff;
			buff_name = (buff_name.length === 0)? value.name: buff_name + '+' + value.name;
		}
	});

	//same team buff: $scope.eventgroup
	var groupbuff = 0;
	if(eventgroup != -1){
		var gp = data.group[eventgroup];
		for(var i=0; i<team.members.length; i++){
			if(gp.indexOf(team.members[i].character) !== -1) groupbuff += 2.5;
		}
	}
	groupbuff = 1 + groupbuff / 100;
	

	team.total = Math.floor(sum * buffs * groupbuff);
	team.skillbuff = buffs.toFixed(2);
	team.groupbuff = groupbuff.toFixed(3);
	team.skillname = (buff_name.length === 0)? '無技能': buff_name;
	return team.total;
}
arrange = function(color, cards, skill, origin_skill, usedcards_index, guest, eventgroup){
	//prepare skills
	var ableteam = [];

	skill = skill.filter(function(skl){
		if (skl.members.length == 6 &&
			(skl.members.indexOf(guest.character) === -1 && data.characters.indexOf(guest.character))) return false;
		else return true;
	});
	skill.forEach(function(value){
		//value.members, value.buff
		var skillteam = util.CopyByValue(util.Const.team_template);
		var add_guest = false;

		value.members.forEach(function(member){

			var first_id = cards.findIndex(function(card){
				return card.character === member && usedcards_index.indexOf(card.id) === -1;
			});
			if(first_id === -1 || usedcards_index.indexOf(cards[first_id].id) !== -1) return;
			
			var mem = card_to_team(cards[first_id], color);
			if(guest.character === mem.character) {
				// choose guest instead of our member
				// or the slot must remain for guest
				if(mem.value < guest.value ||  value.members.length === 6 ){
					add_guest = true;
					return;
				}
				else;
			}
			skillteam.members.push(mem);
			return;
		});
		
		if(value.members.length > skillteam.members.length
			&& skillteam.members.indexOf(guest.character) === -1
			&& value.members.indexOf(guest.character) !== -1){
			add_guest = true;
		}
		if(skillteam.members.length === value.members.length || add_guest){
			skillteam.skillname = value.name;
			skillteam.skillbuff = value.buff;
			ableteam.push(skillteam);
			console.log(ableteam[ableteam.length-1]);
		}
		else; //impossible team skills
	});
	ableteam.push(util.CopyByValue(util.Const.team_template)); //no skill team

	//fill in with max not-used members(skill members are ok becuase they'll be removed soon)
	ableteam.forEach(function(team){
		var max_id = 0;
		while(team.members.length < 5 && max_id < cards.length) {
			if(team.members.findIndex(function(member){
				return member.id == cards[max_id].id;
			}) === -1 && usedcards_index.indexOf(cards[max_id].id) === -1){ //it is ok for duplicated cards in a3
				team.members.push(card_to_team(cards[max_id], color));
			}
			else max_id++;		
		}
		team.members.push(guest);
	});

	//calculate total and choose max one
	var max_total = -1;
	var max_team = null;
	ableteam.forEach(function(team){
		//calculate
		total = calculate_total(team, origin_skill, eventgroup);

		//check if leader has correct color
		var leader_exist = false;
		for(var i=0; i<5 ;i++){
			var card = cards.find(function(c){
				return c.id == team.members[i].id;
			});
			var correct_color = true;
			for(var k=0; k < util.Const.colors.length; k++){
				if(util.Const.colors[k] != color
					&& card[util.Const.colors[k]] > card[color]){
					correct_color = false;
					break;
				}
				else;
			}
			if(correct_color) {
				leader_exist = true;
				break;
			}
		}
		if(total > max_total && leader_exist){
			max_total = total;
			max_team = team;
		}
	});

	if(max_team !== null){
		for(var k=0; k<max_team.members.length; k++){
			usedcards_index.push(max_team.members[k].id);
		}
	}
	else console.log(ableteam); //too many duplicate characters
	return max_team;
}
multiple_skill = function(color, candidate_skills){

	var team_limit = 6;

	//prepare multiple skill
	var candidate_left = 0;
	var origin_candidate_length = candidate_skills.length;
	do {
		var candidates = candidate_skills.length;
		for(var j=candidates-1; j>=candidate_left; j--){
			for(var k=(j < origin_candidate_length)? j-1: origin_candidate_length-1; k>=0; k--){
				var skl = candidate_skills[j];
				var another_skl = candidate_skills[k];
				var difference = skl.members.concat(another_skl.members).dupe();
				if(difference.length <= team_limit){
					var same = candidate_skills.find(function(exist_skill){
						var m = util.CopyByValue(exist_skill.members);
						if(m.sort().equals(difference.sort())) {
							var skillnames = exist_skill.name.split("+");
							var skl_skillnames = skl.name.split("+");
							var another_skl_skillnames = another_skl.name.split("+");
							var new_name = skl_skillnames.concat(another_skl_skillnames).dupe();
							if(new_name.length === skl_skillnames.length+another_skl_skillnames.length && new_name.length !== skillnames.length) return false;
							else return true;
						}
						else return false;
					});
					if(same === undefined){
						var head = 0;
						for(var k=0; k<difference.length; k++){
							if(skl.members.indexOf(difference[k]) > -1 && another_skl.members.indexOf(difference[k]) > -1){
								var tmp = difference[k];
								difference[k] = difference[head];
								difference[head] = tmp;
								head++;
							}
						}							
						if(difference.length === skl.members.length){
							candidate_skills.splice(j, 1);
							if(j < origin_candidate_length) origin_candidate_length--;
							if(j < candidates) candidates--;
						}
						if(difference.length === another_skl.members.length){
							candidate_skills.splice(k, 1);
							if(k < origin_candidate_length) origin_candidate_length--;
							if(k < candidates) candidates--;
						}
						candidate_skills.push({
							name: skl.name +"+"+another_skl.name,
							members: difference,
							buff: skl.buff * another_skl.buff
						});
					}
				}
			}
		}
		candidate_left = candidates;
	} while(candidate_left !== candidate_skills.length);
	return candidate_skills;
}
module.exports = {
	sort_cards,
	calculate_total,
	arrange,
	multiple_skill,
	card_to_team
};
