import got from "got";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export default async function handler(req, res) {

    let cases
    let deaths
    let recovered


    await  got("https://www.worldometers.info/coronavirus/")
        .then(res =>new JSDOM(res.body))
        .then(res =>{
            const counter = res.window.document.querySelectorAll("#maincounter-wrap")
            cases = counter[0].querySelector("span").textContent
            deaths = counter[1].querySelector("span").textContent
            recovered = counter[2].querySelector("span").textContent
        })

    res.status(200).json({ cases:cases,deaths:deaths,recovered:recovered})

}