BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  password VARCHAR(500) NOT NULL
);

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  user_id INT,
  category VARCHAR(30),
  post_content VARCHAR(300)
);

ALTER TABLE posts ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

INSERT INTO users (name, password) VALUES ('Ayah', 'f1b');
INSERT INTO users (name, password) VALUES ('Kira', 'f1c');

INSERT INTO posts (user_id, category, post_content) VALUES (1, 'Go', 'Speak in english');




 COMMIT;
