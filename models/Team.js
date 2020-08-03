// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teamName: {
    type: String,
    required: false
  },
  playerOne: {
    type: String,
    required: false
  },
  playerTwo: {
    type: String,
    required: false
  },
  playerThree: {
    type: String,
    required: false
  },
  playerFour: {
    type: String,
    required: false
  },
  playerFive: {
    type: String,
    required: false 
  },
   status: {
     type: String,
     enum: ['In Progress', 'Finished'],
     default: 'In Progress'
   }
});


module.exports = mongoose.model('Team', TeamSchema);