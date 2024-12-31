const WebSocket = require('ws');
const port = process.env.PORT || 8055;

const wss = new WebSocket.Server({port});

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log(`Message: ${message}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server Response: ${message}`);
      }
    });
  });
});

console.log(`WebSocket port ${port}`);
