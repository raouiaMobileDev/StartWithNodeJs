const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Start with node js</title></head>');
    res.write(
      '<body><form action="/create-article" method="POST"><input type="text" name="articlename"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/articles') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Start with node js</title></head>');
    res.write('<body><ul><li>Article 1</li><li>UArticle 2</li></ul></body>');
    res.write('</html>');
    return res.end();
  }
  // Send a HTML response with some "Page not found text
  if (url === '/create-article') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split('=')[1]); // articlename=the-article-entered
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }
});

server.listen(3000);
