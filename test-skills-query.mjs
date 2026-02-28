import WebSocket from 'ws';

const token = '4906a4bb1c2329d8519451046f5606b6aff297a8cf5002b7';
const url = 'ws://127.0.0.1:18789/';

const ws = new WebSocket(url);
let msgId = 0;

ws.on('open', () => {
  console.log('Connected to gateway');
});

ws.on('message', (data) => {
  const msg = JSON.parse(data.toString());
  
  if (msg.type === 'event' && msg.event === 'connect.challenge') {
    console.log('Received connect.challenge, sending connect...');
    msgId++;
    ws.send(JSON.stringify({
      type: 'req',
      id: String(msgId),
      method: 'connect',
      params: {
        client: {
          id: 'test-skills-query',
          mode: 'cli',
          version: '1.0.0',
          displayName: 'Skills Query Test'
        },
        minProtocol: 3,
        maxProtocol: 3,
        auth: { token }
      }
    }));
    return;
  }

  if (msg.type === 'res' && msg.id === String(1)) {
    if (msg.ok) {
      console.log('Connected successfully! Querying skills.status...');
      msgId++;
      ws.send(JSON.stringify({
        type: 'req',
        id: String(msgId),
        method: 'skills.status',
        params: {}
      }));
    } else {
      console.log('Connect failed:', JSON.stringify(msg.error));
      ws.close();
      process.exit(1);
    }
    return;
  }

  if (msg.type === 'res' && msg.id === String(2)) {
    if (msg.ok) {
      const result = msg.payload;
      console.log('\n=== SKILLS STATUS ===');
      console.log('workspaceDir:', result?.workspaceDir);
      console.log('managedSkillsDir:', result?.managedSkillsDir);
      console.log('Total skills:', result?.skills?.length ?? 0);
      if (result?.skills?.length > 0) {
        console.log('\nFirst 15 skills:');
        result.skills.slice(0, 15).forEach((s, i) => {
          console.log(`  ${i+1}. ${s.name} (source: ${s.source}, eligible: ${s.eligible}, bundled: ${s.bundled})`);
        });
        
        // Count by source
        const sources = {};
        for (const s of result.skills) {
          sources[s.source] = (sources[s.source] || 0) + 1;
        }
        console.log('\nSkills by source:', JSON.stringify(sources, null, 2));
      } else {
        console.log('NO SKILLS FOUND');
      }
    } else {
      console.log('skills.status error:', JSON.stringify(msg.error));
    }
    ws.close();
    process.exit(0);
  }

  // Log other events 
  if (msg.type === 'event') {
    // skip
  } else {
    console.log('Unexpected message:', JSON.stringify(msg).substring(0, 200));
  }
});

ws.on('error', (err) => {
  console.error('WebSocket error:', err.message);
  process.exit(1);
});

setTimeout(() => {
  console.log('Timeout - no response received within 60s');
  process.exit(1);
}, 60000);
