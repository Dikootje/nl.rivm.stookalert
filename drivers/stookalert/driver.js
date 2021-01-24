'use strict';

const Homey = require('homey');

class StookalertDriver extends Homey.Driver {
	
	onInit() {
		this.log('MyDriver has been inited');
	}
	
	onPairListDevices(data, callback) {
		callback(null, [
			{
			 name: "Stookalert provincie Groningen",
			 data:{ "prvnr": 20}
			},
			{
			 name: "Stookalert provincie Friesland",
			 data:{ "prvnr": 21 }
			},
			{
			 name: "Stookalert provincie Drenthe",
			 data:{ "prvnr": 22 }
			},
			{
			 name: "Stookalert provincie Overijssel",
			 data:{ "prvnr": 23 }
			},
			{
			 name: "Stookalert provincie Gelderland",
			 data:{ "prvnr": 25 }
			},
			{
			 name: "Stookalert provincie Utrecht",
			 data:{ "prvnr": 26 }
			},
			{
			 name: "Stookalert provincie Noord-Holland",
			 data:{ "prvnr": 27 }
			},
			{
			 name: "Stookalert provincie Zuid-Holland",
			 data:{ "prvnr": 28 }
			},
			{
			 name: "Stookalert provincie Zeeland",
			 data:{ "prvnr": 29 }
			},
			{
			 name: "Stookalert provincie Noord-Brabant",
			 data:{ "prvnr": 30 }
			},
			{
			 name: "Stookalert provincie Limburg",
			 data:{ "prvnr": 31 }
			},
			{
			 name: "Stookalert provincie Flevoland",
			 data:{ "prvnr": 24 }
			}
		
		]);
	}
	
}

module.exports = StookalertDriver;