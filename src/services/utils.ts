import SolidAuthClient from "solid-auth-client";

async function getContainerUrl(path: string) {
  const session = await SolidAuthClient.currentSession();
  return new URL(path, session.webId).toString();
}

export { getContainerUrl };
