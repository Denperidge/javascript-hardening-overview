import markdownIt from "markdown-it";
const md = markdownIt();

const keys = ["packageManagers", "runtimes", "saferInstallers", "packageAuditers"]

function processSchemaData(data, key="packageManagers") {
    const schemaData = data[key];

    const toolIds = data[key].tools.map(tool => tool.id);
    schemaData.toolIds = toolIds;
    schemaData.features = data[key].features.map(feature => {
        for (let i = 0; i < toolIds.length; i++) {
            const toolId = toolIds[i];
            const implementation = feature.implementations[toolId];

            if (implementation != undefined) {
                const hasNote = Object.keys(implementation).includes("note");
                if (hasNote) {
                    implementation.note = md.renderInline(implementation.note)
                }

                if (implementation.warning) {
                    feature.implementations[toolId].prettyPrint = "⚠️ " + implementation.note;
                } else if (implementation.config) {
                    if (!hasNote) { implementation.note = "If configured"};
                    feature.implementations[toolId].prettyPrint = "🛠️ " + implementation.note;
                } else if (implementation.need_more_info) {
                    if (!hasNote) { implementation.note = "Need more info"};
                    feature.implementations[toolId].prettyPrint = "❔ " + implementation.note;
                } else if (implementation.note == "N/A") {
                    feature.implementations[toolId].prettyPrint = implementation.note;
                } else {
                    if (!hasNote) {
                        if (implementation.defaultValue) {
                            implementation.note = `Yes, ${implementation.defaultValue} default`;
                        } else {
                            implementation.note = "By default";
                        }
                    };
                    feature.implementations[toolId].prettyPrint = "✅ " + implementation.note;;
                }
            }
        }
        return feature;
    })
    return schemaData;
}

export default {
    eleventyComputed: {
        dataSets: (data) => {
            return keys.map(key => processSchemaData(data, key));
        }
    }
}