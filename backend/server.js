const mongoose = require ('mongoose')
const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');

const Data = require('./data')
const dbRoute = 'mongodb+srv://admin:Password@cluster0.lgix2.mongodb.net/rsvpData?retryWrites=true&w=majority';
const path = require('path'); 

mongoose.connect(dbRoute, {useNewUrlParser: true})

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.on('open', function(){
    console.log('connected to db');
    //used for filtering data 
    function search(query) {
        return function(element) {
          for(var i in query) {
            if(query[i] != element[i]) {
              return false;
            }
          }
          return true;
        }
      }


    const app = express(); 
    const router = express.Router(); 
    app.use(bodyParser.urlencoded({ extended: false }))

    router.get('/rsvp', (req, res) => {
        Data.find((err, data) => {
            if(err) return res.json({success: false, error: err}); 
            return res.json({success: true, data})
       })
    })

    router.get('/rsvpfilter', (req, res, next) => {
        Data.find((err, data) => {
            const filteredData = data.filter(search(req.query))
            if(err) return res.json({success: false, error: err}); 
            return res.json({success: true, filteredData})
       })
    })

    router.post('/rsvp', (req, res) => {
        console.log(req.body)
        const rsvpContent = req.body; 
        console.log("saved req body = " + rsvpContent)
        if(rsvpContent.length === 0 ) {
            return res.json({
                success: false, 
                error: 'Invalid inputs',
            })
        }
        let data = new Data(); 
        data.rsvpCode = rsvpContent.rsvpCode;
        data.familyName = rsvpContent.familyName;
        data.attending = rsvpContent.attending;
        data.membersInvited = rsvpContent.membersInvited;
        data.totalMembersInvited = rsvpContent.totalMembersInvited;
        data.chicken = rsvpContent.chicken;
        data.steak = rsvpContent.steak;
        data.vegetarian = rsvpContent.vegetarian;
        data.decline = rsvpContent.decline
        data.save((err) => {
            if(err) return res.json({success: false, error: err}); 
            return res.json({success: true})
        })

    })

    router.put('/rsvp/:id', (req, res) => {
        console.log(req.body)
        Data.findByIdAndUpdate(req.params.id, req.body, (err) => {
            if(err) return res.json({success: false, error: err}); 
            return res.json({success: true})
        }) 
    })

    router.delete('/rsvp/:id',  (req, res) =>  {
        Data.findByIdAndRemove(req.params.id, (err) => {
            if(err) return res.json({success: false, error: err}); 
            return res.json({success: true})
        })
    })

    // app.get('/', function (req, res) {
    //     res.send('Hello World!');
    //   });
      
    app.use(cors()); 
    app.use(bodyParser.json())


    app.use( '/api', router)
    // // -------------------deployment information -----------------
    // if (process.env.NODE_ENV === 'production') {
    //     // Set static folder
    //     app.use(express.static('client/build'));
      
    //     app.get('*', (req, res) => {
    //       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    //     });
    //   }

    //use port unless there exists a preconfigured port 
    var port = process.env.PORT || 3001;



    app.listen(port, () => {
        console.log('listening to 3001')
    })


})