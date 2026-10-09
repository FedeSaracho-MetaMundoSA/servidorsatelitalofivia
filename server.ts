import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { CATALOG_PRODUCTS } from "./src/data/productsData.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON middleware
  app.use(express.json());

  // 1. HEALTHCHECK ENDPOINT
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Servidor Satelital Corporate API", region: "Salta NOA" });
  });

  // 2. NATIVE CATALOG API (JSON endpoint structured for Google Shopping sync)
  app.get("/api/products", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json({
      success: true,
      lastUpdated: new Date().toISOString(),
      catalogSource: "Google Cloud Native Engine",
      products: CATALOG_PRODUCTS.map(p => ({
        id: p.id,
        sku: p.sku,
        title: p.title,
        tagline: p.tagline,
        category: p.category,
        origin: p.origin,
        industries: p.industries,
        description: p.description,
        image: p.image,
        bulletPoints: p.bulletPoints,
        techSpecs: p.techSpecs,
        operatividad: p.operatividad,
        powerRequirement: p.powerRequirement,
        // Aligned Google Merchant Center standard properties
        g_id: p.id,
        g_title: p.title,
        g_description: p.description,
        g_link: `https://servidorsatelital.com.ar/#productos`,
        g_image_link: p.image,
        g_condition: p.condition,
        g_availability: p.availability,
        g_price: p.price,
        g_brand: p.brand,
        g_google_product_category: p.googleProductCategory,
        g_mpn: p.mpn,
        g_gtin: p.gtin || ""
      }))
    });
  });

  // 3. GOOGLE MERCHANT CENTER / GOOGLE SHOPPING RSS XML FEED
  // This route outputs standard valid RSS XML matching Google Shopping specifications
  app.get("/api/products/feed", (req, res) => {
    res.header("Content-Type", "text/xml; charset=utf-8");
    res.header("Access-Control-Allow-Origin", "*");

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n`;
    xml += `  <channel>\n`;
    xml += `    <title>Servidor Satelital - Conectividad &amp; Ingeniería de Altura</title>\n`;
    xml += `    <link>https://servidorsatelital.com.ar</link>\n`;
    xml += `    <description>Catálogo oficial de Servidor Satelital Salta para logística, turismo, campos rurales y emergencias en el NOA.</description>\n`;
    xml += `    <language>es-ar</language>\n`;
    xml += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;

    CATALOG_PRODUCTS.forEach((p) => {
      // Escape helper of typical XML entities
      const escapeXml = (str: string) => {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
      };

      xml += `    <item>\n`;
      xml += `      <g:id>${escapeXml(p.id)}</g:id>\n`;
      xml += `      <g:title>${escapeXml(p.title)}</g:title>\n`;
      xml += `      <g:description>${escapeXml(p.description)}</g:description>\n`;
      xml += `      <g:link>${escapeXml(`https://servidorsatelital.com.ar/#productos`)}</g:link>\n`;
      xml += `      <g:image_link>${escapeXml(p.image)}</g:image_link>\n`;
      xml += `      <g:condition>${escapeXml(p.condition)}</g:condition>\n`;
      xml += `      <g:availability>${escapeXml(p.availability)}</g:availability>\n`;
      xml += `      <g:price>${escapeXml(p.price)}</g:price>\n`;
      xml += `      <g:brand>${escapeXml(p.brand)}</g:brand>\n`;
      xml += `      <g:mpn>${escapeXml(p.mpn)}</g:mpn>\n`;
      if (p.gtin) {
        xml += `      <g:gtin>${escapeXml(p.gtin)}</g:gtin>\n`;
      }
      xml += `      <g:google_product_category>${escapeXml(p.googleProductCategory)}</g:google_product_category>\n`;
      xml += `    </item>\n`;
    });

    xml += `  </channel>\n`;
    xml += `</rss>\n`;

    res.send(xml);
  });

  // 4. VITE MIDDLEWARE IN DEVELOPMENT & STATIC ASSETS IN PRODUCTION
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server mounted as Express middleware");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files directory mounted:", distPath);
  }

  // PORT binding
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`=======================================================`);
    console.log(`📡 Servidor Satelital Full-Stack API running!`);
    console.log(`🔗 Port: http://localhost:${PORT}`);
    console.log(`🛒 GMC Product Catalog: http://localhost:${PORT}/api/products`);
    console.log(`📰 GMC valid XML Feed: http://localhost:${PORT}/api/products/feed`);
    console.log(`=======================================================`);
  });
}

startServer();
