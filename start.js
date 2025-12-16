// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// require("@babel/register")({
//   presets: ["@babel/preset-env"],
// });

// // Dynamically import `server.js`
// import("./server.js")
//   .then(() => console.log("🚀 Server started successfully"))
//   .catch((err) => console.error("❌ Error starting server:", err));


import { createRequire } from "module";
const require = createRequire(import.meta.url);

require("@babel/register")({
  presets: ["@babel/preset-env"],
});

import 'dotenv/config';
import { initRedis } from './config/redisClient.js';

// Initialize Redis FIRST (safe)
await initRedis();

// Then start server
import("./server.js")
  .then(() => console.log("🚀 Server started successfully"))
  .catch((err) => console.error("❌ Error starting server:", err));
