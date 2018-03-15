const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs')
const Player = require('./constructors/player');

const options = {
	uri: `https://www.pro-football-reference.com/years/2017/draft.htm`,
	transform: function(body) {
		return cheerio.load(body);
	}
}

var players = [];

rp(options)
	.then(($) => {
		$("tbody tr").not('.thead').each((i, el) => {
			var age =  $(el).children("[data-stat='age']").text()
			var name = $(el).children("[data-stat='player']").text()
			var id = i

			var player = new Player(id, age, name)
			players.push(player)
		})

		fs.writeFile("input.json", JSON.stringify(players), function(err) {
			if (err) throw err;
			console.log('complete');
			}
		);

	})
	.catch((err) => {
		console.log(err)
	})

