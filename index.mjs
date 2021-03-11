import fs from "fs";
// import { messenger } from "./examples/messages-provider.mjs";
import { messenger } from "../data/messages-provider.mjs";
import { start } from "./lib/producer.mjs";

(async () => {
  try {
    const { name, version } = JSON.parse(
      fs.readFileSync("package.json", "utf-8")
    );

    const options = {
      clientId: `${name}@${version}`,
      messenger,
    };

    await start(options);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
