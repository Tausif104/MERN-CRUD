const mongoose = require('mongoose')

const connectDB = async () => {
	const db = process.env.MONGO_URI
	try {
		const conn = await mongoose.connect(db)

		console.log(`MongoDB Connected ${conn.connection.host}`)
	} catch (error) {
		console.error(error)
	}
}

module.exports = { connectDB }
