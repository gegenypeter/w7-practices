/*
function functionName(){}
const functionName = function (){}
const functionName = () => {}
*/
const input = () => {
    `
    <input type="text">
`
}
const form = `
    <form id="form">
        ${ input("text") }
    </form>
`

function loadEvent() {
    const root = document.getElementById("root");
    root.insertAdjacentElement("beforeend", form);
}

window.addEventListener('load', loadEvent);