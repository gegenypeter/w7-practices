/*
Függvények metódusai


function functionName(parameter){
    parameter === "argument as a string";
}
functionName("argument as a string");


const argument = "argument as a string";

const functionName = function (paramenter){}
functionName(argument);


const functionName = () => {}
functionName();
*/

const input = (type) => {
    return `
        <input type="${type}">
    `
}
const form = `
    <form id="form">
        ${ input("text") }
        ${ input("file") }
        ${ input("email") }
        ${ input("radio") }
        ${ input("chackbox") }
    </form>
`

function loadEvent() {
    const root = document.getElementById("root");
    root.insertAdjacentHTML("beforeend", form);
}

window.addEventListener('load', loadEvent);