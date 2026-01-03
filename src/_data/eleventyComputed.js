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
            console.log(feature)
            for (let i = 0; i < toolIds.length; i++) {
                const toolId = toolIds[i];
                console.log(toolId)
                const implementation = feature.implementations[toolId];
                
                let prettyPrint = "";                
                if (implementation == undefined) {
                    feature.implementations[toolId] = {
                        prettyPrint: "❌ Not implemented"
                    }
                } else if (implementation.warning) {
                    feature.implementations[toolId].prettyPrint += "⚠️ " + implementation.note;
                }
            }
            return feature;
        });
    }
}