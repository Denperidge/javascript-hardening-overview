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

                for (let j=0; j < toolIds.length; j++) {
                    const toolId = toolIds[j];
                    const impl = implementations[toolId];
                    if (impl.config_generator) {
                        const cfgGen = impl.config_generator;
                        const inputType = cfgGen.arg;
                        const dataShowIf = ["project", "global"].map(scope => {
                            if (cfgGen[scope]) {
                                return `${toolId}-${scope}`
                            }
                        });
                        featureInputs += `<input type="${inputType}"/>`

                    }
                }

                if (featureInputs !== "") {
                    allInputs += `<fieldset><legend>${feature.title}</legend>${featureInputs}</fieldset>`
                }
            }

            return allInputs;
        }
    }
}