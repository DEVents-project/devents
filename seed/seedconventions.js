const got = require("got");
const jsdom = require("jsdom")
const { JSDOM } = jsdom;
const mongoose = require("mongoose")
const Convention = require("../models/conventionSchema")

mongoose.connect("mongodb://127.0.0.1:27017/devents", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on("error", (err) => console.log(err))
mongoose.connection.on("open", () => console.log("database connected"))

const deleteEvents = async () => {

    try {
        await Convention.deleteMany({});
        // to resolve all the pending promises inside the array 
        console.log("refresh/deleting users")
    } catch (err) {

        console.log(err)
    }

}

deleteEvents()

const eventbriteBerlin = "https://www.eventbrite.de/d/germany--berlin/science-and-tech--conferences/developer/?page=1";

got(eventbriteBerlin).then(res => {
    const eventsPageDom = new JSDOM(res.body.toString()).window.document;
    const eventsParentElement = eventsPageDom.querySelector(".search-main-content__events-list");
    const eventsElements = eventsParentElement.querySelectorAll("li")
    eventsElements.forEach(event => {
        const eventUrl = event.querySelector("div").querySelector("a").getAttribute("href")
        const eventAddress = event.querySelector(".card-text--truncated__one").textContent;

        got(eventUrl).then(data => {
            const eventPageDom = new JSDOM(data.body.toString()).window.document;
            let eventData = {};
            let title = eventPageDom.querySelector(".listing-hero-title").textContent;
            eventData.title = title;
            let date = eventPageDom.querySelector(".js-date-time-first-line").textContent;
            eventData.date = date;
            eventData.location = eventAddress;
            eventData.city = "Berlin";
            let description = eventPageDom.querySelector("[data-automation='listing-event-description']").textContent
            eventData.description = description.trim()

            eventData.url = eventUrl

            const dataForSave = new Convention(eventData)

            dataForSave.save().then(() => {
                console.log(eventData.title, "saved")
            }).catch(err => {
                console.log(err, eventData.title, "saved")

            });



        })
    })

})

const eventbriteHamburg = "https://www.eventbrite.de/d/germany--hamburg/science-and-tech--conferences/developer/?page=1";

got(eventbriteHamburg).then(res => {
    const eventsPageDom = new JSDOM(res.body.toString()).window.document;
    const eventsParentElement = eventsPageDom.querySelector(".search-main-content__events-list");
    const eventsElements = eventsParentElement.querySelectorAll("li")
    eventsElements.forEach(event => {
        const eventUrl = event.querySelector("div").querySelector("a").getAttribute("href")
        const eventAddress = event.querySelector(".card-text--truncated__one").textContent;
        got(eventUrl).then(data => {
            const eventPageDom = new JSDOM(data.body.toString()).window.document;
            let eventData = {};
            let title = eventPageDom.querySelector(".listing-hero-title").textContent;
            eventData.title = title;
            let date = eventPageDom.querySelector(".js-date-time-first-line").textContent;
            eventData.date = date;
            // const eventAddress = event.querySelector(".event-details hide-small").querySelector("p").textContent;
            eventData.location = eventAddress;
            eventData.city = "Hamburg";
            let description = eventPageDom.querySelector("[data-automation='listing-event-description']").textContent
            eventData.description = description.trim()
            eventData.url = eventUrl

            const dataForSave = new Convention(eventData)

            dataForSave.save().then(() => {
                console.log(eventData.title, "saved")
            }).catch(err => {
                console.log(err, eventData.title, "saved")

            });



        })
    })

})

const eventbriteMunich = "https://www.eventbrite.de/d/germany--m%C3%BCnchen/science-and-tech--conferences/developer/?page=1";

got(eventbriteMunich).then(res => {
    const eventsPageDom = new JSDOM(res.body.toString()).window.document;
    const eventsParentElement = eventsPageDom.querySelector(".search-main-content__events-list");
    const eventsElements = eventsParentElement.querySelectorAll("li")
    eventsElements.forEach(event => {
        const eventUrl = event.querySelector("div").querySelector("a").getAttribute("href")
        const eventAddress = event.querySelector(".card-text--truncated__one").textContent;

        // const address = eventAddress.trim()
        // console.log(address)
        got(eventUrl).then(data => {
            const eventPageDom = new JSDOM(data.body.toString()).window.document;
            let eventData = {};
            let title = eventPageDom.querySelector(".listing-hero-title").textContent;
            eventData.title = title;
            let date = eventPageDom.querySelector(".js-date-time-first-line").textContent;
            eventData.date = date;
            // const eventAddress = event.querySelector(".event-details hide-small").querySelector("p").textContent;
            eventData.location = eventAddress;
            eventData.city = "Munich";
            let description = eventPageDom.querySelector("[data-automation='listing-event-description']").textContent
            eventData.description = description.trim()
            // const bg = eventPageDom.querySelector(".banner-image").style.backgroundImage
            // const img = bg.slice(4, -1).replace(/"/g, "");
            // eventData.img = img;
            eventData.url = eventUrl

            const dataForSave = new Convention(eventData)

            dataForSave.save().then(() => {
                console.log(eventData.title, "saved")
            }).catch(err => {
                console.log(err, eventData.title, "saved")

            });

            // console.log(eventData)


        })
    })

})