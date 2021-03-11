export interface ConfigModel {
    apiUrl: string;
    buildVersion: string;
}

export const defaultConfigModel: ConfigModel = {
    apiUrl: "",
    buildVersion: "",
};