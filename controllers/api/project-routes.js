// ALL ROUTES FOR PROJECT MODEL (CRUD)
const Sequelize = require('sequelize');
const router = require('express').Router();
// import sequelize to use literals for vote totals
const sequelize = require('../../config/connection');
// import all models
const { Project, Vote, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all Projects (/api/projects)
// includes User, Keyword, Vote, and Comment data
router.get('/', (req, res) => {
    // UPDATE THIS AFTER ALL MODELS HAVE BEEN CREATED
    Project.findAll({
        attributes: {
            include: [[Sequelize.fn("COUNT", Sequelize.col("votes.id")), "voteCount"]]
        },
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'projectId', 'userId', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Vote,
                attributes: [],
            }
        ],
        group: [
            "project.id"
        ]
    })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET single Project (/api/projects/:id)
router.get('/:id', (req, res) => {
    // UPDATE THIS AFTER ALL MODELS HAVE BEEN CREATED
    Project.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            include: [[Sequelize.fn("COUNT", Sequelize.col("votes.id")), "voteCount"]]
        },
        // UPDATE THIS AFTER ALL MODELS HAVE BEEN CREATED
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'projectId', 'userId', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Vote,
                attributes: [],
            }
        ],
        group: [
            "project.id"
        ]  
    })
    .then(dbProjectData => {
        // if no matching id
        if (!dbProjectData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        res.json(dbProjectData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST new Project (/api/projects)
// active session must exist
router.post('/', withAuth, (req, res) => {
        Project.create({
            // TEMPORARY PARAMS FOR TESTING
            // THESE FIELDS TO BE UPDATED TO MATCH FRONT-END PROJECT SUBMISSION FORM
            title: req.body.title,
            descriptionShort: req.body.descriptionShort,
            descriptionLong: req.body.descriptionLong,
            // value: req.body.value,
            // UPDATE LATER SO USER/CREATOR VALUE GRABBED FROM SESSION
            // userId: req.session.userId
            userId: req.session.userId
        })
        .then(dbProjectData => res.json(dbProjectData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// PUT route for upvoting project (/api/projects/upvote)
// MUST BE DEFINED BEFORE PUT /:id ROUTE!
// active session must exist, set up later with session
router.put('/upvote', withAuth, (req, res) => {
    // pass user id from session (userId: req.session.userId) UPDATE ME!!
    // along with all destructured properties on req.body
    // into static model method created in Project model: upvote(body, models)
    // ONCE MERGED WITH ALL SESSION WORK, CHANGE TO >> 
    // Project.upvote({ ...req.body, userId: req.session.userId }, { Vote, Comment, User })
    Project.upvote({...req.body, userId: req.session.userId}, { Vote, Comment, User })
    .then(updatedProjectData => res.json(updatedProjectData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// PUT update Project's title, descriptionShort, descriptionLong, value (/api/projects/:id)
// active session must exist, set up later with session
router.put('/:id', withAuth, (req, res) => {
    // update() method combines looking up and updating data
    Project.update(
        {
            // THESE FIELDS SHOULD MATCH FRONT-END PROJECT EDIT SUBMISSION FORM
            title: req.body.title,
            descriptionShort: req.body.descriptionShort,
            descriptionLong: req.body.descriptionLong
            // value: req.body.value
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbProjectData => {
        // if no matching id
        if (!dbProjectData) {
            res.status(404).json({ message: 'No project found with this id!' });
        }

        res.json({ message: 'Successfully updated!' });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// DELETE remove Project (/api/projects/:id)
// require active session and authorization for deleting projects
router.delete('/:id', withAuth, (req, res) => {
    // destroy() method combines looking up and deleting data
    Project.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbProjectData => {
        // if no mathing id
        if (!dbProjectData) {
            res.status(404).json({ message: 'No project found with this id!' });
        }

        res.json({ message: 'Project deleted.' });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});


// EXPORT
module.exports = router;