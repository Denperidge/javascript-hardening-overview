
function elementsApply(querySelector, func) {
    const elements = document.querySelectorAll(querySelector);
    for (let i=0; i < elements.length; i++) {
        func(elements[i]);
    }
}

function elementsOn(querySelector, event, func) {
    elementsApply(querySelector, (elem) => {
        elem.addEventListener(event, func);
    });
}

function showInputsInScope() {
    const tool = document.querySelector("[name='tool']:checked").value;
    const scope = document.querySelector("[name='scope']:checked").value;
    
    const showIf = `-${tool}-${scope}-`;

    elementsApply(`.feature[data-show-if]`,
        elem => elem.setAttribute("style", "opacity: 0.5"))
    elementsApply(`.feature[data-show-if*="${showIf}"]`,
        elem => elem.setAttribute("style", "opacity: 1"));

    elementsApply(`.implementation:not([data-show-if*="${showIf}"])`,
        elem => elem.setAttribute("style", "display: none"));
    elementsApply(`.implementation[data-show-if*="${showIf}"]`,
        elem => elem.setAttribute("style", "display: initial"));
}

function generateOutput() {
    
}


elementsOn("#general-settings input", "click", showInputsInScope);
elementsOn("#inputs input", "input", generateOutput);


showInputsInScope();
