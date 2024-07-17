import { Socket } from 'node:net';

const client = new Socket();

client.connect(4040, '127.0.0.1', () => {
  console.log('Connected to TCP server');

  const [id, method, ...params] = process.argv.slice(2);

  // Convierte los parámetros de la línea de comandos en un objeto JSON
  const parsedParams = params.reduce((acc: any, param) => {
    const [key, value] = param.split('=');
    acc[key] = value;

    return acc;
  }, {});

  const request = JSON.stringify({
    jsonrpc: "2.0",
    id: parseInt(id),
    method: method,
    params: parsedParams
  }) + '\n';

  client.write(request);
});

client.on('data', (data) => {
  console.log(`Received: ${data}`);
  client.destroy(); // Cerrar la conexión una vez recibida la respuesta
});

client.on('close', () => {
  console.log('Connection closed');
});
