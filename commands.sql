CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Blogger 1', 'https://booksite.com/', 'Blogs world tour');
INSERT INTO blogs (author, url, title, likes) VALUES ('Blogger 2', 'https://suomalainenkirjakauppa.fi', 'Miksi blogata', 10);