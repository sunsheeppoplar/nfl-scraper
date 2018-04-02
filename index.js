const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs')
const Player = require('./constructors/player');

var initialYear = 2017
var finalYear = 2007

for (var i = initialYear; i >= finalYear; i--) {
	scrapeDraftClass(i)
}

function scrapeDraftClass(draftYear) {
	const options = {
		uri: `https://www.pro-football-reference.com/years/${draftYear}/draft.htm`,
		transform: function(body) {
			return cheerio.load(body);
		}
	}

	var players = [];

	rp(options)
		.then(($) => {
			$("tbody tr").not('.thead').each((i, el) => {
				var id = i
				var age = $(el).children("[data-stat='age']").text()
				var college = $(el).children("[data-stat='college_id']").text()
				var draftPick = $(el).children("[data-stat='draft_pick']").text()
				var draftRound = $(el).children("[data-stat='draft_round']").text()
				var name = $(el).children("[data-stat='player']").text()
				var position = $(el).children("[data-stat='pos']").text()

				var player = new Player(id, age, college, draftPick, draftRound, name, position)
				players.push(player)
			})

			fs.writeFile(`${draftYear}_draft.json`, JSON.stringify(players), function(err) {
				if (err) throw err;
				console.log(`${draftYear} draft completed`);
				}
			);

		})
		.catch((err) => {
			console.log(err)
		})
}