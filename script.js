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

const selectElement = (type, name, label, selectOptions) => {
    let optionElements = "";
    for (const option of selectOptions) {
        optionElements += `<option>${option}</option>`
    }
    return `
    <div>
        <label>${label}</label>
        <${type} name="${name}">
            ${optionElements}
        <${type}>
    </div>
`

}

/* const formElement = '<form id="form">' + inputElement("text", "firstName", "keresztneved") + inputElement("file", "profilePicture", "profilneved") + inputElement("email", "personalEmail", "email címed") + inputElement("radio", "newsletter", "szeretnél-e hírlevelet") + inputElement("checkbox", "terms", "elfogadod-e")
*/
const formElement = `
    <form id="form">
        <h1>Felmérés</h1>
        ${ inputElement("text", "firstName", "keresztneved:") }
        ${ inputElement("email", "personalEmail", "email címed:") }
        ${ inputElement("file", "profilePicture", "profilképed:") }
        ${ selectElement("select", "where", "hol hallottad?", ["válassz", "Internetről", "vagyez"]) }
        ${ inputElement("checkbox", "newsletter", "szeretnél-e hírlevelet?") }
        ${ inputElement("checkbox", "terms", "elfogadod-e?") }
        <button>OK</button>
    </form>
`;

const formSubmit = (event) => {
    event.preventDefault();
    //console.log(event);
    const et = event.target;
    et.classList.add("submitted");
    const etValue = et.querySelector(`select[name="where"]`).value;
    console.log(etValue);
}



const inputEvent = (event) => {
    console.log(event.target.value);
    const fName = document.querySelector(`input[name="firstName"]`)
    let tryForm = event.target.closest("#form");
    if (event.target.name === "firstName"){
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