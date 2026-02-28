---
name: n8n-automation
description: "Manage n8n workflows and users via Code Interpreter API calls."
requires:
  mcp: []
---

# n8n Automation Skill

Use this skill to automate management of your self-hosted n8n instance.

## Overview
This skill leverages the `codeinterpreter-automation` capability to execute scripts (Node.js or Python) that interact with the n8n API.

## Configuration
- **Base URL**: `https://n8n.srv679767.hstgr.cloud`
- **API Key**: Ensure the `N8N_API_KEY` environment variable is set, or ask the user to provide it if missing.

## Instructions for Agent
When asked to perform tasks like creating users, modifying workflows, or listing executions:

1.  **Inspect Availability**: Verify if `codeinterpreter-automation` is available.
2.  **Generate Script**: Write a Node.js script using `fetch` (native in Node 18+) or `axios` to call the appropriate n8n API endpoint.
    *   Authentication: sending `X-N8N-API-KEY` header.
    *   Endpoint documentation: Refer to official n8n API docs or construct standard REST calls (e.g., `GET /users`, `POST /workflows`).
3.  **Execute**: Run the script using the Code Interpreter.
4.  **Parse & Report**: Read the JSON output and summarize the result for the user.

## Example: List Users
```javascript
const apiKey = process.env.N8N_API_KEY || 'YOUR_API_KEY_HERE';
const baseUrl = 'https://n8n.srv679767.hstgr.cloud/api/v1';

async function listUsers() {
  const response = await fetch(`${baseUrl}/users`, {
    headers: { 'X-N8N-API-KEY': apiKey }
  });
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

listUsers();
```
