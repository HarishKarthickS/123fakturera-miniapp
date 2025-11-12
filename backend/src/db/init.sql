CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  refresh_token TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_updated_at ON users(updated_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$ BEGIN
  IF NEW IS DISTINCT FROM OLD THEN
    NEW.updated_at = NOW();
  END IF;
  RETURN NEW;
END;
 $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp ON users;
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TABLE IF NOT EXISTS page_content (
  id SERIAL PRIMARY KEY,
  page_name VARCHAR(100) NOT NULL,
  section VARCHAR(100) NOT NULL,
  component_key VARCHAR(100) NOT NULL,
  language VARCHAR(5) NOT NULL CHECK (language IN ('en', 'sv')),
  content TEXT NOT NULL,
  display_order INT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (page_name, section, component_key, language)
);

CREATE INDEX IF NOT EXISTS idx_page_content_lookup ON page_content(page_name, language);
CREATE INDEX IF NOT EXISTS idx_page_section_lookup ON page_content(page_name, section, language);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  article_no VARCHAR(50) UNIQUE NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  in_price NUMERIC(12, 2) NOT NULL,
  out_price NUMERIC(12, 2) NOT NULL,
  unit VARCHAR(100) DEFAULT 'unit',
  in_stock NUMERIC(12, 2) DEFAULT 0,
  description TEXT,
  created_by INT REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS update_product_timestamp ON products;
CREATE TRIGGER update_product_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(255),
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
