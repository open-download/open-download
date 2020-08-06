const prompt = require("prompts");
const questionsFile = require("./questions.js");
const events =require("../utils/events")

async function display(name) {
        let question;

        if (name === "StopSharing"){
            question = questionsFile.stopSharing;
            show(question, function (response) {
                events.emit("StopSharing", {response})
            })
        }
        else if (name === "whatToDo"){
            question = questionsFile.whatToDo
            show(question, function (response) {
                events.emit("whatToDo", {response})
            })
        }
        else {
            console.log("test")
        }



}
function show(question, cb){
    (async ()=>{
        let response;
        response = await prompt(question);
        response = response.value;
        cb(response)
    })()
}

module.exports ={
    display: display
}