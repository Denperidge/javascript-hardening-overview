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

                        const dataShowIf = ["project", "global"].map(scope => {
                            if (cfgGen[scope]) {
                                outputTemplate += `data-template-${scope}="${cfgGen[scope]}"`;
                                const showIf =`-${toolId}-${scope}-`;  // surround in dashes for anti false positive (npm & pnpm)
                                featureShowIf.add(showIf)
                                return showIf
                            }
                        });

                        featureInputs += 
                            `<div class="implementation" data-show-if="${dataShowIf}">` +
                                `<input id="${inputId}" type="${inputType}" ${outputTemplate}/>` +
                                note + url +
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