'use strict';

const Homey = require('homey');

class StookalertApp extends Homey.App {
	
	onInit() {
		this.log('StookalertApp is running...');
	}
	
}

module.exports = StookalertApp;