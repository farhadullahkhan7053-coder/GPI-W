import { getSettings } from "./lib/content.js";

async function test() {
  console.log("Testing getSettings()");
  try {
    const res = await getSettings();
    console.log("Result:", res.institute_name);
  } catch (err) {
    console.error("Error caught:", err);
  }
}

test();
