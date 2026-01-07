
function elementsOnClick(querySelector, func) {
    const elements = document.querySelectorAll(querySelector);
    for (let i=0; i < elements.length; i++) {
        elements[i].addEventListener("click", func);
    }
}

function showInputsInScope() {
    const tool = document.querySelector("[name='tool']:checked").value;
    const scope = document.querySelector("[name='scope']:checked").value;
    
    const showIf = `${tool}-${scope}`;

    const allShowIfElements = document.querySelectorAll(`[data-show-if]`);
    for (let i = 0; i < allShowIfElements.length; i++) {
        allShowIfElements[i].setAttribute("style", "opacity: 0.5")
    }

    const showIfElements = document.querySelectorAll(`[data-show-if*="${showIf}"]`);;
    console.log(showIfElements)
    for (let i = 0;  i < showIfElements.length; i++) {
        showIfElements[i].setAttribute("style", "opacity: 1")

    }

}

elementsOnClick("#general-settings input", showInputsInScope);

