const Sequelize = require('sequelize');
const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Project, Vote, Comment } = require("../models");

router.get("/", async (req, res) => {
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

  res.render("favorites", {
    projects,
    loggedIn: req.session.loggedIn,
    username: req.session.username,
  });
});

router.get('/edit-project/:id', (req, res) => {
  // IF LOGGED IN USER IS PROJECT CREATOR THEN ALLOW EDIT
  // OTHERWISE ALERT/MODAL CAN'T EDIT
  Project.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Comment,
        attributes: ['id', 'text', 'projectId', 'userId'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbProjectData => {
    const project = dbProjectData.get({ plain: true });

    res.render("edit-project", {
      project,
      loggedIn: req.session.loggedIn
      }
    );
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
