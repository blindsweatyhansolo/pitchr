INSERT INTO users (id, username, email, password, github)
VALUES
    (1, 'samdakota', 'sam.dakota@gmail.com', 'samspassword', 'samdakota'),
    (2, 'mojocat', 'mojocat@gmail.com', 'mojospassword', 'mojocat'),
    (3, 'vinnycat', 'vinnymac@gmail.com', 'vinnyspassword', 'vinnycat'),
    (4, 'fifacat', 'fifacat@gmail.com', 'fifaspassword', 'fifacat');

INSERT INTO projects (id, title, description, userId, value)
VALUES
    (1, 'Cat Counter', 'Cat Counter is an app that keeps track of your cats!', 0, 1),
    (2, 'Car Driver', 'Car Driver is an app that drives your car for you!', 0, 1),
    (3, 'Cat Feeder', 'Cat Feeder is an app that feeds your cats!', 2, 0),
    (4, 'New Facebook', 'New Facebook is an app that replaces facebook with a new facebook!', 0, 0);

INSERT INTO comments (id, text, projectId, userId)
VALUES
    (1, 'This app is a great idea.', 1, 3),
    (2, "I can't wait for this to be real!", 2, 2),
    (3, 'How is this useful for feeding cats?', 3, 1);

INSERT INTO keywords (id, name)
VALUES
    (1, 'cats'),
    (2, 'facebook'),
    (3, 'cars'),
    (4, 'food');

INSERT INTO votes (id, userId, projectId)
VALUES
    (1, 1, 1),
    (2, 1, 2),
    (3, 2, 3);

