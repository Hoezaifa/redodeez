import { defineConfig } from "@prisma/config";
import fs from "node:fs";
import path from "node:path";

function getEnvVar(key: string): string {
  if (process.env[key]) return process.env[key]!;
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed.startsWith(`${key}=`)) {
          let val = trimmed.slice(key.length + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          return val;
        }
      }
    }
  } catch {
    /* ignore */
  }
  return "";
}

export default defineConfig({
  datasource: {
    url: getEnvVar("DATABASE_URL"),
    directUrl: getEnvVar("DIRECT_URL"),
  },
});
