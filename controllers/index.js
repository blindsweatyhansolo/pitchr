const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    Comment.findAll()
    .then()
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'text',
            'CreatedAt',
        ],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: post,
                attributes: ['id', 'username'],
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Comment.create({
        text: req.body.text,
        post_id: req.body.post_id,
        creator_id: req.session.user_id
    })
    ..then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        res.status(500).json(err);
    });
})

module.exports = router;

// GET all Comments
// Include: User model [username] / Post model [id, name]
// GET single Comment

// Use findOne() or findByPk() method
// Attributes:
// ID
// Text
// CreatedAt
// Include:
// User model [username]
// Post model [id, name]
// POST new Comment

// Use create() method
// Required params:
// Text
// Post ID
// User ID (use id from session: req.session.user_id)
// DELETE single Comment [ /:id ]

// Use destroy()