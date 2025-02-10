CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS application_user(
  uuid uuid DEFAULT uuid_generate_v4(),
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (uuid)
);

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- senhas criptografadas
INSERT INTO application_user (username, password) VALUES ('admin', crypt('000000', 'my_salt'));

SELECT * FROM application_user;

SELECT uuid, username  FROM  application_user