const express = require('express');

var app = express();
const port = 3000;


var {get_user, get_user_continue} = require('./core/scrape');

app.get('/user_profile/:username', (req, res) => {
  	
  	var username = req.params.username;
  	//console.log(username );

  	get_user(username).then( function(result) {
       

        console.log("Get user details");
        // Use user details from here
        // console.log(result)
    	res.send(result);

    }, function(err) {
    	
    	console.log(err);
    	
    	var errObj = {
    		error : err
    	}

        res.status(404).send(errObj);
    })	
});


app.get('/user_profile_continue/:username', (req, res) => {
  	
  	var username = req.params.username;
  	console.log('user name ');
  	console.log(username )

  	get_user_continue(username).then( function(result) {
       
      console.log("Get user continue details");
      // Use user details from here
      //console.log(result)
    	res.send(result);

    }, function(err) {
    	
    	console.log(err);
    	
    	var errObj = {
    		error : err
    	}

      res.status(404).send(errObj);
    })	
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};