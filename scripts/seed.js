// scripts/seed.js
const fs = require('fs');
const { join } = require('path');
const { randomUUID } = require('crypto');

const sample = [
  {
    id: randomUUID(),
    title: "Replace hallway light",
    description: "Fixture above suite 201 flickers intermittently.",
    priority: "Medium",
    status: "Open",
    updatedAt: new Date().toISOString()
  },
  {
    id: randomUUID(),
    title: "Server room AC check",
    description: "Temperature drift observed - schedule preventative maintenance.",
    priority: "High",
    status: "In Progress",
    updatedAt: new Date(Date.now() - 1000*60*60*24).toISOString()
  },
  {
    id: randomUUID(),
    title: "Office chairs reorder",
    description: "Ergonomic chairs for 4 new hires",
    priority: "Low",
    status: "Done",
    updatedAt: new Date(Date.now() - 1000*60*60*24*7).toISOString()
  }
];

const out = join(process.cwd(), 'data', 'work-orders.json');
fs.mkdirSync(join(process.cwd(), 'data'), { recursive: true });
fs.writeFileSync(out, JSON.stringify(sample, null, 2));
console.log('Seeded', out);
