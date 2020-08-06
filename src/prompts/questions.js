const stopSharing = {
    type: "text",
    message: "Do you want to stop sharing(Type exit to exit)",
    name: "value",
}

let whatToDo = {
    type: "select",
    message: "what do you want to do?",
    name: "value",
    choices: [
        { title: "exit", value: "exit" },
        { title: "download and emit", value: "download" },
        { title: "capture download", value: "capture" },
    ],
};



module.exports = {
    stopSharing,
    whatToDo
}