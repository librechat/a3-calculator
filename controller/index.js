var util = require('./util.js');
var data = require('./data.js');
var jq = require('./ctrl_jquery.js');
var calculator = require('./calculator.js');
var database = require('./database.js');
var async = require('Async');

util.ExtendArray();

var app = angular.module("A3Calculator", []);
var reader = new FileReader();

app.controller("CardGroup", ["$scope", function($scope){
	$scope.characters = [];
	$scope.redskill = [];
	$scope.blueskill = [];
	$scope.yellowskill = [];
	$scope.redteam = null;
	$scope.blueteam = null;
	$scope.yellowteam = null;
	$scope.cardnames = {};

	$scope.cards = [];

	$scope.teams = {'red': $scope.redteam, 'blue': $scope.blueteam, 'yellow': $scope.yellowteam};
	
	$scope.guests = {'yellow': null, 'red': null, 'blue':null};

	$scope.skill = {};
	$scope.eventgroup = -1;
	$scope.color = 'gray';
	$scope.cardcount = 5;
	$scope.groupstyle = 3;
	$scope.warning_msg = "";

	$scope.imagepath = {
		'red': '../resource/action-web.png',
		'blue': '../resource/serious-web.png',
		'yellow': '../resource/comedy-web.png',
		'gray': ''
	};

	$scope.event_card_value = calculator.event_card_value;

	$scope.init = function(){

		// register read file callback
		reader.onload = ($scope.onfileopen)();
		//load json basic data;
		var card = util.CopyByValue(util.Const.card_template);
		card.id = 0;
		$scope.cards.push(card);
 
		for(var i=0; i<3; i++){
			var color = util.Const.colors[i];
			$scope.guests[color] = util.CopyByValue(util.Const.member_template);
			
			var team = util.CopyByValue(util.Const.team_template);
			for(var k=0; k<5; k++){
				var member = util.CopyByValue(util.Const.member_template);
				team.members.push(member);
			}
			team.members.push(util.CopyByValue($scope.guests[color]));
			$scope.teams[color] = team;
		}	

		// init data
		//var characters = database.get_characters();

		$scope.characters = data.characters;
		$scope.cardcount = $scope.cards.length;

		$scope.redskill = data.redskill;
		$scope.blueskill = data.blueskill;
		$scope.yellowskill = data.yellowskill;
		sort_skills($scope.redskill, 0, $scope.redskill.length-1);
		sort_skills($scope.blueskill, 0, $scope.blueskill.length-1);
		sort_skills($scope.yellowskill, 0, $scope.yellowskill.length-1);

		$scope.skill = {'red': $scope.redskill, 'blue': $scope.blueskill, 'yellow': $scope.yellowskill};

		for(var i=0; i<data.characters.length; i++){
			$scope.cardnames[data.characters[i]] = database.get_card_names(data.characters[i]);
		}
	}
	//========== calculation ===========
	$scope.calculate = function(){
		var color = $scope.color;
		//console.log($scope.teams[color].members.length);
		calculator.calculate_total($scope.teams[color], $scope.skill[color], $scope.eventgroup);
	}
	$scope.changecolor = function(color){
		$scope.color = color;
	}
	$scope.changecardcount = function(){
		var prevlength = $scope.cards.length;
		if($scope.cardcount == undefined || $scope.cardcount == null || $scope.cardcount < 1) $scope.cardcount = 1;
		if(prevlength == $scope.cardcount) return;
		$scope.cards.length = $scope.cardcount;
		var timestamp = new Date().getTime();
		var cnt = 0;
		if(prevlength < $scope.cards.length){
			for(var i=prevlength; i<$scope.cards.length; i++){
				$scope.cards[i] = util.CopyByValue(util.Const.card_template);
				$scope.cards[i].id = timestamp+cnt;
				cnt++;
			}
		}
	}
	$scope.autoarrangeall = function(){
		var arrange_msg = util.Arrangeable($scope.cards, $scope.characters);
		jq.toggle_alert($scope, arrange_msg === null, arrange_msg);
		if(arrange_msg !== null) {
			return;
		}
		var cards = util.CopyByValue($scope.cards);
		for(var i=0; i<util.Const.colors.length; i++){
			var color = util.Const.colors[i];
			$scope.arrangebycolor(cards, color);
		}
	}
	$scope.arrangebycolor = function(cards, color){
		var candidate_skills = util.CopyByValue($scope.skill[color]);
		var skill = calculator.multiple_skill(color, candidate_skills);
		calculator.sort_cards(cards, color, 0, cards.length-1);
		//concept: max('skill') = (sum(skill_members)+sum(others)) * (100+buff)%
		var usedcards_index = [];
		var guest = util.CopyByValue($scope.guests[color]);
		$scope.teams[color] = calculator.arrange(color, cards, skill, $scope.skill[color], usedcards_index, guest, $scope.eventgroup);
		return;
	}
	$scope.clear = function(){
		$scope.cardcount = 1;
		$scope.cards.length = 1;
		$scope.cards[0] = util.CopyByValue(util.Const.card_template);
		$scope.cards[0].id = new Date().getTime();

		for(var i=0; i<3; i++) {
			var color = util.Const.colors[i];
			$scope.guests[color] = util.CopyByValue(util.Const.member_template);
		}
		
		var file_input = angular.element(document.getElementsByName('cardfile')[0]);
		file_input.val(null);
	}
	//============= file operations ============
	$scope.download = function(){
		//prepare data
		var d = new Date();
		var month = (d.getMonth() + 1).toString();
		if(month.length == 1) month = "0"+month;
		var date = d.getDate().toString();
		if(date.length == 1) date = "0"+date;
		var filename = "a3_cards_"+d.getFullYear()+month+date+".txt";
		var text = JSON.stringify($scope.cards);
		//create a fake element and click it
		//a(href="file" download)
		var blob = new Blob(["\ufeff", text]);

		var element = document.createElement('a');
		//element.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
		element.setAttribute('download', filename);
		element.href = window.URL.createObjectURL(blob);
		element.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
	$scope.upload = function(event){
		//open file
		if(event == undefined || event.target == undefined || event.target.files.length == 0) return;
		var file = event.target.files[0];
		var filename = file.name;
		console.log("upload: "+filename);		
		reader.readAsText(file);
	}
	$scope.onfileopen = function(file){
		return function(event){
			var data_string = event.target.result;
			var cards;
			try {
				cards = JSON.parse(data_string);
			} catch(e){
				console.log(e);
				jq.toggle_alert($scope, false, util.Const.warning.illegal_cardfile);
				return;
			}

			var illegal = util.IsLegal(cards, $scope.characters);

			jq.toggle_alert($scope, illegal === null, illegal);			
			if(illegal !== null) {
				console.log(illegal);
				$scope.$apply();
				return;
			}

			var timestamp = new Date().getTime();
			var cnt = 0;
			for(var i=0; i<cards.length; i++){
				if(cards[i].id == null) {
					cards[i].id = timestamp + cnt;
					cnt++;
				}
				if(typeof(cards[i].event) === 'boolean'){
					if(cards[i].event === true) cards[i].event = 1;
					else cards[i].event = 0;
				}
				if(cards[i].character.indexOf(' ') === -1){
					cards[i].character = data.characters.find(function(element){
						return cards[i].character == element.replace(/\s+/g, "");
					});
				}
			}
			$scope.cards = cards;
			$scope.cardcount = cards.length;
			$scope.$apply();
		}
	}
	//============ ui actions ===========
	$scope.addcard = function(copyindex, new_one){
		var timestamp = new Date().getTime();
		var card;
		//console.log(new_one);
		if(new_one) card = util.CopyByValue(util.Const.card_template);
		else card = util.CopyByValue($scope.cards[copyindex]);
		card.id = timestamp;
		//console.log(card);
		$scope.cards.splice(copyindex + 1, 0, card);
	}
	$scope.removecard = function(cardindex){
		if($scope.cards.length == 1) {
			var id = $scope.cards[0].id;
			$scope.cards[0] = util.CopyByValue(util.Const.card_template);
			$scope.cards[0].id = id;
		}
		else $scope.cards.splice(cardindex, 1);
	}
	//========= database interactions ==============
	$scope.$watch('cards', function(newValue, oldValue){
		var arrange_msg = util.Arrangeable($scope.cards, $scope.characters);		
		jq.toggle_alert($scope, arrange_msg === null, arrange_msg);
		$scope.cardcount = $scope.cards.length;
	}, true);

	$scope.usedb = function(){
		jq.loading_screen(true);

		async.waterfall([
			function(next){
				var errorlist = [];

				async.forEachOf($scope.guests,
					function(guest, key, callback){
						if($scope.characters.find(function(element){return element == guest.character; }) == undefined) {
							errorlist.push("character");
							return callback(null);
						}
						if($scope.cardnames[guest.character].find(function(element){ return element == guest.cardname; }) != undefined){
							database.get_card_info(guest.character, guest.cardname, guest.dupe, function(err, card_info){
								if(err !== null) {
									errorlist.push(err);
									return callback(null);
								}
								guest.value = card_info[key];
								guest.star = card_info.rarity;
								guest.act = card_info.act;
								return callback(null);
							});
						}
						else {
							errorlist.push("cardname");
							return callback(null);
						}
					}, function(err){
						if(err) return next(err);
						next(null, errorlist);
					}
				);
			},
			function(errorlist, next){				
				async.each($scope.cards,
					function(card, callback){
						if($scope.characters.find(function(element){return element == card.character; }) == undefined) {
							errorlist.push("character");
							return callback(null);
						}
						if($scope.cardnames[card.character].find(function(element){ return element == card.cardname; }) != undefined){
							database.get_card_info(card.character, card.cardname, card.dupe, function(err, card_info){
								if(err !== null) {
									errorlist.push(err);
									return callback(null);
								}
								card.yellow = card_info.yellow;
								card.red = card_info.red;
								card.blue = card_info.blue;
								card.star = card_info.rarity;
								card.act = card_info.act;
								return callback(null);
							});
						}
						else {
							errorlist.push("cardname");
							return callback(null);
						}				
					}, function(err){
						if(err) return next(err);
						next(null, errorlist);
					}
				);
			}
		], function(err, errorlist){
			if(err !== null || errorlist.length === $scope.cards.length + 3) {
				console.log("err: "+err);
				jq.loading_screen(false);
				return;
			}
			$scope.$apply();
			jq.loading_screen(false);
		});
	}

	$scope.onguestcharacterchange = function(newValue, oldValue, index){
		if(oldValue.length < 3) return;

		var color = Object.keys($scope.guests)[index];
		var guest = $scope.guests[Object.keys($scope.guests)[index]];
		if($scope.characters.find(function(element){return element == guest.character; }) == undefined) return;
		if($scope.cardnames[newValue].find(function(element){ return element == guest.cardname; }) != undefined){
			jq.loading_slots('guest', index, true);
			database.set_card_info(guest, function(card_info){
				guest.value = card_info[color];
				guest.star = card_info.rarity;
				guest.act = card_info.act;
				$scope.$apply();
				jq.loading_slots('guest', index, false);
			});
		}
		else if($scope.cardnames[oldValue].find(function(element){ return element == guest.cardname; }) != undefined){
			guest.cardname = "";
			jq.clear_selection('guest', index);
			return;
		}
		return;
	}
	$scope.onguestchange = function(index){
		var color = Object.keys($scope.guests)[index];
		var guest = $scope.guests[Object.keys($scope.guests)[index]];

		if($scope.characters.find(function(element){return element == guest.character; }) == undefined) return;
		if($scope.cardnames[guest.character].find(function(element){ return element == guest.cardname; }) != undefined){
			jq.loading_slots('guest', index, true);
			database.set_card_info(guest, function(card_info){
				guest.value = card_info[color];
				guest.star = card_info.rarity;
				guest.act = card_info.act;
				$scope.$apply();
				jq.loading_slots('guest', index, false);
			});
		}
		else {
			console.log("not found this card");
		}
	}
	$scope.oncardcharacterchange = function(newValue, oldValue, index){
		if(oldValue.length < 3) return;

		var card = $scope.cards[index];
		if($scope.cardnames[newValue].find(function(element){ return element == card.cardname; }) != undefined){
			jq.loading_slots('card', index, true);
			database.set_card_info(card, function(card_info){
				card.yellow = card_info.yellow;
				card.red = card_info.red;
				card.blue = card_info.blue;
				card.star = card_info.rarity;
				card.act = card_info.act;
				$scope.$apply();
				jq.loading_slots('card', index, false);
			});
		}
		else if($scope.cardnames[oldValue].find(function(element){ return element == card.cardname; }) != undefined){
			card.cardname = "";
			jq.clear_selection('card', index);
			return;
		}
		return;
	}
	$scope.oncardchange = function(index){
		var card = $scope.cards[index];

		if($scope.characters.find(function(element){return element == card.character; }) == undefined) return;
		if($scope.cardnames[card.character].find(function(element){ return element == card.cardname; }) != undefined){
			jq.loading_slots('card', index, true);
			database.set_card_info(card, function(card_info){
				card.yellow = card_info.yellow;
				card.red = card_info.red;
				card.blue = card_info.blue;
				card.star = card_info.rarity;
				card.act = card_info.act;
				$scope.$apply();
				jq.loading_slots('card', index, false);
			});
		}
		else {
			console.log("not found this card");
		}
	}

	$scope.onmembercharacterchange = function(newValue, oldValue, index){
		if(oldValue.length < 3) return;

		var member = $scope.teams[$scope.color].members[index];
		if(newValue === "") {
			$scope.calculate();
		}
		else if($scope.cardnames[newValue].find(function(element){ return element == member.cardname; }) !== undefined){
			jq.loading_slots('member', index, true);
			database.set_card_info(guest, function(card_info){
				member.star = card_info.rarity;
				member.act = card_info.act;
				var pre_value = member.value;
				member.value = card_info[$scope.color];
				if(pre_value != member.value) $scope.calculate();
				$scope.$apply();
				jq.loading_slots('member', index, false);
			});
		}
		else if($scope.cardnames[oldValue].find(function(element){ return element == member.cardname; }) !== undefined){
			member.cardname = "";
			jq.clear_selection('member', index);
			return;
		}
		return;
	}
	$scope.onmemberchange = function(index){
		var member = $scope.teams[$scope.color].members[index];

		if($scope.characters.find(function(element){return element == member.character; }) == undefined) return;
		if($scope.cardnames[member.character].find(function(element){ return element == member.cardname; }) != undefined){
			jq.loading_slots('member', index, true);
			database.set_card_info(member, function(card_info){
				member.star = card_info.rarity;
				member.act = card_info.act;
				var pre_value = member.value;
				member.value = card_info[$scope.color];
				if(pre_value != member.value) $scope.calculate();
				$scope.$apply();
				jq.loading_slots('member', index, false);
			});
		}
		else {
			console.log("not found this card");
		}
	}

	$scope.init();
}]);
app.directive('customFileChange', function(){
	return {
		restict: 'A',
		link: function (scope, element, attrs) {
			var onChangeFunc = scope.$eval(attrs.customFileChange);
			element.on("change", onChangeFunc);
		}
	};
});
app.directive('optionValue', function(){
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, ngModel){
			ngModel.$parsers.push(function(val) {
				return (val != null) ? parseInt(val, 10) : null;
			});
			ngModel.$formatters.push(function(val) {
				return (val != null) ? '' + val : null;
			});
		}
	}
});
app.filter('floor', function() {
    return function(input) {
        return Math.floor(input);
    };
});
//--------------------------------
window.onload = function(){
	$('.loading').slideUp(500);
};
$(document).ready(function(){
	$('#cardcount').keyup(function(e){
		if(e.keyCode == 13) {
			$(this).blur();
		}
	});
});