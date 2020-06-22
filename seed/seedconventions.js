const got = require("got");
const jsdom = require("jsdom")
const { JSDOM } = jsdom;
const mongoose = require("mongoose")
const Convention = require("../models/conventionSchema")
const Moment = require("moment")
const fetch = require("node-fetch")

mongoose.connect("mongodb://127.0.0.1:27017/devents", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on("error", (err) => console.log(err))
mongoose.connection.on("open", () => console.log("database connected"))


const deleteEvents = async () => {

    try {
        await Convention.deleteMany({});
        // to resolve all the pending promises inside the array 
        console.log("refresh/deleting events")
    } catch (err) {

        console.log(err)
    }

}

deleteEvents()

const fetchImgConventions = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const allImgConventions = [];

    const request = await fetch("http://localhost:4000/imgconvention", options);
    const response = await request.json();
    response.conventionImages.map(img => {
        allImgConventions.push(`/imgconvention/${img.imgUrl}`)
    })

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
                const eventDate = eventPageDom.querySelector(".js-date-time-first-line").textContent;
                const slicedDate = `${eventDate.slice(5, 26)} `

                const date = new Moment(slicedDate);

                if (date) {
                    eventData.title = eventPageDom.querySelector("h1").textContent;

                    const dateOfEvent = new Moment(date).format('DD MMMM YYYY');
                    const timeOfEvent = new Moment(date).format('LT');

                    eventData.date = dateOfEvent;
                    eventData.time = timeOfEvent;

                    eventData.location = eventAddress;
                    eventData.city = "Berlin";
                    let description = eventPageDom.querySelector("[data-automation='listing-event-description']").textContent
                    eventData.description = description.trim()

                    eventData.url = eventUrl;
                    // let randomImg = Math.floor(Math.random() * allImgConventions.length)
                    eventData.imgUrl = allImgConventions[0];
                    allImgConventions.shift()
                    const dataForSave = new Convention(eventData)

                    dataForSave.save().then(() => {
                        console.log(eventData.title, "saved")
                    }).catch(err => {
                        console.log(err, eventData.title, "saved")
                    });
                }
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
                const eventDate = eventPageDom.querySelector(".js-date-time-first-line").textContent;
                const slicedDate = `${eventDate.slice(5, 26)} `

                const date = new Moment(slicedDate);


                if (date) {
                    eventData.title = eventPageDom.querySelector("h1").textContent;

                    const dateOfEvent = new Moment(date).format('DD MMMM YYYY');
                    const timeOfEvent = new Moment(date).format('LT');


                    eventData.date = dateOfEvent;
                    eventData.time = timeOfEvent;

                    eventData.location = eventAddress;
                    eventData.city = "Hamburg";
                    let description = eventPageDom.querySelector("[data-automation='listing-event-description']").textContent
                    eventData.description = description.trim()
                    eventData.url = eventUrl
                    eventData.img = allImgConventions[Math.floor(Math.random() * allImgConventions.length)];
                    eventData.imgUrl = allImgConventions[0];
                    allImgConventions.shift()

                    const dataForSave = new Convention(eventData)

                    dataForSave.save().then(() => {
                        console.log(eventData.title, "saved")
                    }).catch(err => {
                        console.log(err, eventData.title, "saved")

                    });
                }

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

            got(eventUrl).then(data => {
                const eventPageDom = new JSDOM(data.body.toString()).window.document;
                let eventData = {};
                const eventDate = eventPageDom.querySelector(".js-date-time-first-line").textContent;
                const slicedDate = `${eventDate.slice(5, 26)} `

                const date = new Moment(slicedDate);


                if (date) {
                    eventData.title = eventPageDom.querySelector("h1").textContent;

                    const dateOfEvent = new Moment(date).format('DD MMMM YYYY');
                    const timeOfEvent = new Moment(date).format('LT');

                    eventData.date = dateOfEvent;
                    eventData.time = timeOfEvent;


                    eventData.location = eventAddress;
                    eventData.city = "Munich";
                    let description = eventPageDom.querySelector("[data-automation='listing-event-description']").textContent
                    eventData.description = description.trim()
                    eventData.url = eventUrl
                    // eventData.img = allImgConventions[Math.floor(Math.random() * allImgConventions.length)];
                    eventData.imgUrl = allImgConventions[0];
                    allImgConventions.shift()
                    const dataForSave = new Convention(eventData)

                    dataForSave.save().then(() => {
                        console.log(eventData.title, "saved")
                    }).catch(err => {
                        console.log(err, eventData.title, "saved")

                    });
                }
            })
        })

    })


}

fetchImgConventions()




