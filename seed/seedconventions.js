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

const eventilEventBerlin = "https://eventil.com/events?utf8=%E2%9C%93&q%5Bcfp_open%5D=&q%5Bonline_scope%5D=&q%5Bpast%5D=&q%5Bsearch_for%5D=developer+&q%5Bwhere_scope%5D=berlin&q%5Btime%5D=&button=";

got(eventilEventBerlin).then(res => {
    const eventsPageDom = new JSDOM(res.body.toString()).window.document;
    const eventsParentElement = eventsPageDom.querySelector(".events-list");
    const eventsElements = eventsParentElement.querySelectorAll("li")
    eventsElements.forEach(event => {
        const eventUrl = `https://eventil.com${event.querySelector("div").querySelector("a").getAttribute("href")}`
        const eventAddress = event.querySelector("div").querySelector("p").textContent;
        const address = eventAddress.trim()
        // console.log(address)
        got(eventUrl).then(data => {
            const eventPageDom = new JSDOM(data.body.toString()).window.document;
            let eventData = {};
            let title = eventPageDom.querySelector("h1").textContent.trim();
            eventData.title = title;
            let date = eventPageDom.querySelector(".banner-ticket__date").querySelectorAll("time")[0].textContent.trim();
            eventData.date = date;
            eventData.location = address;
            eventData.city = "Berlin";
            eventData.description = eventPageDom.querySelector(".event-description").querySelector("p").textContent;
            const bg = eventPageDom.querySelector(".banner-image").style.backgroundImage
            const img = bg.slice(4, -1).replace(/"/g, "");
            eventData.img = img;
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

const eventilEventHamburg = "https://eventil.com/events?utf8=%E2%9C%93&q%5Bcfp_open%5D=&q%5Bonline_scope%5D=&q%5Bpast%5D=&q%5Bsearch_for%5D=developer&q%5Bwhere_scope%5D=hamburg&q%5Btime%5D=&button="

got(eventilEventHamburg).then(res => {
    const eventsPageDom = new JSDOM(res.body.toString()).window.document;
    const eventsParentElement = eventsPageDom.querySelector(".events-list");
    const eventsElements = eventsParentElement.querySelectorAll("li")
    eventsElements.forEach(event => {
        const eventUrl = `https://eventil.com${event.querySelector("div").querySelector("a").getAttribute("href")}`
        const eventAddress = event.querySelector("div").querySelector("p").textContent;
        const address = eventAddress.trim()
        // console.log(address)
        got(eventUrl).then(data => {
            const eventPageDom = new JSDOM(data.body.toString()).window.document;
            let eventData = {};
            let title = eventPageDom.querySelector("h1").textContent.trim();
            eventData.title = title;
            let date = eventPageDom.querySelector(".banner-ticket__date").querySelectorAll("time")[0].textContent.trim();
            eventData.date = date;
            eventData.location = address;
            eventData.city = "Hamburg";
            eventData.description = eventPageDom.querySelector(".event-description").querySelector("p").textContent;
            const bg = eventPageDom.querySelector(".banner-image").style.backgroundImage
            const img = bg.slice(4, -1).replace(/"/g, "");
            eventData.img = img;
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

const eventilEventMunich = "https://eventil.com/events?utf8=%E2%9C%93&q%5Bcfp_open%5D=&q%5Bonline_scope%5D=&q%5Bpast%5D=&q%5Bsearch_for%5D=developer&q%5Bwhere_scope%5D=munich&q%5Btime%5D=&button="

got(eventilEventMunich).then(res => {
    const eventsPageDom = new JSDOM(res.body.toString()).window.document;
    const eventsParentElement = eventsPageDom.querySelector(".events-list");
    const eventsElements = eventsParentElement.querySelectorAll("li")
    eventsElements.forEach(event => {
        const eventUrl = `https://eventil.com${event.querySelector("div").querySelector("a").getAttribute("href")}`
        const eventAddress = event.querySelector("div").querySelector("p").textContent;
        const address = eventAddress.trim()
        // console.log(address)
        got(eventUrl).then(data => {
            const eventPageDom = new JSDOM(data.body.toString()).window.document;
            let eventData = {};
            let title = eventPageDom.querySelector("h1").textContent.trim();
            eventData.title = title;
            let date = eventPageDom.querySelector(".banner-ticket__date").querySelectorAll("time")[0].textContent.trim();
            eventData.date = date;
            eventData.location = address;
            eventData.city = "Munich";
            eventData.description = eventPageDom.querySelector(".event-description").querySelector("p").textContent;
            const bg = eventPageDom.querySelector(".banner-image").style.backgroundImage
            const img = bg.slice(4, -1).replace(/"/g, "");
            eventData.img = img;
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