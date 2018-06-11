var request = require('request');
var cheerio = require('cheerio');

var schedule = require('node-schedule');

function get_user(username) {
	var options = {
        url: 'https://socialblade.com/instagram/user/' + username,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0'
        }
    };

    return new Promise(function(resolve, reject) {
    	
    	// Do async job
        request.get(options , function (error, response, html) {
	    	if (error) {
	        
	            reject(error);
	            return;
	        
	        }else if (response.statusCode != 200) {
				
				reject(response);
				return;
				
			}else{
				
				const $ = cheerio.load(html);

				var target = $('.stats-top-data-content');
				
				if(target.length != 6){
					
					reject('user not exist');
					return;
				}
				
				var user = {
					followers: target.eq(0).text(),
					following: target.eq(1).text(),
					img_upload: target.eq(2).text(),
					avg_dfollower: target.eq(3).text(),
					instagram_id: target.eq(4).text(),
					fullname: target.eq(5).text(),
				}
				//console.log(user);
				resolve(user); 

			}
		});
    })
    
}

function get_user_continue(username) {

	var rule = "*/2 * * * *";
	//run every two minutes

	var cnt = 0;

	return new Promise(function(resolve, reject) {

		var j = schedule.scheduleJob(rule, async()=>{
			try {
		    	var user = await get_user(username);
		    	
		    	cnt++;
		    	

		    	if(cnt === 10){
		    		j.cancel();
		    		resolve(user);
		    	}
		  	} catch(err) {
		  		j.cancel();
		  		reject(err);
		  		
		  	}
		});
	})
}
module.exports = {get_user, get_user_continue};
