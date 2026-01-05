function getToolIds(data) {
    return data.packageManagers.tools.map(tool => tool.id);
}

export default {
    tools: (data) => {
        return data.packageManagers.tools;
    },
    toolIds: (data) => {
        return getToolIds(data);
    },
    features: (data) => {
        const toolIds = getToolIds(data)
        return data.packageManagers.features.map(feature => {
            for (let i = 0; i < toolIds.length; i++) {
                const toolId = toolIds[i];
                const implementation = feature.implementations[toolId];

                if (implementation == undefined) {
                    feature.implementations[toolId] = {
                        prettyPrint: "❌ Not implemented"
                    }
                } else {
                    const hasNote = Object.keys(implementation).includes("note");

                    if (implementation.warning) {
                        feature.implementations[toolId].prettyPrint = "⚠️ " + implementation.note;
                    } else if (implementation.config) {
                        if (!hasNote) { implementation.note = "If configured"};
                        feature.implementations[toolId].prettyPrint = "🛠️ " + implementation.note;
                    } else if (implementation.note == "N/A") {
                        feature.implementations[toolId].prettyPrint = implementation.note;
                    } else {
                        if (!hasNote) {
                            if (implementation.defaultValue) {
                                feature.implementations[toolId].prettyPrint = `✅ Yes, ${implementation.defaultValue} default`;
                            } else {
                                feature.implementations[toolId].prettyPrint = "✅ By default";
                            }
                        };
                    }
                }
            }
            return feature;
        });
    }
}