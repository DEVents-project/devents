const got = require("got");
const jsdom = require("jsdom")
const { JSDOM } = jsdom;
const mongoose = require("mongoose")
const Workshop = require("../models/workshopSchema")

mongoose.connect("mongodb://127.0.0.1:27017/devents", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on("error", (err) => console.log(err))
mongoose.connection.on("open", () => console.log("database connected"))

const deleteEvents = async () => {

    try {
        await Workshop.deleteMany({});
        // to resolve all the pending promises inside the array 
        console.log("refresh/deleting users")
    } catch (err) {

        console.log(err)
    }

}

deleteEvents()


//German link const meetupEventBerlin = "https://www.meetup.com/de-DE/find/?allMeetups=false&keywords=developer&radius=16&userFreeform=Berlin%2C+Deutschland&mcId=c1007698&mcName=Berlin%2C+DE&sort=default"

// english link
const meetupEventBerlin = "https://www.meetup.com/find/?allMeetups=false&keywords=developer&radius=16&userFreeform=Berlin%2C+Deutschland&mcId=c1007698&mcName=Berlin%2C+DE&sort=distance";

got(meetupEventBerlin).then(res => {
    const eventsPageDom = new JSDOM(res.body.toString()).window.document;
    const eventsParentElement = eventsPageDom.querySelector(".j-groupCard-list");
    const eventsElements = eventsParentElement.querySelectorAll("li")
    eventsElements.forEach(even => {
        const eventUrl = even.querySelector("div").querySelector("a").getAttribute("href")
        // console.log(eventUrl)


        got(eventUrl).then(data => {

            const eventPageDom = new JSDOM(data.body.toString()).window.document;
            let eventData = {};
            eventData.title = eventPageDom.querySelector("h1").textContent;

            // "eventDate raw")
            const eventDate = eventPageDom.querySelectorAll(".eventTimeDisplay")[0].querySelector("span").textContent;

            const slicedDate = eventDate.slice(5, 11) + " " + "2020" + " " + eventDate.slice(-14, -6);
            const date = new Date(slicedDate);
            if (date > new Date()) {
                const dateOfEvent = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
                const timeOfEvent = `${date.getHours()}:${date.getMinutes() < 10 ? date.getMinutes() + "0" : "30"}`;
                eventData.date = dateOfEvent;
                eventData.time = timeOfEvent;
            }


            eventData.location = eventPageDom.querySelectorAll(".venueDisplay")[0].querySelector("address") ? eventPageDom.querySelectorAll(".venueDisplay")[0].querySelector("address").textContent : undefined;

            eventData.city = "Berlin"
            eventData.description = eventPageDom.querySelectorAll(".section")[1] ? eventPageDom.querySelectorAll(".section")[1].querySelectorAll("p")[1].textContent : undefined;


            const bg = eventPageDom.querySelector(".groupHomeHeader-banner").style.backgroundImage;
            const img = bg.slice(4, -1).replace(/"/g, "");

            eventData.img = img
            eventData.url = eventUrl

            const dataForSave = new Workshop(eventData)


            dataForSave.save().then(() => {
                console.log(eventData.title, "saved")
            }).catch(err => {
                console.log(err, eventData.title, "saved")

            });
        })
    })

})

// German link
// const meetupEventHamburg = "https://www.meetup.com/de-DE/find/?allMeetups=false&keywords=developer&radius=26&userFreeform=hamburg&mcId=c1007699&change=yes&sort=default"

// English Link
const meetupEventHamburg = "https://www.meetup.com/find/?allMeetups=false&keywords=developer&radius=26&userFreeform=hamburg&mcId=c1007699&mcName=Hamburg%2C+DE&sort=distance";

got(meetupEventHamburg).then(res => {
    const eventsPageDom = new JSDOM(res.body.toString()).window.document;
    const eventsParentElement = eventsPageDom.querySelector(".j-groupCard-list");
    const eventsElements = eventsParentElement.querySelectorAll("li")
    eventsElements.forEach(even => {
        const eventUrl = even.querySelector("div").querySelector("a").getAttribute("href")


        got(eventUrl).then(data => {

            const eventPageDom = new JSDOM(data.body.toString()).window.document;
            let eventData = {};
            eventData.title = eventPageDom.querySelector("h1").textContent;

            const eventDate = eventPageDom.querySelectorAll(".eventTimeDisplay")[0].querySelector("span").textContent;

            const slicedDate = eventDate.slice(5, 11) + " " + "2020" + " " + eventDate.slice(-14, -6);
            const date = new Date(slicedDate);
            if (date > new Date()) {
                const dateOfEvent = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
                const timeOfEvent = `${date.getHours()}:${date.getMinutes() < 10 ? date.getMinutes() + "0" : "30"}`;
                eventData.date = dateOfEvent;
                eventData.time = timeOfEvent;
            };

            eventData.location = eventPageDom.querySelectorAll(".venueDisplay")[0].querySelector("address") ? eventPageDom.querySelectorAll(".venueDisplay")[0].querySelector("address").textContent : undefined;

            eventData.city = "Hamburg"
            eventData.description = eventPageDom.querySelectorAll(".section")[1] ? eventPageDom.querySelectorAll(".section")[1].querySelectorAll("p")[1].textContent : undefined;


            const bg = eventPageDom.querySelector(".groupHomeHeader-banner").style.backgroundImage;
            const img = bg.slice(4, -1).replace(/"/g, "");

            eventData.img = img
            eventData.url = eventUrl

            const dataForSave = new Workshop(eventData)

            dataForSave.save().then(() => {
                console.log(eventData.title, "saved")
            }).catch(err => {
                console.log(err, eventData.title, "saved")

            });
        })
    })

})

// German 

// const meetupEventMunich = "https://www.meetup.com/de-DE/find/?allMeetups=false&keywords=developer&radius=26&userFreeform=M%C3%BCnchen%2C+Deutschland&mcId=c1007700&change=yes&sort=default"

// English

const meetupEventMunich = "https://www.meetup.com/find/?allMeetups=false&keywords=developer&radius=26&userFreeform=M%C3%BCnchen%2C+Deutschland&mcId=c1007700&mcName=M%C3%BCnchen%2C+DE&sort=distance";

got(meetupEventMunich).then(res => {
    const eventsPageDom = new JSDOM(res.body.toString()).window.document;
    const eventsParentElement = eventsPageDom.querySelector(".j-groupCard-list");
    const eventsElements = eventsParentElement.querySelectorAll("li")
    eventsElements.forEach(even => {
        const eventUrl = even.querySelector("div").querySelector("a").getAttribute("href")


        got(eventUrl).then(data => {

            const eventPageDom = new JSDOM(data.body.toString()).window.document;
            let eventData = {};
            eventData.title = eventPageDom.querySelector("h1").textContent;

            const eventDate = eventPageDom.querySelectorAll(".eventTimeDisplay")[0].querySelector("span").textContent;

            const slicedDate = eventDate.slice(5, 11) + " " + "2020" + " " + eventDate.slice(-14, -6);
            const date = new Date(slicedDate);
            if (date > new Date()) {
                const dateOfEvent = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
                const timeOfEvent = `${date.getHours()}:${date.getMinutes() < 10 ? date.getMinutes() + "0" : "30"}`;
                eventData.date = dateOfEvent;
                eventData.time = timeOfEvent;
            };

            eventData.location = eventPageDom.querySelectorAll(".venueDisplay")[0].querySelector("address") ? eventPageDom.querySelectorAll(".venueDisplay")[0].querySelector("address").textContent : undefined;

            eventData.city = "Munich";
            eventData.description = eventPageDom.querySelectorAll(".section")[1] ? eventPageDom.querySelectorAll(".section")[1].querySelectorAll("p")[1].textContent : undefined;


            const bg = eventPageDom.querySelector(".groupHomeHeader-banner").style.backgroundImage;
            const img = bg.slice(4, -1).replace(/"/g, "");

            eventData.img = img
            eventData.url = eventUrl

            const dataForSave = new Workshop(eventData);

            dataForSave.save().then(() => {
                console.log(eventData.title, "saved");
            }).catch(err => {
                console.log(err, eventData.title, "saved");

            });
        });
    });

});
