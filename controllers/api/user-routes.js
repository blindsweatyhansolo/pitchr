const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User } = require("../../models");


// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const user = await User.findAll(
    {
      attributes: { exclude: ['password'] }
    }
  );
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id, 
    },
  });
  // be sure to include its associated Products
  res.json(user);
});

router.post("/", (req, res) => {
  User.create({ 
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
   }).then(dbUserData => {
      req.session.save(() => {
        req.session.userId = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData);
      })
   })
   .catch(err => {
    console.log(err);
    res.status(500).json(err);
   });
});


//login route using post method
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({ message: 'User not found!'});
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect Password!'});
      return;
    }

    res.json(dbUserData);
  })

});

router.put('/:id', (req, res) => {
  User.update(req.body, {
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
  res.status(500).json({ message: 'Server error!'});
  });
})

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send()
});


module.exports = router;