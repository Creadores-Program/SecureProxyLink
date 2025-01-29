export default async function handler(req, res){
  let targetUrl = process.env.URL;
  if (!targetUrl) {
    return res.status(500).json({ error: 'Target URL no configurado' });
  }
  let options = {
    method: req.method,
    headers: req.headers
  }
  if(req.headers["content-length"] && parseInt(req.headers["content-length"]) > 0){
    options.body = req.body;
  }
  let responP = await fetch(targetUrl, options);
  responP.headers.forEach(function(val, key){
    res.setHeader(key, val);
  });
  let stat = res.status(responP.status);
  if(responP.headers["content-length"] && parseInt(responP.headers["content-length"]) > 0){
    let resBody = await responP.arrayBuffer();
    stat.send(Buffer.from(resBody));
  }else{
    stat.end();
  }
}
