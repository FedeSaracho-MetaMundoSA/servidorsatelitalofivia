const https = require('https');

function scrapePexels(keyword) {
  const options = {
    hostname: 'www.pexels.com',
    path: `/search/${encodeURIComponent(keyword)}/`,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  };
  https.get(options, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      const match = data.match(/https:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.jpeg/);
      if (match) {
        console.log(`${keyword}: ${match[0]}?auto=compress&cs=tinysrgb&w=1600`);
      } else {
        console.log(`${keyword}: Not found`);
      }
    });
  });
}

scrapePexels('pickup truck');
scrapePexels('truck cabin');
scrapePexels('ambulance');
scrapePexels('rural farm');
scrapePexels('offroad');
scrapePexels('satellite dish');
scrapePexels('camping');
scrapePexels('commercial building');
scrapePexels('walkie talkie');
scrapePexels('security camera');
scrapePexels('telecommunication tower');
