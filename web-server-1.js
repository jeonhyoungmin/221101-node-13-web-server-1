import fs from 'fs';
import path from 'path';
import http from 'http';

const server = http.createServer((request, response) => {
  const main = fs.readFileSync('./public/static/index.html', (err) => {
    if (err) throw err;
  })

  if(request.method === "GET") {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(main);
  } else if (request.method === "POST") {
    let body = "";
    request.on('data', (data) => {
      body += data;
      data = data.toString();
      console.log(data, "this is first event");
      // 한글화
      console.log(decodeURIComponent(data))
    })
    request.on('end', () => {
      console.log(body, "this is last event");

      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end(main);
    })
  }
})
server.listen(5588, () => {
  console.log('server running');
})