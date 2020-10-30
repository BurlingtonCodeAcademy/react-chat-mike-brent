// set up dotenv
require('dotenv').config()

// bring in Mongooose
const mongoose = require('mongoose')
//Open connection to database
mongoose.connect(`mongodb+srv://brent:${process.env.DBPASS}@cluster0.pvmyn.mongodb.net/chat-project?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
const myDb = mongoose.connection

// add event listener for connection errors
myDb.on('error', console.error.bind(console, 'connection error:'))

//Top level schema for any post
const postSchema = new mongoose.Schema({
    date: Date,
    author: String,
    body: String
})

const RoomOne = mongoose.model('RoomOne', postSchema)
const RoomTwo = mongoose.model('RoomTwo', postSchema)


// let newPostObj = {
//     date: new Date().toLocaleDateString(),
//     author: ' 3 Test Author',
//     body: ' 3 Test Message'
// }

// let postOne = new RoomOne(newPostObj)
// postOne.save()

// let postTwo = new RoomTwo(newPostObj)
// postTwo.save()

async function showRoomPosts(roomId) {
    console.log('roomId =', roomId)
   { roomId === 'one' ? roomVar = RoomOne : roomVar = RoomTwo}

    let roomPosts = await roomVar.find({})
        
    console.log(`${roomVar} posts are: `, roomPosts)
    return (roomPosts)
}

//showRoomPosts('one')







