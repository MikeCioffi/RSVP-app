const mongoose = require('mongoose'); 


const DataSchema = mongoose.Schema (
    {
        rsvpCode: String,
        familyName: String, 
        attending: Boolean,
        membersInvited: Number, 
        totalMembersInvited: Number, 
        chicken: Number, 
        steak: Number, 
        vegetarian: Number, 
        decline: Number
    }
)

module.exports = mongoose.model('Data', DataSchema)