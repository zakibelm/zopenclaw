---
description: Launch a full media campaign by coordinating strategy, copy, design, and scheduling.
---

# Media Campaign Launch Workflow

This workflow coordinates the Ultimate Media Team to take a campaign from brief to scheduled.

1. **Strategic Planning (CMO)**
   - Call `agent-media-cmo` with the campaign brief.
   - The CMO generates a strategy, target audience analysis, and identifies required assets.

2. **Content Generation**
   - **Text (Copywriter)**: Call `agent-media-copywriter` to generate ad copy, hooks, and social post captions based on the CMO's strategy.
   - **Visuals (Designer)**: Call `agent-media-designer` to generate high-quality images and video assets (via fal.ai/HeyGen) that align with the strategy.

3. **Asset Review**
   - Perform a cross-review where the CMO validates that the content matches the brand's strategic goals.

4. **Scheduling & Distribution (Manager)**
   - Call `agent-media-manager` to:
     - Save all final assets to the campaign folder in Google Drive.
     - Schedule social media posts via Buffer/Ayrshare.
     - Send a summary email to the stakeholders with the campaign details and calendar links.
