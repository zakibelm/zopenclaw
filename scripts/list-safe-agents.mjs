
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const SKILLS_DIR = path.resolve(process.cwd(), "skills");
const OUTPUT_FILE = path.resolve(process.cwd(), "AVAILABLE_SAFE_AGENTS.md");

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
  console.log(`Scanning skills in ${SKILLS_DIR}...`);
  const entries = await fs.readdir(SKILLS_DIR, { withFileTypes: true });
  const skillDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  let safeAgents = [];
  let otherAgents = [];

  for (const skillName of skillDirs) {
    const lowerName = skillName.toLowerCase();
    
    // Check for unsafe keywords
    if (UNSAFE_KEYWORDS.some(k => lowerName.includes(k))) {
      continue; 
    }

    const agentId = `agent-${skillName}`;
    const formattedName = skillName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const agentInfo = {
      id: agentId,
      name: formattedName,
      skill: skillName
    };

    if (SAFE_BRANDS.some(b => lowerName.includes(b))) {
      safeAgents.push(agentInfo);
    } else {
      otherAgents.push(agentInfo);
    }
  }

  let output = "# Available Safe Agents\n\n";
  output += "These agents are based on known trusted platforms and services.\n\n";
  
  if (safeAgents.length > 0) {
    output += "## Trusted Platforms\n\n";
    output += "| Agent Name | ID | Skill |\n";
    output += "| :--- | :--- | :--- |\n";
    safeAgents.forEach(a => {
      output += `| ${a.name} | \`${a.id}\` | ${a.skill} |\n`;
    });
    output += "\n";
  }

  if (otherAgents.length > 0) {
    output += "## Other Utilities & Integrations (Review Required)\n\n";
    output += "| Agent Name | ID | Skill |\n";
    output += "| :--- | :--- | :--- |\n";
    otherAgents.forEach(a => {
      output += `| ${a.name} | \`${a.id}\` | ${a.skill} |\n`;
    });
  }

  await fs.writeFile(OUTPUT_FILE, output, "utf-8");
  console.log(`Generated list at ${OUTPUT_FILE}`);
  console.log(`Found ${safeAgents.length} trusted agents and ${otherAgents.length} other potential agents.`);
}

main().catch(console.error);
