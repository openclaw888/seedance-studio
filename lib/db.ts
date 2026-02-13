import { Pool } from "pg";

let globalPool: Pool;

export function getDb() {
  if (!globalPool) {
    const connectionString = process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error("POSTGRES_URL is not configured");
    }
    globalPool = new Pool({ connectionString });
  }
  return globalPool;
}
