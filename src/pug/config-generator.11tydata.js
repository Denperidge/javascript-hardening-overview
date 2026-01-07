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

                for (let j=0; j < toolIds.length; j++) {
                    const toolId = toolIds[j];
                    const impl = implementations[toolId];
                    if (impl.config_generator) {
                        const cfgGen = impl.config_generator;
                        const inputType = cfgGen.arg;
                        const dataShowIf = ["project", "global"].map(scope => {
                            if (cfgGen[scope]) {
                                const showIf =`${toolId}-${scope}`;
                                featureShowIf.add(showIf)
                                return showIf
                            }
                        });
                        featureInputs += `<input data-show-if="${dataShowIf}" type="${inputType}"/>`
                    }
                }

                if (featureInputs !== "") {
                    const showIf = Array.from(featureShowIf).join(",");
                    allInputs += `<fieldset data-show-if="${showIf}"><legend>${feature.title}</legend>${featureInputs}</fieldset>`
                }
            }

            return allInputs;
        }
    }
}