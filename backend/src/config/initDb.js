const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dbPath = path.resolve(__dirname, "../../database/helpdesk.db");
const schemaPath = path.resolve(__dirname, "../../database/schema.sql");
const seedPath = path.resolve(__dirname, "../../database/seed.sql");

// Make sure database folder exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect:", err.message);
    process.exit(1);
  }
  console.log("Connected to database");
});

const schema = fs.readFileSync(schemaPath, "utf8");
const seed = fs.readFileSync(seedPath, "utf8");

db.serialize(() => {
  db.exec(schema, (err) => {
    if (err) {
      console.error("Schema error:", err.message);
      process.exit(1);
    }
    console.log("Schema created successfully");

    db.exec(seed, (err) => {
      if (err) {
        console.error("Seed error:", err.message);
        process.exit(1);
      }
      console.log("Seed data inserted successfully");
      db.close();
    });
  });
});