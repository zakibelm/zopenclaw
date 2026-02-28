
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const HOME = os.homedir();
const OPENCLAW_JSON_PATH = path.join(HOME, ".openclaw", "openclaw.json");

async function main() {
  console.log("Reading openclaw.json...");
  const raw = await fs.readFile(OPENCLAW_JSON_PATH, "utf-8");
  const config = JSON.parse(raw);

  if (!config.agents || !config.agents.list || config.agents.list.length === 0) {
    console.error("No agents found in config!");
    process.exit(1);
  }

  // Check if any agent is already default
  const hasDefault = config.agents.list.some(a => a.default);
  if (hasDefault) {
    console.log("Default agent already exists.");
    return;
  }

  // Set the first agent as default
  const firstAgent = config.agents.list[0];
  firstAgent.default = true;
  console.log(`Setting agent '${firstAgent.id}' (${firstAgent.name}) as default.`);

  await fs.writeFile(OPENCLAW_JSON_PATH, JSON.stringify(config, null, 2), "utf-8");
  console.log("Updated openclaw.json");
}

main().catch(console.error);
