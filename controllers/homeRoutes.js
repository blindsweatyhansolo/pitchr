const Sequelize = require('sequelize');
const router = require("express").Router();
const sequelize = require('../config/connection');
const { Project, User, Comment, Vote } = require('../models');
const withAuth = require("../utils/auth");


// HOME ROUTES
router.get('/', (req, res) => {
    // require authorization WITHAUTH
    // FIND ALL ACTIVE PROJECTS AND RENDER TO PAGE
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
                attributes: []
            }
        ],
        group: ["project.id"]
    })
    .then(dbProjectData => {
        // serialize the data
        const projects = dbProjectData.map(project => project.get({ plain: true }));

        res.render('homepage', {
            projects,
            // logged in status
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });

        console.log(projects);
    })
    .catch(err => res.json(err));
});

// SINGLE PROJECT PAGE
router.get('/project/:id', withAuth, (req, res) => {
    Project.findOne({
        where: {
            id: req.params.id
        },
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
                attributes: []
            }
        ],
        group: ["project.id"]
    })
    .then(dbProjectData => {
        if (!dbProjectData) {
            res.status(404).json({message: 'NO MATCHING PROJECT'});
            return;
        }

        // serialize the data
        const project = dbProjectData.get({ plain: true });

        // pass data to template, second variable is logged in status
        res.render('single-project', {
            project,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        });
        
        console.log(project);
    })
    .catch(err => res.json(err));
});

// GET PROFILE PAGE
router.get('/profile', withAuth, async (req, res) => {
    const dbUser = await User.findOne({
        where: {
            id: req.session.userId
        }
    });

    const dbProjects = await Project.findAll({
        where: {
          userId: req.session.userId
        },
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
            attributes: []
          }
        ],
        group: [
          "project.id"
        ]
      });
    
    const projects = dbProjects.map(dbProject => dbProject.get({ plain: true }));
    const user = dbUser.get({ plain: true });

    console.log(projects, user);

    res.render('profile', {
        projects,
        user,
        loggedIn: req.session.loggedIn,
        username: req.session.username
    });
});

// EDIT PROFILE PAGE
router.get('/profile/:id', withAuth, async (req, res) => {
    const dbUser = await User.findOne({
        where: {
            id: req.session.userId
        }
    });

    const user = dbUser.get({ plain: true });

    res.render('edit-profile', {
        user,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        userId: req.session.userId
    });
});


// LOGIN PAGE
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


module.exports = router;