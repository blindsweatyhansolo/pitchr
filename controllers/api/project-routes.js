// ALL ROUTES FOR PROJECT MODEL (CRUD)
const router = require('express').Router();
// import sequelize to use literals for vote totals
const sequelize = require('../../config/connection');
// import all models
const { Project } = require('../../models');

// GET all Projects (/api/projects)
// includes User, Keyword, Vote, and Comment data
router.get('/', (req, res) => {
    // UPDATE THIS AFTER ALL MODELS HAVE BEEN CREATED
    Project.findAll()
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
        attributes: [
            'id', 
            'title',
            'description', 
            // 'creator',
            'value',
            // 'keyword',
            'createdAt',
            'updatedAt', 
            // [
            //     sequelize.literal('(SELECT COUNT(*) FROM vote WHERE project_id = vote.project_id)'),
            //     'vote_count'
            // ]
        ],
        // UPDATE THIS AFTER ALL MODELS HAVE BEEN CREATED
        // include: [
        //     {
        //         model: Comment,
        //         attributes: [...],
        //         include: {
        //             model: User,
        //             attributes: ['username']
        //         }
        //     },
        //     {
        //         model: User,
        //         attributes: ['username']
        //     }
        // ]   
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
// active session must exist, set up later with session
router.post('/', (req, res) => {
    Project.create({
        // TEMPORARY PARAMS FOR TESTING
        // THESE FIELDS TO BE UPDATED TO MATCH FRONT-END PROJECT SUBMISSION FORM
        title: req.body.title,
        description: req.body.description,
        value: req.body.value,
        // UPDATE LATER SO USER/CREATOR VALUE GRABBED FROM SESSION
        // creator: req.session.userId
        creator: req.body.creator
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

// PUT update Project's title, description, value (/api/projects/:id)
// active session must exist, set up later with session
router.put('/:id', (req, res) => {
    // update() method combines looking up and updating data
    Project.update(
        {
            // THESE FIELDS SHOULD MATCH FRONT-END PROJECT EDIT SUBMISSION FORM
            title: req.body.title,
            description: req.body.description,
            value: req.body.value
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
router.delete('/:id', (req, res) => {
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