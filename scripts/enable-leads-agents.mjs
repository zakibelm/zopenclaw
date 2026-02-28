
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

// Hardcoded for 'dev' profile
const PROFILE_DIR = path.join(os.homedir(), ".openclaw-dev");
const CONFIG_PATH = path.join(PROFILE_DIR, "openclaw.json");

// Scanned from Step 247 list
const LEADS_EMAILING_AGENTS = [
  // Enrichment & Finding Emails
  "aeroleads-automation",
  "anymail-finder-automation", // Assuming exists or check
  "autobound-automation",
  "clearout-automation",
  "contactout-automation",
  "dropcontact-automation",
  "findymail-automation",
  "fullenrich-automation",
  "icypeas-automation",
  "kaspr-automation",
  "lead-research-assistant",
  "leadfeeder-automation",
  "leadoku-automation",
  "listclean-automation",
  "mailcheck-automation",
  "neverbounce-automation",
  "persistiq-automation",
  "piloterr-automation",
  "procfu-automation",
  "proxiedmail-automation",
  "rocketreach-automation",
  "signalhire-automation", // Check
  "snov-io-automation",
  "snowball-automation",
  "tomba-automation",
  "use-inbox-automation",
  "verifiedemail-automation",
  "veriphone-automation",
  "woodpecker-co-automation",
  "zerobounce-automation",
  
  // Cold Email & Outreach (Some already enabled via marketing, adding others)
  "reply-io-automation",
  "mailshake-automation", // check
  "saleshandy-automation", // check
  "smartlead-automation", // check
  
  // Verification services
  "bouncer-automation",
  "emaillistverify-automation",
  "millionverifier-automation", // check
  
  // Data Providers
  "zoominfo-automation", // Already enabled in Safe List, but good to ensure
  "lusha-automation",    // Already enabled in Marketing
  "apollo-automation",   // Already enabled in Marketing
  "hunter-automation",   // Already enabled in Marketing
  
  // New ones found in scan
  "seamless-ai-automation", // check
  "uplead-automation"       // check
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

  for (const skillName of LEADS_EMAILING_AGENTS) {
    const agentId = `agent-${skillName}`;
    
    if (existingIds.has(agentId)) {
        // Skip silently to reduce noise
      continue;
    }

    // Heuristic check if skill folder exists locally
    try {
        const skillPath = path.resolve(process.cwd(), "skills", skillName);
        await fs.access(skillPath);
    } catch {
        // Try simple name if automation suffix is issue, but usually folder names match
        // console.log(`Skill not found: ${skillName}`);
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
    console.log(`\nSuccessfully added ${addedCount} leads & emailing agents to ${CONFIG_PATH}`);
  } else {
    console.log("\nNo new leads & emailing agents found to add.");
  }
}

main().catch(console.error);
