import { Pool } from "pg";

const connectionString = "postgresql://postgres:QPCiqiPzfyeROJ6h@lightly-autonomous-fieldmouse.data-1.use1.tembo.io:5432/postgres"

export const db = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Error handling to test the connection:
db.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Test the connection
db.connect()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));