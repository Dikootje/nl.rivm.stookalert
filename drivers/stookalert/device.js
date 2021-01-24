'use strict';

const Homey = require('homey');
const uuid = require('uuid');
const fetch = require('node-fetch').default;
const rivmurl = 'https://www.rivm.nl/media/lml/stookalert/stookalert_noalert.json';


class MyDevice extends Homey.Device {
	
	async onInit() {
		try {
			this.log('MyDevice has been inited');
			this.log('Name: ', this.getName());
			this.log('Class: ', this.getClass());
			this.log('Data: ', this.getData());
			
			this.addCapability('alarm_generic');
			
			if (this.getStoreValue('cronTask') === null) {
					this.createCronTask();
			} else {
					this.initializeCronTask();
			}
			this.provincecode = this.getData().prvnr;
		} catch (error) {
			this.error(error);
		}
	}	
	
	checkStookalert() {
		this.log('Checking stookalert status');
		
		fetch(rivmurl)
			.then(result => {
                if (result.ok || result.status === 304) {
					this.log('Succesfully fetched data from RIVM.');
                    if (!this.getAvailable()) {
                        this.setAvailable().then(result => {
                            this.log('Available');
                        }).catch(error => {
                            this.error('Setting availability failed');
                        })
                    }

                    return result.json();
                } else {
					this.log('Fetching RIVM data failed.');
                    throw result.status;
                }
            })
            .then(response => {
                const rivmstookalert = response.filter(s => s.prvnr === this.provincecode);
				this.log('Provincie code uit data', this.provincecode);
				this.log('Gegevens van RIVM', rivmstookalert[0].waarde);
				
				this.setCapabilityValue("alarm_generic", (rivmstookalert[0].waarde == 1 ? true : false));
								
            })
            .catch(error => {
                this.log(`Unavailable (${error})`);
                this.setUnavailable(`Error retrieving data (${error})`);
            });
	}
	
	initializeCronTask() { // code written by: https://github.com/DiedB/Homey-SolarPanels/
        const taskName = this.getStoreValue('cronTask');
        Homey.ManagerCron.getTask(taskName)
            .then(result => {
                result.on('run', data => {
                    this.log(`Running task ${taskName}`);
                    this.checkStookalert();
                });
                this.log(`Initialized cron job ${taskName}`);
            }).catch(error => {
                this.error(`Failed retrieving cron job ${taskName}`);
                this.createCronTask();
            });
    }
        
    createCronTask() { // code written by: https://github.com/DiedB/Homey-SolarPanels/
        const taskName = uuid.v4().replace(/[^a-zA-Z0-9]+/g,'');
        Homey.ManagerCron.registerTask(taskName, this.getCronString(), this.getData())
            .then(task => {
                this.log(`Cron job ${taskName} created successfully`);
                this.setStoreValue('cronTask', taskName).catch(error => {
                    this.error('Failed setting cron task name');
                });
                this.initializeCronTask(taskName);
            }).catch(error => {
                this.error(`Cron job creation failed (${error})`);
            });
    }

    deleteCronTask() { // code written by: https://github.com/DiedB/Homey-SolarPanels/
        const taskName = this.getStoreValue('cronTask');
        Homey.ManagerCron.unregisterTask(taskName)
            .then(result => {
                this.log('Cron job deleted successfully');
            }).catch(error => {
                this.error(`Cron job deletion failed (${error}`);
            });
    }
	
	onAdded() { // code written by: https://github.com/DiedB/Homey-SolarPanels/
        this.log('Added device');

        // Force an initial production check
        this.checkStookalert();
    }
 
    onDeleted() { // code written by: https://github.com/DiedB/Homey-SolarPanels/
        this.deleteCronTask();
        this.log('Deleted device');
    }
    
    /* App-specific methods */
    getCronString() { // code written by: https://github.com/DiedB/Homey-SolarPanels/
        return '*/15 * * * *';
    }
	
}

module.exports = MyDevice;