const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Project, Vote } = require("../../models");

router.get("/", async (req, res) => {
  const user = await User.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.render('edit-project', { project, loggedIn: req.session.loggedIn, username: req.session.username }) 
});


router.get("/:id", async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  // be sure to include its associated Products
  res.render("favorites", { loggedIn: true });
});

const projects = dbProjectData.map((project) => project.get({ plain: true }));
const project = dbProjectData.get({ plain: true });




module.exports = router;
