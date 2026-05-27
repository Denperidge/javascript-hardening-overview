export default {
    eleventyComputed: {
        inputs: (data) => {
            const dataSet = data.dataSets[0]
            if (!dataSet) return;  // Eleventy freakout preventor

            const features = dataSet.features
            const tools = dataSet.tools;
            //const toolIds = dataSet.toolIds;

            let allInputs = "";

            for (let i=0; i < features.length; i++) {
                const feature = features[i];
                const implementations = feature.implementations;
                const toolIds = Object.keys(implementations);

                let featureInputs = "";
                const featureShowIf = new Set();

                // Every implementation
                for (let j=0; j < toolIds.length; j++) {
                    const toolId = toolIds[j];
                    const impl = implementations[toolId];
                    if (impl.config_generator) {
                        const cfgGen = impl.config_generator;
                        const inputType = cfgGen.arg;
                        const inputId = `feature-${i}-input-${toolId}`
                        const note = cfgGen.note ? `<label for="${inputId}">${cfgGen.note}</label>` : "";
                        let url = cfgGen.url || impl.url;
                        if (url) {
                            url = `<a class="docs-link" href="${url}">docs</a>`
                        };
                        let outputTemplate = "";

                        const cfgGenKeys = Object.keys(cfgGen);
                        // if ["note"] || ["note", "url"]
                        const noteOnly = cfgGenKeys.includes("note") && (cfgGenKeys.length == 1 || (cfgGenKeys.length == 2 && cfgGenKeys.includes("url")));

                        const dataShowIf = ["project", "global"].map(scope => {
                            if (cfgGen[scope]) {
                                let scopeTemplate = cfgGen[scope];
                                if (scopeTemplate instanceof Array) {
                                    scopeTemplate = scopeTemplate.join("@@@")
                                }

                                outputTemplate += `data-template-${scope}="${scopeTemplate}"`;
                                const showIf =`-${toolId}-${scope}-`;  // surround in dashes for anti false positive (npm & pnpm)
                                featureShowIf.add(showIf)
                                return showIf
                            } else if (noteOnly) {
                                return `-${toolId}-${scope}-`;  // surround in dashes for anti false positive (npm & pnpm)
                            }
                        });

                        let input = "";
                        if (!noteOnly) {
                            input = inputType != "select" ?
                            `<input id="${inputId}" type="${inputType}" ${outputTemplate}/>`
                            : `<select id="${inputId}" ${outputTemplate}>` +
                                cfgGen.options.map(opt => `<option>${opt}</option>`) +
                            "</select>";
                        }

                        featureInputs += 
                            `<div class="implementation" data-show-if="${dataShowIf}">`  +
                                input + note + url +
                            "</div>";
                    }
                }

                if (featureInputs !== "") {
                    const showIf = Array.from(featureShowIf).join(",");
                    const enableId = `enable-feature-${i}`
                    allInputs += 
                        `<fieldset class="feature" data-show-if="${showIf}">` +
                            `<legend><input id="${enableId}" type="checkbox" name="enable-feature" />` +
                                `<label for="${enableId}">${feature.title}</label>` +
                            "</legend>" +
                            featureInputs +
                        "</fieldset>";
                }
            }

            return allInputs;
        }
    }
}