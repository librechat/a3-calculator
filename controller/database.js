var Airtable = require('airtable');
var async = require('Async');

var dbase = new Airtable({apiKey: 'key9lgQlMZwPB3bey'}).base('appUfSn16NV7lpH7c');

get_characters = function(){

	var characters = [];

	dbase('Member').select({
		fields: ['Name'],
		view: 'Member List',
		sort: [{field: '組別', direction: 'asc'}]
	}).eachPage(
		function page(records, fetchNextPage){
			records.forEach(function(record){
				characters.push(record.get('Name'));
			});

			fetchNextPage();
		},
		function done(err){
			if(err) console.log(err);
		}
	);

	return characters;
}

get_card_names = function(character){

	var list = [];

	dbase('Card').select({
		fields: ['name'],
		filterByFormula: 'character="'+character+'"',
		sort: [{field: 'rarity', direction: 'asc'}, {field: 'color', direction: 'asc'}],
		view: "Kanban by Actor"
	}).eachPage(
		function page(records, fetchNextPage){
			records.forEach(function(record){
				list.push(record.get('name'));
			});

			fetchNextPage();
		},
		function done(err){
			if(err) console.log(err);
		}
	);
	return list;
}

get_card_info = function(character, cardname, dupe, callback){

	var card_info = {};
	var dupe_statements = ['0開max', '1開max', '滿開max'];

	async.waterfall([
		function(next){
			dbase('Card').select({
				fields: ['LV1 Co','LV1 Ac','LV1 Sr','rarity'],
				filterByFormula: 'AND(name="'+cardname+'",character="'+character+'")',
				maxRecords: 1
			}).eachPage(
				function page(records, fetchNextPage){
					var rarity = records[0].get('rarity');
					var star = (rarity === 'SSR')? 4: (rarity === 'SR')? 3: (rarity === 'R')? 2: 1;
					card_info.rarity = star;
					return next(null, card_info, records[0]);
				},
				function done(err){
					if(err){
						console.log(err);
						return next(err, card_info);
					}
				}
			);
		},
		function(card_info, record, next){
			dbase('CardStatRef').find(record.get('LV1 Co'), function(err, stat_record){
				if(err){
					console.log(err);
					return next(err, card_info);
				}
				var rec = stat_record.get(dupe_statements[dupe]);
				card_info.yellow = (rec === undefined)? 0: rec;
				return next(null, card_info, record);
			});
		},
		function(card_info, record, next){
			dbase('CardStatRef').find(record.get('LV1 Ac'), function(err, stat_record){
				if(err){
					console.log(err);
					return next(err, card_info);
				}
				var rec = stat_record.get(dupe_statements[dupe]);
				card_info.red =  (rec === undefined)? 0: rec;
				return next(null, card_info, record);
			});
		},
		function(card_info, record, next){
			dbase('CardStatRef').find(record.get('LV1 Sr'), function(err, stat_record){
				if(err){
					console.log(err);
					return next(err, card_info);
				}
				var rec = stat_record.get(dupe_statements[dupe]);
				card_info.blue =  (rec === undefined)? 0: rec;
				return next(null, card_info);
			});
		}
	], function(err, card_info){
		if(err !== null) return null;

		callback(null, card_info);
	});
}

set_card_info = function(card, setting_callback){
	async.waterfall([
		function(next){
			get_card_info(card.character, card.cardname, card.dupe, next);
		}
	], function(err, card_info){
		if(err !== null) {
			console.log(err);
			return;
		}
		setting_callback(card_info);
	});
}

module.exports = {
	get_characters: get_characters,
	get_card_names: get_card_names,
	get_card_info: get_card_info,
	set_card_info: set_card_info
};