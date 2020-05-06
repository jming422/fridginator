CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  added_timestamp TIMESTAMPTZ,
  upc_code TEXT
);
 
CREATE INDEX item_locations ON items (location);
