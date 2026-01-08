function getScope(full=true) {
    const scope = document.querySelector("[name='scope']:checked").value;
    if (!full) return scope;

    const tool = document.querySelector("[name='tool']:checked").value;
    return `-${tool}-${scope}-`;
}

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
    const showIf = getScope();

    elementsApply(`.feature:not([data-show-if*="${showIf}"])`,
        elem =>  elem.disabled = true)
    elementsApply(`.feature[data-show-if*="${showIf}"]`,
        elem => elem.disabled = false);

    elementsApply(`.implementation:not([data-show-if*="${showIf}"])`,
        elem => elem.setAttribute("style", "display: none"));
    elementsApply(`.implementation[data-show-if*="${showIf}"]`,
        elem => elem.setAttribute("style", "display: initial"));
    

    const scope = getScope(false);
    let filename = document.querySelector("input[name='tool']:checked").dataset[scope];
    if (filename) {
        if (scope == "project") { filename = "/path/to/repo/" + filename}
        document.getElementById("filename").innerText = filename;
    } else {
        document.getElementById("filename").innerText = "";
    }

    generateOutput();
}

function generateOutput() {
    let out = "";

    // Iterate over features
    elementsApply(".feature", (elem) => {
        // If feature enabled
        if (elem.querySelector(`[name="enable-feature"]:checked`)) {
            // collect relevant implementations
            const implementation = elem.querySelectorAll(`.implementation[data-show-if*="${getScope()}"`)
            if (implementation.length != 1) {
                console.error(`Wrong amount of implementations found for scope ${getScope()} (${implementation.length} instead of 1)`);
                console.error(implementation)
            } else {
                const impl = implementation[0];
                const scope = getScope(false);

                const input = impl.querySelector(`input[data-template-${scope}]`);

                const templateId = "template" + scope[0].toUpperCase() + scope.substring(1);
                const template = input.dataset[templateId];
                const value = input.value
                out += template.replace("{0}", value) + "\n";
            }
        }
    });
    document.getElementById("out").textContent = out;
}


elementsOn("#general-settings input", "click", showInputsInScope);
elementsOn("#inputs input", "input", generateOutput);


document.addEventListener("ready", showInputsInScope);
