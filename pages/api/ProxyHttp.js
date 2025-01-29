export default async function handler(req, res){
  let options = {
    method: req.method,
    headers: req.headers
  }
  if(req.headers["content-length"] && parseInt(req.headers["content-length"]) > 0){
    options.body = req.body;
  }
  let responP = await fetch(process.env.URL, options);
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
