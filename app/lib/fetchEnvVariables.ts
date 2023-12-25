export const envVariables: { [key: string]: string } = {
  googleMaps: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY",
  filestack: "NEXT_PUBLIC_FILESTACK_API_KEY",
  chatraApiKey: "NEXT_PUBLIC_CHATRA_API_KEY",
};

export function fetchEnvVariables() {
  return Object.entries(envVariables).reduce((envs, [key, env]) => {
    envs[key] = process.env[env] || "";
    return envs;
  }, {} as typeof envVariables);
}
