const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8055 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.send('Websocket Server');

  ws.on('message', (message) => {
    console.log(`Message: ${message}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server Response: ${message}`);
      }
    });
  });
});

console.log('WebSocket port 8055');
