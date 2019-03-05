var util = require('./util.js');
var data = require('./data.js');
var jq = require('./custom_jquery.js');
var calculator = require('./calculator.js');
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
		reader.onload = (function(file){
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
				console.log(illegal);
				jq.toggle_alert($scope, illegal === null, illegal);			
				if(illegal !== null) {
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
				}
				$scope.cards = cards;
				$scope.cardcount = cards.length;
				$scope.$apply();
			}
		})();
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

		$scope.cardcount = $scope.cards.length;
		$scope.characters = data.characters;
		$scope.redskill = data.redskill;
		$scope.blueskill = data.blueskill;
		$scope.yellowskill = data.yellowskill;
		$scope.skill = {'red': $scope.redskill, 'blue': $scope.blueskill, 'yellow': $scope.yellowskill};
	}

	$scope.calculate = function(){
		var color = $scope.color;
		console.log($scope.teams[color].members.length);
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

		for(var i=0; i<3; i++) $scope.guests[i] = util.CopyByValue(util.Const.card_template);
		
		var file_input = angular.element(document.getElementsByName('cardfile')[0]);
		file_input.val(null);
	}
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
		console.log(filename);		
		reader.readAsText(file);
	}

	$scope.addcard = function(copyindex, new_one){
		var timestamp = new Date().getTime();
		var card;
		console.log(new_one);
		if(new_one) card = util.CopyByValue(util.Const.card_template);
		else card = util.CopyByValue($scope.cards[copyindex]);
		card.id = timestamp;
		console.log(card);
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
	$scope.$watch('cards', function(){
		var arrange_msg = util.Arrangeable($scope.cards, $scope.characters);		
		jq.toggle_alert($scope, arrange_msg === null, arrange_msg);
		$scope.cardcount = $scope.cards.length;
	}, true);

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