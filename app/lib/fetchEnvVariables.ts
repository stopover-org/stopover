import { IApiKeys } from "../components/ApiKeysProvider";

export const envVariables: { [key: string]: string } = {
  googleMaps: "GOOGLE_MAPS_API_KEY",
  filestack: "FILESTACK_API_KEY",
};

export function fetchEnvVariables() {
  return Object.entries(envVariables).reduce((envs, [key, env]) => {
    envs[key] = process.env[env] || "";
    return envs;
  }, {} as IApiKeys);
}
