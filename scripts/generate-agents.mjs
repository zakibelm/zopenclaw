
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

// Paths
const HOME = os.homedir();
const OPENCLAW_JSON_PATH = path.join(HOME, ".openclaw", "openclaw.json");
const SKILLS_DIR = path.resolve(process.cwd(), "skills");

async function main() {
  console.log("Reading openclaw.json...");
  let config = {};
  try {
    const raw = await fs.readFile(OPENCLAW_JSON_PATH, "utf-8");
    config = JSON.parse(raw);
  } catch (err) {
    console.error("Error reading openclaw.json:", err);
    process.exit(1);
  }

  // Ensure agents structure exists
  if (!config.agents) config.agents = {};
  if (!config.agents.list) config.agents.list = [];

  // Use a map to track agents by ID
  const agentMap = new Map();
  
  // Optional: Load existing agents into map if we want to preserve manual edits
  // config.agents.list.forEach(a => agentMap.set(a.id, a));

  console.log(`Scanning skills in ${SKILLS_DIR}...`);
  const entries = await fs.readdir(SKILLS_DIR, { withFileTypes: true });
  const skillDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  console.log(`Found ${skillDirs.length} potential skills.`);

  let addedCount = 0;

  for (const skillName of skillDirs) {
    const skillPath = path.join(SKILLS_DIR, skillName, "SKILL.md");
    let description = `Agent for ${skillName}`;
    
    // Try to extract description from SKILL.md
    try {
      const content = await fs.readFile(skillPath, "utf-8");
      // Naive frontmatter/description parsing
      const match = content.match(/description:\s*(.+)$/m);
      if (match) {
        description = match[1].trim().replace(/^['"]|['"]$/g, ""); // Remove quotes
      }
    } catch {
      // Ignore missing SKILL.md or read errors
    }

    // Define agentId within the loop
    const agentId = `agent-${skillName}`;

    /*
    if (existingAgentIds.has(agentId)) {
      continue;
    }
    */
    
    // Define newAgent in scope
    const newAgent = {
      id: agentId,
      name: formatAgentName(skillName),
      // description: description, // schema does not allow description
      skills: [skillName],
      memorySearch: { enabled: false } // Default to off to save resources for 900+ agents?
    };

    // Check if we need to replace or push. 
    // Actually, let's just use a map to deduplicate by ID for this run
    agentMap.set(agentId, newAgent);
    addedCount++;
  }

  // Rebuild the list with new agents (preserving any that were NOT generated if we want, but here we want to replace the generated ones)
  // For safety, let's just replace the list with the generated ones + any defaults that weren't generated?
  // Use a map for all agents
  
  config.agents.list = Array.from(agentMap.values());


  if (addedCount > 0) {
    console.log(`Adding ${addedCount} new agents to openclaw.json...`);
    await fs.writeFile(OPENCLAW_JSON_PATH, JSON.stringify(config, null, 2), "utf-8");
    console.log("Done.");
  } else {
    console.log("No new agents to add.");
  }
}

function formatAgentName(slug) {
  // convert "google-calendar" to "Google Calendar"
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

main().catch(console.error);
