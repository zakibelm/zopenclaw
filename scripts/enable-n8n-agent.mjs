import fs from "fs/promises";
import path from "path";
import os from "os";

const N8N_AGENT = {
  id: "agent-n8n-automation",
  name: "n8n Automation Agent",
  skills: ["n8n-automation", "codeinterpreter-automation"],
  memorySearch: { enabled: false }
};

async function enableN8nAgent() {
  const userHome = os.homedir(); 
  const configPath = process.env.OPENCLAW_CONFIG_PATH || path.join(userHome, ".openclaw-dev", "openclaw.json");
  
  try {
    const configContent = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(configContent);

    // Check if agent already exists
    const existingIndex = config.agents.list.findIndex(a => a.id === N8N_AGENT.id);
    
    if (existingIndex >= 0) {
      console.log(`Agent ${N8N_AGENT.id} already exists. Updating configuration...`);
      config.agents.list[existingIndex] = N8N_AGENT;
    } else {
      console.log(`Adding new agent: ${N8N_AGENT.name} (${N8N_AGENT.id})`);
      config.agents.list.push(N8N_AGENT);
    }

    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    console.log(`Successfully updated ${configPath} with n8n agent.`);

  } catch (error) {
    console.error("Error enabling n8n agent:", error);
  }
}

enableN8nAgent();
