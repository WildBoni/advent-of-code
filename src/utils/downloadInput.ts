import { get } from "https";

type DownloadProps = {
  url: string;
  token: string;
};

// Based on MaxArt2501 repo: https://github.com/MaxArt2501/advent-of-code-2023/blob/main/retrieve.js
export default function download({ url, token }: DownloadProps) {
  return new Promise((resolve, reject) => {
    get(url, { headers: { Cookie: `session=${token};` } }, res => {
      if (res.statusCode !== 200) {
        reject(Error(`Cannot get '${url}'`));
        return;
      }
      let result = "";
      res.setEncoding("utf-8");
      res.on("data", chunk => (result += chunk));
      res.on("end", () => resolve(result));
    }).on("error", reject);
  });
}
