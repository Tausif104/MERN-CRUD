const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')
const notesRouter = require('./routes/notesRoute')

const app = express()
app.use(cors())
dotenv.config()
app.use(express.json())

app.use('/api/notes', notesRouter)

connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is running on port ${5000}`)
})
