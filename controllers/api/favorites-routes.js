const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Project, Vote } = require("../../models");

router.get("/", async (req, res) => {
  const user = await User.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.render("edit-project", {
    project,
    loggedIn: req.session.loggedIn,
    username: req.session.username,
  });
});

router.get("/:id", async (req, res) => {
  // const user = await User.findOne({
  //   where: {
  //     id: req.params.id,
  //   },
  // });

  if (!req.session.loggedIn) {
    res.redirect("login");
  } else {
    res.render("favorites", { loggedIn: true });
  }
});


router.put('/:id', (req, res) => {
  Project.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
      }
    })
  .then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!'})
        return;
    }
    res.json({ message: 'Password updated!'});  
    })   
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Failed to successfully create Project !'});
    });
});

router.delete("/:?", async (req, res) => {
  // delete a category by its `id` value
  await Project.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: 'Deleted.' });
});


// const projects = dbProjectData.map((project) => project.get({ plain: true }));
// const project = dbProjectData.get({ plain: true });

module.exports = router;




//pass projects voted on to favorites page and render that list based on that argument. 
