
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

// Hardcoded for 'dev' profile
const PROFILE_DIR = path.join(os.homedir(), ".openclaw-dev");
const CONFIG_PATH = path.join(PROFILE_DIR, "openclaw.json");

const VIBE_CODING_AGENTS = [
  "coding-agent",
  "codeinterpreter-automation",
  "artifacts-builder",
  "v0-automation",
  "vercel-automation",
  "render-automation",
  "neon-automation",
  "supabase-automation",
  "npm-automation",
  "docker-hub-automation",
  "digital-ocean-automation",
  "stack-exchange-automation" // StackOverflow
];

async function main() {
  console.log(`Reading config from ${CONFIG_PATH}...`);
  let config;
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf-8");
    config = JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read config:", err);
    process.exit(1);
  }

  if (!config.agents) config.agents = {};
  if (!config.agents.list) config.agents.list = [];

  const existingIds = new Set(config.agents.list.map(a => a.id));
  let addedCount = 0;

  for (const skillName of VIBE_CODING_AGENTS) {
    const agentId = `agent-${skillName}`;
    
    if (existingIds.has(agentId)) {
      console.log(`Skipping existing: ${skillName}`);
      continue;
    }

    const formattedName = skillName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    config.agents.list.push({
      id: agentId,
      name: formattedName,
      skills: [skillName],
      memorySearch: { enabled: false }
    });

    existingIds.add(agentId);
    addedCount++;
    console.log(`Added: ${formattedName} (${agentId})`);
  }

  if (addedCount > 0) {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
    console.log(`\nSuccessfully added ${addedCount} vibe coding agents to ${CONFIG_PATH}`);
  } else {
    console.log("\nNo new vibe coding agents found to add.");
  }
}

main().catch(console.error);
