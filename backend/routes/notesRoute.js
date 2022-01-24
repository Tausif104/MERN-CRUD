const express = require('express')
const router = express.Router()
const Note = require('../models/Note')

// GET all
router.get('/', async (req, res) => {
	const count = await Note.count()

	const page = req.query.page
	const size = req.query.size
	let notes
	if (page) {
		notes = await Note.find()
			.skip(page * size)
			.limit(size)
	} else {
		notes = await Note.find({})
	}

	if (notes.length > 0) {
		res.json({ notes, count })
	} else {
		res.json({ msg: 'No Notes Found' })
	}
})

// GET one
router.get('/:id', async (req, res) => {
	const note = await Note.findById(req.params.id)
	res.json(note)
})

// POST one
router.post('/', async (req, res) => {
	const note = {
		title: req.body.title,
		desc: req.body.desc,
		author: req.body.author,
	}

	const newNote = new Note(note)
	const createdNote = await newNote.save()
	res.json(createdNote)
})

// DELETE one
router.delete('/:id', async (req, res) => {
	const note = await Note.findById(req.params.id)
	const deletedNote = await note.remove()
	res.json(deletedNote)
})

router.put('/edit/:id', async (req, res) => {
	const note = await Note.findOne({ _id: req.params.id })
	if (req.body.title) {
		note.title = req.body.title
	}
	if (req.body.desc) {
		note.desc = req.body.desc
	}
	if (req.body.author) {
		note.author = req.body.author
	}

	await note.save()
	res.json(note)
})

module.exports = router
