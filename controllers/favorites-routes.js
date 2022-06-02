const Sequelize = require('sequelize');
const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Project, Vote, Comment } = require("../models");
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req, res) => {
  // select project ids from votes where the user id of the vote id matches the session id

  const dbVotes = await Vote.findAll({
    where: {
      userId: req.session.userId
    },
    attributes: ['projectId'],
    include: [
      {
        model: Project,
        attributes: ['id', 'title', 'description', 'createdAt'],
        include: [
          {
            model: Comment
          },
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Vote,
            attributes: []
          }
        ]
      },
      {
        model: User,
        attributes: ['id', 'username']
      }
    ]
  });

  const votes = dbVotes.map(dbVote => dbVote.get({ plain: true }));

  console.log(votes);
  
  res.render("favorites", {
    votes,
    loggedIn: req.session.loggedIn,
    username: req.session.username,
  });
});

router.get('/edit-project/:id', withAuth, (req, res) => {
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
