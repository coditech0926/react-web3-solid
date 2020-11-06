import SolidAuthClient from "solid-auth-client";
import SolidFileClient from "solid-file-client";
import { getContainerUrl } from "./utils";

class File {
  private fileClient;
  constructor() {
    this.fileClient = new SolidFileClient(SolidAuthClient);
  }

  upload = async (file: any, url?: string) => {
    try {
      let containerUrl = await getContainerUrl("/public/attachment/");
      const res = await this.fileClient.putFile(
        url || `${containerUrl}${+new Date()}-${file.name}`,
        file,
        file.type
      );
      return res;
    } catch (err) {
      console.error(err);
    }
  };
}

export default new File();
