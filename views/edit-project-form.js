const router = require("../controllers/api/favorites-routes");

router.put('/:id', (req, res) => {
    Project.update(
        {
            
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
        if (!dbProjectData) {
            res.status(404).json({ message: 'No project found with this id!' });
        }

        res.json ({ message: 'TO DO: Redirect to single project page'}) 
        // res.redirect(Single-Project page);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});


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


//make a form front end, call it and back end will route it. 
//