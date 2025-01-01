const WebSocket = require('ws');
const port = process.env.PORT || 8055;

const wss = new WebSocket.Server({port});

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    let jsonMessage;
    try {
      jsonMessage = JSON.stringify(JSON.parse(message));
    } catch (error) {
      console.error('Ошибка парсинга входящего сообщения:', error);
      jsonMessage = JSON.stringify({error: 'Invalid JSON'});
    }
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(jsonMessage);
      }
    });
  });
});

console.log(`WebSocket port ${port}`);
