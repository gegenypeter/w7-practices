
const inputElement = (type, name, label, req = "") => {

    return `
        <div class="${type}">
            <label>${label}</label>
            <input type="${type}"name="${name}" ${req} >
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


/*
const nameData = {
    type: "text",
    name: "firstName",
    label: "Keresztnév"
}
*/

const processCountries = async () => {

    const countryRes = await fetch("https://restcountries.com/v3.1/all");
    const countryArr = await countryRes.json();


    let arr = [];
    for (const country of countryArr) {
        let countryName = country.name.official;
        arr.push(countryName);
    }
    return arr
}

const temp = processCountries();
console.log(temp);
//processCountries();

/*
const anotherSelectFields = {
    type: "select",
    name: "conutries",
    label: "ország",
   // options: processCountries(),
   options: ["válassz", "Internetről", "vagyez", "vagy akár ez"]
}
*/
const anotherSelectFields = async () => {
    return {
        type: "select",
        name: "conutries",
        label: "ország",
        options: await processCountries()
    }
}

const anotherformFields = [
    {
        type: "text",
        name: "street",
        label: "közterület neve"
    },
    {
        type: "text",
        name: "houseNumber",
        label: "házszám"
    },
    {
        type: "number",
        name: "zipCode",
        label: "irányítószám"
    },
    {
        type: "text",
        name: "city",
        label: "település neve"
    },

]


const formFields = [
    {
        type: "text",
        name: "firstName",
        label: "Keresztnév:"
    },
    {
        type: "email",
        name: "personalEmail",
        label: "email címed:",
        required: "required"
    },
    {
        type: "file",
        name: "profilePicture",
        label: "profilképed:"
    },
    {
        type: "checkbox",
        name: "newsletter",
        label: "szeretnél hírlevelet?"
    },
    {
        type: "checkbox",
        name: "terms",
        label: "elfogadod az ÁSZF-et?"
    }
];


const selectFields = {
    type: "select",
    name: "where",
    label: "hol hallottad?",
    options: ["válassz", "Internetről", "vagyez", "vagy akár ez"]
}

/*
const formElement = `
    <form id="form">
        <h1>Felmérés</h1>
        ${ inputElement(nameData.type, nameData.name, nameData.label) }
        ${ inputElement("email", "personalEmail", "email címed:", "required") }
        ${ inputElement("file", "profilePicture", "profilképed:") }
        ${ selectElement("select", "where", "hol hallottad?", ["válassz", "Internetről", "vagyez", "vagy akár ez"]) }
        ${ inputElement("checkbox", "newsletter", "szeretnél-e hírlevelet?") }
        ${ inputElement("checkbox", "terms", "elfogadod-e?") }
        <button>OK</button>
    </form>
`;
*/

const formElement = (ffs, id, sel) => {
    let toForm = "";
    for (const ff of ffs) {
        toForm += inputElement(ff.type, ff.name, ff.label, ff.required);
    }
    return `
    <form id="${id}">
        <h1>Felmérés</h1>
        ${toForm}
        ${selectElement(sel.type, sel.name, sel.label, sel.options)}
        <button>OK</button>
    </form>
`
}

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

    if (event.target.name === "firstName") {
        document.getElementById("inputValueContent").innerHTML = event.target.value;
    }
    if (event.target.getAttribute("name") === "profilePicture") {
        const image = URL.createObjectURL(event.target.files[0])
        document.getElementById("inputValueContent").insertAdjacentHTML("beforeend", `<img src="${image}">`)
    }
};

async function loadEvent() {
    const waitAnotherSelectFields = await anotherSelectFields();

    const root = document.getElementById("root");

    root.insertAdjacentHTML("beforeend", formElement(formFields, "form", selectFields));

    root.insertAdjacentHTML("beforeend", formElement(anotherformFields, "form2", waitAnotherSelectFields));

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