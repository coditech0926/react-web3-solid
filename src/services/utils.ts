import SolidAuthClient from "solid-auth-client";

async function getContainerUrl(path: string, url?: string) {
  if (url) {
    return new URL(path, url).toString();
  } else {
    const session = await SolidAuthClient.currentSession();
    return new URL(path, session.webId).toString();
  }
}

export { getContainerUrl };
