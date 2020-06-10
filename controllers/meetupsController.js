const fetch = require("node-fetch");

const eb_bearer = process.env.EB_MEETUPS_BEARER;

exports.getMeetupsWCS = async (req, res, next) => {
    try{
        const meetupsWCS = await fetch('https://www.eventbriteapi.com/v3/organizers/23340282252/events', {
            headers: {
                "Authorization": `Bearer ${eb_bearer}`
            }
        })
        const data = await meetupsWCS.json();
        res.json({ success: true, events: data });
    } catch (err) {
        next(err);
    }    
};

exports.getMeetupsLW = async (req, res, next) => {
    try{
        const meetupsLW = await fetch('https://www.eventbriteapi.com/v3/organizers/13006803723/events', {
            headers: {
                "Authorization": `Bearer ${eb_bearer}`
            }
        })
        const data = await meetupsLW.json();
        res.json({ success: true, events: data });
    } catch (err) {
        next(err);
    }
};