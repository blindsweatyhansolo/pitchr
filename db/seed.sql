INSERT INTO user (id, username, email, password, github)
VALUES
    -- (0, 'samdakota', 'sam.dakota@gmail.com', 'samspassword', 'samdakota'),
    (1, 'mojocat', 'mojocat@gmail.com', 'mojospassword', 'mojocat'),
    (2, 'vinnycat', 'vinnymac@gmail.com', 'vinnyspassword', 'vinnycat'),
    (3, 'fifacat', 'fifacat@gmail.com', 'fifaspassword', 'fifacat');

INSERT INTO project (id, title, description, userId, value)
VALUES
    -- (0, 'Cat Counter', 'Cat Counter is an app that keeps track of your cats!', 0, 1),
    (1, 'Car Driver', 'Car Driver is an app that drives your car for you!', 0, 1),
    (2, 'Cat Feeder', 'Cat Feeder is an app that feeds your cats!', 2, 0),
    (3, 'New Facebook', 'New Facebook is an app that replaces facebook with a new facebook!', 0, 0);

INSERT INTO comment (id, text, projectId, userId)
VALUES
    -- (0, 'This app is a great idea.', 1, 3),
    (1, "I can't wait for this to be real!", 2, 2),
    (2, 'How is this useful for feeding cats?', 3, 1);

-- INSERT INTO keyword (id, name)
VALUES
    -- (0, 'cats'),
    (1, 'facebook'),
    (2, 'cars'),
    (3, 'food');

-- INSERT INTO vote (id, userId, projectId)
VALUES
    -- (0, 1, 1),
    (1, 1, 2),
    (2, 2, 3);

