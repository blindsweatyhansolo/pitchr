const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Project, Vote, Comment } = require("../models");

router.get("/", async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
    include: [
      {
        model: Project
      },
      {
        model: Comment
      },
      {
        model: Vote
      }
    ] 
  });
  res.render("favorites", {
    user,
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
