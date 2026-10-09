const https = require('https');

function searchUnsplash(query) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=1`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const parsed = JSON.parse(data);
      if (parsed.results && parsed.results.length > 0) {
        console.log(`${query} -> https://images.unsplash.com/photo-${parsed.results[0].id}?q=80&w=1600&auto=format&fit=crop`);
      } else {
        console.log(`${query} -> NO RESULTS`);
      }
    });
  });
}

searchUnsplash('Toyota Hilux mountain');
searchUnsplash('Scania truck cabin');
searchUnsplash('ambulance mountain');
searchUnsplash('rural farm satellite dish');
searchUnsplash('offroad 4x4 desert');
searchUnsplash('satellite dish house');
searchUnsplash('camping starlink');
searchUnsplash('commercial building antenna');
searchUnsplash('walkie talkie radio');
searchUnsplash('cctv camera security truck');
searchUnsplash('metal tower antenna');
