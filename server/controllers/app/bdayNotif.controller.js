/* eslint-disable no-unused-vars */
/* eslint-disable no-template-curly-in-string */
import { user as userModel } from '../../models/index';
import requestFunction from '../../misc/request';

const cron = require('node-cron');

let task = null;

class BdayNotifController {
    static async birthdayScheduler() {
        // Get all user data
        const userData = await userModel.findAll({
            raw: true,
        });

        userData.forEach((user) => {
            const birthdate = new Date(user.birthdate);
            const day = birthdate.getDate();
            const month = birthdate.getMonth() + 1;
            const bdayMessage = `Happy Birthday ${user.first_name} ${user.last_name}!`;

            // Schedule all tasks - sends notification at 9 AM on user's birthday
            task = cron.schedule(`* 9 ${day} ${month} *`, () => {
                console.log(`It's ${user.first_name} ${user.last_name}'s birthday, sending request..`);

                // Send request
                requestFunction.hookbinRequest('/', {
                    method: 'POST',
                    qs: {
                        message: bdayMessage,
                    },
                    json: true,
                    resolveWithFullResponse: true,
                });
            }, {
                scheduled: true,
                timezone: user.timezone,
            });
        });
    }

    static async taskStart() {
        // Function to start cron scheduler
        try {
            task.start();
        } catch (e) {
            console.log(e);
        }
        return console.log('Task started');
    }

    static async taskStop() {
        // Function to stop cron scheduler
        try {
            task.stop();
        } catch (e) {
            console.log(e);
        }
        return console.log('Task stopped');
    }
}

export default BdayNotifController;
