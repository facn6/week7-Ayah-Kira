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
  name VARCHAR(20) NOT NULL,
  category VARCHAR(30),
  post_content VARCHAR(300)
);

ALTER TABLE posts ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

INSERT INTO users (name, password) VALUES
('Ayah', 'f1b'),
('Kira', 'f1c'),
('Dana', 'f1d'),
('Ghassan', 'f1e');

INSERT INTO posts (name, category, post_content) VALUES
('Ayah', 'Go', 'Speak in english'),
('Kira', 'Stop', 'Eating pizza'),
('Dana', 'Go', 'Be on time'),
('Ghassan', 'Continue', 'Eating cookies');





 COMMIT;
