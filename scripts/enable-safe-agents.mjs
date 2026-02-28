
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

// Hardcoded for 'dev' profile based on user session
const PROFILE_DIR = path.join(os.homedir(), ".openclaw-dev");
const CONFIG_PATH = path.join(PROFILE_DIR, "openclaw.json");
const SKILLS_DIR = path.resolve(process.cwd(), "skills");

const SAFE_BRANDS = [
  "google", "microsoft", "slack", "github", "gitlab", "jira", "trello", 
  "notion", "zoom", "stripe", "aws", "dropbox", "box", "salesforce", 
  "hubspot", "linear", "asana", "intercom", "zendesk", "shopify", 
  "openai", "anthropic", "mistral", "discord", "telegram", "whatsapp"
];

const UNSAFE_KEYWORDS = [
  "scraper", "crawl", "hack", "bypass", "exploit", "stealth", "bot", "spam"
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

  console.log(`Scanning skills in ${SKILLS_DIR}...`);
  const entries = await fs.readdir(SKILLS_DIR, { withFileTypes: true });
  const skillDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  let addedCount = 0;

  for (const skillName of skillDirs) {
    const lowerName = skillName.toLowerCase();
    
    // Safety checks
    if (UNSAFE_KEYWORDS.some(k => lowerName.includes(k))) continue;
    if (!SAFE_BRANDS.some(b => lowerName.includes(b))) continue;

    const agentId = `agent-${skillName}`;
    
    if (existingIds.has(agentId)) continue;

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
    console.log(`\nSuccessfully added ${addedCount} safe agents to ${CONFIG_PATH}`);
  } else {
    console.log("\nNo new safe agents found to add.");
  }
}

main().catch(console.error);
