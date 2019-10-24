var data = require('./data.js');
var util = require('./util.js');
util.ExtendArray();

sort_cards = function(cards, color, left, right){
	if(left >= right) return;
	var pivot = event_card_value(cards[left], color);
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
sort_skills = function(skills, left, right){
	if(left >= right) return;
	var pivot = skills[left].buff;
	var i=left;
	var j=right+1;
	while(true){
		var value = 0;
		while(i+1 <= right && skills[++i].buff > pivot);
		while(j-1 >= left && skills[--j].buff < pivot);
		if(i < j) {
			//swap
			var temp = skills[i];
			skills[i] = skills[j];
			skills[j] = temp;
		}
		else break;
	}
	var temp = skills[left];
	skills[left] = skills[j];
	skills[j] = temp;
	sort_skills(skills, left, j-1);
	sort_skills(skills, j+1, right);
}
card_to_team = function(card, color){
	return {
		id: card.id, 
		star: card.star, 
		character: card.character, 
		cardname: card.cardname, 
		value: card[color], 
		event: card.event, 
		dupe: card.dupe,
		act: card.act
	};
}
card_greater = function(card, color, pivot){
	var value = event_card_value(card, color);
	return value > pivot;
}
card_less = function(card, color, pivot){
	var value = event_card_value(card, color);
	return value < pivot;
}
calculate_total = function(team, skill, eventgroup){
	var sum = 0;
	var buffs = 1;
	var buff_name = '';
	for(var j=0; j<team.members.length; j++){
		var value = team.members[j].value;
		value = event_card_value(team.members[j], null);
		if(data.characters.indexOf(team.members[j].character) !== -1) sum += value;
	}
	
	// find available skills
	var invoked_skills = [];
	for(var i=0; i<skill.length; i++){
		var count = 0;
		var used_members = [];
		for(var j=0; j < team.members.length; j++){
			// teammembers is not counted and it is in memberlist of skill
			if(used_members.indexOf(team.members[j].character) === -1
				&& skill[i].members.indexOf(team.members[j].character) !== -1){
				
				// check if act2 skill can invoke
				if(skill[i].act === 2 && team.members[j].act !== 2);
				else {
					count++;
					used_members.push(team.members[j].character);
				}				
			}
		}

		var invoked_sibling_index = invoked_skills.findIndex(function(skl){
			return skl.name == skill[i].name && skl.act !== skill[i].act;
		});

		// act1&2 of a skill cannot be invoke at same time, choose the bigger one
		if(invoked_sibling_index !== -1 && invoked_skills[invoked_sibling_index].act > skill[i].act);		
		else if(count == skill[i].members.length && invoked_skills.length < 3){

			// remove the smaller one act1&2 skill
			if(invoked_sibling_index !== -1) {
				invoked_skills.splice(invoked_sibling_index,1);
			}

			// the skill can be invoke!
			invoked_skills.push(skill[i]);

			if(invoked_skills.length == 3) break;
		}
	};

	for(var i=0; i<invoked_skills.length; i++){
		var skill_family = skill.filter(function(skl){
			return skl.name == invoked_skills[i].name;
		});

		var skillname = invoked_skills[i].name;
		if(skill_family !== undefined && skill_family.length > 1){
			skillname += invoked_skills[i].act.toString();
		}

		buff_name = (i === 0)? skillname: buff_name + '+' + skillname;
		buffs *= invoked_skills[i].buff;
	}

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
	team.skillbuff = buffs.toFixed(3);
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
		if((skillteam.members.length === value.members.length && skillteam.members.length < 6)|| add_guest){
			skillteam.skillname = value.name;
			skillteam.skillbuff = value.buff;
			ableteam.push(skillteam);
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
		for(var j = candidates-1; j >= candidate_left; j--){
			var addend_length = (j < origin_candidate_length)? j-1: origin_candidate_length-1;			
			for(var k = addend_length; k >= 0; k--){
				var skl = candidate_skills[j];
				var another_skl = candidate_skills[k];

				// new combo skl = skl + another_skl, and remove duplicate members
				var difference = skl.members.concat(another_skl.members).dupe(); 
				
				if(difference.length <= team_limit){

					// check if	new combo skl already exists in candidate_skills	
					var same = candidate_skills.find(function(exist_skill){
						var m = util.CopyByValue(exist_skill.members);

						// members are same people
						if(m.sort().equals(difference.sort())) {
							var skillnames = exist_skill.name.split("+");

							var skl_skillnames = skl.name.split("+");
							var another_skl_skillnames = another_skl.name.split("+");
							var new_name = skl_skillnames.concat(another_skl_skillnames).dupe();

							// no duplicate skills in new combo skl, and subskills of new combo skl != subskills of existed one
							if(new_name.length === skl_skillnames.length + another_skl_skillnames.length
								&& new_name.length !== skillnames.length) return false;
							else return true;
						}
						else return false;
					});

					// we have a new combo skl
					if(same === undefined){
						var head = 0;
						for(var k=0; k<difference.length; k++){
							// find duplicate member in skl and another_skl: move it to the front of member list
							if(skl.members.indexOf(difference[k]) > -1
								&& another_skl.members.indexOf(difference[k]) > -1){
								var tmp = difference[k];
								difference[k] = difference[head];
								difference[head] = tmp;
								head++;
							}
						}
						// j >= origin_candidate_length: this combo skl is grouped by multiple skls
						if(difference.length === skl.members.length && j >= origin_candidate_length){
							// skl implies another_skl, so we can simply remove skl from candidate
							// (it is must not the max one)
							candidate_skills.splice(j, 1);
							if(j < candidates) candidates--;
						}
						if(difference.length === another_skl.members.length && k >= origin_candidate_length){
							// another_skl implies skl, so we can simply remove another_skl from candidate
							// (it is must not the max one)
							candidate_skills.splice(k, 1);
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
		candidate_left = candidates; // how many candidates are generated in this loop
	} while(candidate_left !== candidate_skills.length); // loop until no more candidates is generated

	// only invoke 3 skills at most
	for(var i=candidate_skills.length - 1; i>=0; i--){
		var skl = candidate_skills[i].name.split("+");
		if(skl.length > 3) candidate_skills.splice(i, 1);
	};

	return candidate_skills;
}
event_card_value = function(card, color){
	var pivot = (color === null)? card.value: card[color];
	if(card.event == 1) pivot = pivot * (card.dupe * 1 + 2);
	else if(card.event == 2) pivot = Math.floor(pivot * (1 + 0.1 * (card.dupe + 1)));
	else;

	return pivot;
}
module.exports = {
	sort_cards,
	sort_skills,
	calculate_total,
	arrange,
	multiple_skill,
	card_to_team,
	event_card_value
};
