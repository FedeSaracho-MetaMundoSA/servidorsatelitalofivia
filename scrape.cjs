const https = require('https');

function scrapeUnsplash(keyword) {
  const options = {
    hostname: 'unsplash.com',
    path: `/s/photos/${encodeURIComponent(keyword)}`,
    headers: { 'User-Agent': 'Mozilla/5.0' }
  };
  https.get(options, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      const match = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+/);
      if (match) {
        console.log(`${keyword}: ${match[0]}?q=80&w=1600&auto=format&fit=crop`);
      } else {
        console.log(`${keyword}: Not found`);
      }
    });
  });
}

scrapeUnsplash('pickup-truck-mountain');
scrapeUnsplash('truck-cabin');
scrapeUnsplash('ambulance-mountain');
scrapeUnsplash('rural-farm');
scrapeUnsplash('offroad-4x4-desert');
scrapeUnsplash('satellite-dish-house');
scrapeUnsplash('camping-starlink');
scrapeUnsplash('commercial-building-antenna');
scrapeUnsplash('walkie-talkie-radio');
scrapeUnsplash('security-cctv-camera');
scrapeUnsplash('telecom-tower');
