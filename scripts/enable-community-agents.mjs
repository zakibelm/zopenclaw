
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

// Hardcoded for 'dev' profile
const PROFILE_DIR = path.join(os.homedir(), ".openclaw-dev");
const CONFIG_PATH = path.join(PROFILE_DIR, "openclaw.json");

const COMMUNITY_AGENTS = [
  // Core Community Platforms
  "discord-automation",  // (Likely enabled, but good to ensure)
  "slack-automation",    // (Likely enabled)
  "telegram-automation", // (Likely enabled)
  "whatsapp-automation", // (Likely enabled)
  "reddit-automation",   // (Likely enabled)
  
  // Forums & Support
  "zendesk-automation",  // Support/Community
  "intercom-automation", // Support/Engagement
  "crisp-automation",    // (Check if exists) - likely not in list
  "freshdesk-automation",
  "freshservice-automation",
  "front-automation",    // Customer comms
  
  // Event & Engagement
  "eventbrite-automation",
  "meetup-automation",   // (Check if exists)
  "luma-automation",     // (Check if exists)
  
  // Newsletters & Updates (Community communication)
  "substack-automation", // (Check if exists)
  "ghost-automation",    // (Check if exists)
  "medium-automation",   // (Check if exists)
  
  // Feedback & Surveys
  "typeform-automation", // (Check if exists)
  "tally-automation",
  "jotform-automation",
  "survey-monkey-automation",
  
  // Gamification & Loyalty (if available)
  // "loyalty-lion" etc. (unlikely)
];

// Refined list based on previous `list_dir` output of skills
const VERIFIED_COMMUNITY_AGENTS = [
  "discord-automation",
  "discordbot-automation",
  "slack-automation",
  "slackbot-automation",
  "telegram-automation",
  "whatsapp-automation",
  "reddit-automation",
  "twitch-automation",
  "youtube-automation",
  
  "zendesk-automation",
  "intercom-automation",
  "freshdesk-automation",
  "freshservice-automation",
  "front-automation",
  "helpdesk-automation",
  "helpwise-automation",
  
  "eventbrite-automation",
  "eventzilla-automation",
  
  "tally-automation",
  "jotform-automation",
  "survey-monkey-automation",
  "formbricks-automation", // Open source survey
  
  "canny-automation", // Feedback
  "productboard-automation", // Feedback
  
  "mailchimp-automation", // Community newsletters
  "ghost-automation"      // (If exists, didn't see it but maybe missed)
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

  // Filter out agents that might not exist in directory, although we are mostly sure about these
  for (const skillName of VERIFIED_COMMUNITY_AGENTS) {
    const agentId = `agent-${skillName}`;
    
    if (existingIds.has(agentId)) {
      continue;
    }

    // Check if skill dir exists - simple heuristic
    try {
        const skillPath = path.resolve(process.cwd(), "skills", skillName);
        await fs.access(skillPath);
    } catch {
        console.log(`Skill not found locally: ${skillName}, skipping...`);
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
    console.log(`\nSuccessfully added ${addedCount} community manager agents to ${CONFIG_PATH}`);
  } else {
    console.log("\nNo new community manager agents found to add.");
  }
}

main().catch(console.error);
