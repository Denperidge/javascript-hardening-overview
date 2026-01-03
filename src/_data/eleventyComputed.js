export default {
    tools: (data) => {
        return data.packageManagers.tools;
    },
    toolKeys: (data) => {
        return Object.keys(data.packageManagers.tools);
    },
    features: (data) => {
        return data.packageManagers.features;
    }
}