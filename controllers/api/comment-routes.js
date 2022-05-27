const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comment, User, Project } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'text',
            'createdAt',
        ],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Project,
                attributes: ['id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
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
        projectId: req.body.projectId,
        userId: req.body.userId
        // creatorId: req.session.userId
    })
    .then(dbCommentData => res.json(dbCommentData))
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