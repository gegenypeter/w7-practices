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

const inputElement = (type, name, label) => {
    return `
        <div>
            <label>${label}</label>
            <input type="${type}"name="${name}">
        </div>
    `
}
const formElement = `
    <form id="form">
        ${ inputElement("text", "firstName", "keresztneved") }
        ${ inputElement("file", "profilePicture", "profilneved") }
        ${ inputElement("email", "personalEmail", "email címed") }
        ${ inputElement("radio", "newsletter", "szeretnél-e hírlevelet") }
        ${ inputElement("checkbox", "terms", "elfogadod-e") }
        <button>OK</button>
    </form>
`;

const formSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    event.target.classList.add("submitted");
}



const inputEvent = (event) => {
    console.log(event.target.value);
    if (event.target.name != "firstName"){}
    else {
    document.getElementById("inputValueContent").innerHTML = event.target.value;
    }
};

function loadEvent() {
    const root = document.getElementById("root");
    root.insertAdjacentHTML("beforeend", formElement);
    root.insertAdjacentHTML("beforeend", `
    <div id="inputValueContent"></div>
    `);

    const form = document.getElementById("form");
    form.addEventListener("submit", formSubmit);
    

    const inputList = form.querySelectorAll("input");
    for (const input of inputList) {
        input.addEventListener("input", inputEvent)
    }
}
window.addEventListener('load', loadEvent);

//átalakítani: megvizsgálni inputelemen belül, ha az aktuális inputnak a name attribútuma "firstName" csak akkor írja bele ebbe a div-be a tartalmat