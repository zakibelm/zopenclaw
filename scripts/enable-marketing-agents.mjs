
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

// Hardcoded for 'dev' profile
const PROFILE_DIR = path.join(os.homedir(), ".openclaw-dev");
const CONFIG_PATH = path.join(PROFILE_DIR, "openclaw.json");

const MARKETING_AGENTS = [
  // Social Media
  "twitter-automation",
  "twitter-algorithm-optimizer",
  "linkedin-automation",
  "instagram-automation",
  "facebook-automation",
  "tiktok-automation",
  "reddit-automation",
  "youtube-automation",
  "twitch-automation",
  "typefully-automation", // Twitter writing
  
  // SEO & Analytics
  "ahrefs-automation",
  "semrush-automation",
  "moz-automation",
  "similarweb-digitalrank-api-automation",
  
  // Email Marketing & CRM (those not in safe/trusted list)
  "mailchimp-automation",
  "active-campaign-automation",
  "klaviyo-automation",
  "convertkit-automation",
  "brevo-automation",
  "customerio-automation",
  "mailerlite-automation",
  "omnisend-automation",
  
  // Growth & Outreach
  "phantombuster-automation",
  "lemlist-automation",
  "instantly-automation",
  "apollo-automation",
  "hunter-automation",
  "skrapp-automation",
  "lusha-automation",
  
  // Others
  "hypeauditor-automation", // Influencer marketing
  "brandfetch-automation",
  "landbot-automation", // Chatbots
  "gumroad-automation",
  "lemon-squeezy-automation"
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

  for (const skillName of MARKETING_AGENTS) {
    const agentId = `agent-${skillName}`;
    
    if (existingIds.has(agentId)) {
      // console.log(`Skipping existing: ${skillName}`);
      continue;
    }

    // Try to find the directory to ensure it exists (simple check)
    // In a real scenario we might want to check if the folder exists in skills/
    
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
    console.log(`\nSuccessfully added ${addedCount} marketing agents to ${CONFIG_PATH}`);
  } else {
    console.log("\nNo new marketing agents found to add.");
  }
}

main().catch(console.error);
