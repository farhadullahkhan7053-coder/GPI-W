import { getSettings } from "./lib/content.js";

async function main() {
  console.log("Starting...");
  try {
    const settings = await getSettings();
    console.log("Settings:", settings.institute_name);
  } catch (error) {
    console.error("CAUGHT ERROR:", error);
  }
}

main();
