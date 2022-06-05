// ALL ROUTES FOR KEYWORD MODEL (CRUD)
const router = require('express').Router();
const { Keyword, Project, ProjectKeyword } = require('../../models');

// GET all keywords (/api/keywords)
router.get('/', (req, res) => {
    // finds all keywords, including associated Projects
    Keyword.findAll(
        {
            // include: [Project]
        }
    )
    .then(dbKeywordData => res.status(200).json(dbKeywordData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// GET single keyword (/api/keywords/:id)
router.get('/:id', (req, res) => {
    // find single keyword via id, include associated Projects
    Keyword.findOne({
        where: {
            id: req.params.id
        },
        // include: [Project]
    })
    .then(dbKeywordData => {
        if (!dbKeywordData) {
            res.status(404).json({ message: 'No keyword found with this id!' });
            return;
        }

        res.json(dbKeywordData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST new keyword (/api/keywords)
router.post('/', (req, res) => {
    Keyword.create({
        name: req.body.name
    })
    .then(dbKeywordData => res.status(200).json(dbKeywordData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT update keyword name (/api/keywords/:id)
router.put('/:id', (req, res) => {
    Keyword.update(
        {
            name: req.body.name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbKeywordData => {
        if (!dbKeywordData) {
            res.status(404).json({ message: 'No keyword found with this id!' });
            return;
        }

        res.json({ message: 'Keyword updated.' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE remove keyword (/api/keywords/:id)
router.delete('/:id', (req, res) => {
    Keyword.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbKeywordData => {
        if (!dbKeywordData) {
            res.status(404).json({ message: 'No keyword found with this id!' });
            return;
        }

        res.json({ message: 'Keyword deleted.' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
