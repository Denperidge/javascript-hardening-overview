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
    const toolElem = document.querySelector("[name='tool']:checked");
    const scope = getScope(false);

    elementsApply(`.feature:not([data-show-if*="${showIf}"])`,
        elem =>  elem.disabled = true)
    elementsApply(`.feature[data-show-if*="${showIf}"]`,
        elem => elem.disabled = false);

    elementsApply(`.implementation:not([data-show-if*="${showIf}"])`,
        elem => elem.setAttribute("style", "display: none"));
    elementsApply(`.implementation[data-show-if*="${showIf}"]`,
        elem => elem.setAttribute("style", "display: initial"));
    

    let filename = toolElem.dataset[scope];
    if (filename) {
        if (scope == "project") { filename = "/path/to/repo/" + filename}
        document.getElementById("filename").innerText = filename;
    } else {
        document.getElementById("filename").innerText = "";
    }

    document.getElementById("prettify-comments")
        .disabled = (toolElem.dataset[scope + "Comment"] == undefined);

    generateOutput();
}

function generateOutput() {
    let out = "";
    const scope = getScope(false);
    const tool = document.querySelector("[name='tool']:checked");
    
    const addComments = document.querySelector("#pretty-comments").checked;
    const addDocsUrl = document.querySelector("#pretty-docs").checked;
    const newlines = document.querySelector("#pretty-newlines").value || 0;
    const commentPrefix = tool.dataset[scope + "Comment"];

    // Iterate over features
    elementsApply(".feature", (elem) => {
        // If feature enabled
        if (elem.querySelector(`[name="enable-feature"]:checked`)) {
            
            // collect relevant implementations
            const implementation = elem.querySelectorAll(`.implementation[data-show-if*="${getScope()}"`)
            if (implementation.length > 1) {
                console.warn(`Wrong amount of implementations found for scope ${getScope()} (${implementation.length} instead of 1)`);
                console.warn(implementation)
            } else if (implementation.length == 0) {
                console.log("No implementation found")
            } else {
                const impl = implementation[0];

                // Prettify (1)
                if (addComments || addDocsUrl) {
                    if (addComments) {
                        let title;

                        const select = impl.querySelector("select");
                        const capitalisedScope = scope[0].toUpperCase() + scope.substring(1);
                        if (select && select.dataset["template" + capitalisedScope] && select.dataset["template" + capitalisedScope].includes("@@@")) {
                            title = select.value;
                        } else {
                            title = elem.querySelector("legend").innerText;
                        }
                        out += `${commentPrefix} ${title}`;
                    }
                    if (addComments & addDocsUrl) { out += "\n"; }
                    if (addDocsUrl) {
                        out += `${commentPrefix} ${elem.querySelector(".docs-link").href}`
                    }
                    out += "\n";
                }

                const input = impl.querySelector(`input[data-template-${scope}], select[data-template-${scope}]`);

                const templateId = "template" + scope[0].toUpperCase() + scope.substring(1);
                const template = input.dataset[templateId];
                if (input.tagName == "SELECT" && template.includes("@@@")) {
                    out += template.split("@@@")[input.selectedIndex];
                } else {
                    const value = input.type != "checkbox" ? input.value : input.checked 
                    out += template.replace("{0}", value);
                }
                out += "\n";

                // Prettify (2)
                for (let i=0; i < newlines; i++) {
                    out += "\n"
                }

            }
        }
    });
    document.getElementById("out").value = out;
}


elementsOn("#general-settings input, #general-settings select", "click", showInputsInScope);
elementsOn("#inputs input, #inputs select", "input", generateOutput);


showInputsInScope();
