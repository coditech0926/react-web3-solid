import SolidAuthClient from "solid-auth-client";
import SolidFileClient from "solid-file-client";

class File {
  private fileClient;
  constructor() {
    this.fileClient = new SolidFileClient(SolidAuthClient);
  }
  upload = async (file: any, url: string) => {
    try {
      const res = await this.fileClient.putFile(url, file, file.type);
      return res;
    } catch (err) {
      console.error(err);
    }
  };
}

export default new File();
