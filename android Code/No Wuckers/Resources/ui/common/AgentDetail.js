var Agent = Ti.UI.currentWindow;
Agent.orientationModes = [Ti.UI.PORTRAIT];

var calling = false;

var indicators = Ti.UI.createActivityIndicator({
	height : '50%',
	width : '60%',
	color : 'white',
	message : '  Loading...'
});
Agent.add(indicators);
indicators.show();

Agent.addEventListener('focus', function() {
	//if (calling) {
		// var url = "http://dnspalette.com/api/agentstatusapi.php?agent_id=" + Aids + "&status=0";
		// var client = Ti.Network.createHTTPClient({
			// // function called when the response data is available
			// onload : function(e) {
				// Ti.API.info("Received text: " + this.responseText);
				// json = JSON.parse(this.responseText);
			// },
			// // function called when an error occurs, including a timeout
			// onerror : function(e) {
				// Ti.API.debug(e.error);
				// alert(e.error);
			// },
			// timeout : 5000 // in milliseconds
		// });
		// // Prepare the connection.
		// client.open("GET", url);
		// // Send the request.
		// client.send();
//	}
});

var Aids = Ti.App.Properties.getString('busy');
var json;
var player;
var name, company, quality, area, phone_number, pic_url, pic_url1, pic_url2, pic_url3, pic_url4, voice_card, status, phone_no;

var url = "http://dnspalette.com/api/agentprofileApi.php?agent_id=" + Aids;
var detail = Ti.Network.createHTTPClient({
	// function called when the response data is available
	onload : function(e) {
		Ti.API.info("Received text: " + this.responseText);
		json = JSON.parse(this.responseText);
		for ( i = 0; i < json.length; i++) {

			name = json[0].agent_name;
			company = json[0].company;
			quality = json[0].quality;
			area = json[0].area;
			phone_number = json[0].agent_phone_number;
			pic_url = json[0].photo_url;
			pic_url1 = json[0].photo_url1;
			pic_url2 = json[0].photo_url2;
			pic_url3 = json[0].photo_url3;
			pic_url4 = json[0].photo_url4;
			voice_card = json[0].voicefile_url;
			status = json[0].status;
			phone_no = json[0].agent_phone_number;
			phone_no_rate = json[0].agent_phone_number_rate;
		}
		player = Ti.Media.createSound({
				url : "http://dnspalette.com/api/sound/" + voice_card
			});
		indicators.hide();

		var wdh = Titanium.Platform.displayCaps.platformWidth;

		var animateLeft = Ti.UI.createAnimation({
			left : wdh,
			duration : 400,
			height : '100%',
			width : Ti.Platform.displayCaps.platformWidth,
		});
		Agent.addEventListener('swipe', function(e) {
			if (e.direction == 'left') {
			} else if (e.direction == 'right') {
				Agent.animate(animateLeft);
				Agent.close();
			}
		});

		var busy = Ti.App.Properties.getBool('busy', false);

		var Labelfont = Math.round(Ti.Platform.displayCaps.platformWidth * 0.035);
		var detailfont = Math.round(Ti.Platform.displayCaps.platformWidth * 0.035);
		var buttonfont = Math.round(Ti.Platform.displayCaps.platformWidth * 0.055);
		var radius = Math.round(Ti.Platform.displayCaps.platformWidth * 0.002);

		var Allview = Ti.UI.createView({
			backgroundColor : '#A00002',
			height : '100%',
			width : '100%'
		});

		Agent.add(Allview);

		var TopBar = Ti.UI.createView({
			backgroundColor : '#B80000',
			width : '100%',
			height : '10%',
			top : 0
		});
		Allview.add(TopBar);

		// Create an ImageView.
		var Back = Ti.UI.createImageView({
			image : '/images/arrow.png',
			width : '15%',
			height : '70%',
			left : '2%'
		});
		Back.addEventListener('click', function() {
			player.pause();
			player.release();
			Agent.animate(animateLeft);
			Agent.close();
		});

		// Add to the parent view.
		TopBar.add(Back);

		// Create a Button.
		var Tap = Ti.UI.createButton({
			title : 'TAP to Call',
			color : '#622C07',
			backgroundColor : '#FFAE14',
			height : '70%',
			font : {
				fontWeight : 'bold',
				fontSize : buttonfont
			},
			width : '40%',
			right : '3%',
			borderRadius : 3
		});

		// Listen for click events.
		Tap.addEventListener('click', function() {
			player.pause();
			if (status == '0') {
				var intent = Ti.Android.createIntent({
					action : Ti.Android.ACTION_CALL,
					data : 'tel:' + phone_no
				});
				Ti.Android.currentActivity.startActivity(intent);
				// var url = "http://dnspalette.com/api/agentstatusapi.php?agent_id=" + Aids + "&status=1";
				// var client = Ti.Network.createHTTPClient({
					// // function called when the response data is available
					// onload : function(e) {
						// Ti.API.info("Received text: " + this.responseText);
						// json = JSON.parse(this.responseText);
						// calling = true;
// 
					// },
					// // function called when an error occurs, including a timeout
					// onerror : function(e) {
						// Ti.API.debug(e.error);
						// alert(e.error);
					// },
					// timeout : 5000 // in milliseconds
				// });
				// // Prepare the connection.
				// client.open("GET", url);
				// // Send the request.
				// client.send();
			} else {
				alert('Please come back later!');
			}

		});

		// Add to the parent view.
		TopBar.add(Tap);

		var body = Ti.UI.createView({
			width : '100%',
			height : '90%',
			top : '10%'
		});
		Allview.add(body);

		var BigImageView = Ti.UI.createView({
			backgroundImage : 'http://dnspalette.com/api/images/' + pic_url,
			backgroundColor : '#38313F',
			width : '100%',
			height : '45%',
			top : '0%'
		});
		BigImageView.addEventListener('click', function() {
			player.pause();
			if (status == '0') {

				var intent = Ti.Android.createIntent({
					action : Ti.Android.ACTION_CALL,
					data : 'tel:' + phone_no
				});
				Ti.Android.currentActivity.startActivity(intent);
				// var url = "http://dnspalette.com/api/agentstatusapi.php?agent_id=" + Aids + "&status=1";
				// var client = Ti.Network.createHTTPClient({
					// // function called when the response data is available
					// onload : function(e) {
						// Ti.API.info("Received text: " + this.responseText);
						// json = JSON.parse(this.responseText);
						// calling = true;
// 
					// },
					// // function called when an error occurs, including a timeout
					// onerror : function(e) {
						// Ti.API.debug(e.error);
						// alert(e.error);
					// },
					// timeout : 5000 // in milliseconds
				// });
				// // Prepare the connection.
				// client.open("GET", url);
				// // Send the request.
				// client.send();
			} else {
				alert('Please come back later!');
			}
		});
		body.add(BigImageView);

		var qImageView = Ti.UI.createImageView({
			image : '/images/q-mark.png',
			width : '15%',
			height : '10%',
			left : '2%',
			top : '1%'
		});
		qImageView.addEventListener('click', function() {
			player.pause();
			var help = Ti.UI.createWindow({
				backgroundColor : '#A00002',
				url : 'Help.js',
				navBarHidden : true
			});
			help.open();
		});

		body.add(qImageView);

		// var handImageView = Ti.UI.createImageView({
			// image : '/images/hands.png',
			// width : '15%',
			// height : '10%',
			// left : '2%',
			// top : '11.5%'
		// });
		// var isToggle = false;
		// handImageView.addEventListener('click', function() {
			// if (isToggle) {
				// handImageView.image = '/images/hands.png';
				// isToggle = false
			// } else {
				// handImageView.image = '/images/hands_free.png';
				// isToggle = true
			// }
		// });
// 
		// body.add(handImageView);

		var profileImageView = Ti.UI.createImageView({
			image : '/images/profile.png',
			width : '15%',
			height : '10%',
			left : '2%',
			top : '11.5%'
		});
		profileImageView.addEventListener('click', function() {
			player.play();
		});

		body.add(profileImageView);

		var centerLebelview = Ti.UI.createView({
			backgroundColor : '#430000',
			width : '100%',
			height : '15%',
			top : '50%',
			layout : 'vertical'
		});
		Allview.add(centerLebelview);

		// Create a Label.
		var text = Ti.UI.createLabel({
			text : name + ", " + company + ", " + quality + ", " + area,
			color : 'white',
			font : {
				fontSize : detailfont,
				fontWeight : 'bold'
			},
			top : 1,
			left : 1
		});

		if (status == '0') {

		} else {

			var busyView = Ti.UI.createButton({
				title : 'In a Call, Sorry',
				color : '#622C07',
				backgroundColor : '#FFAE14',
				height : '48%',
				font : {
					fontWeight : 'bold',
					fontSize : buttonfont
				},
				width : '60%',
				bottom : 0,
				left : 0
			});
			centerLebelview.add(busyView);
		}

		// Add to the parent view.
		centerLebelview.add(text);

		// Create a Label.
		var textlabel = Ti.UI.createLabel({
			top : '61%',
			text : 'Tap on the button in the right upper corner to get connected, or simply tap on the picture.',
			color : 'white',
			font : {
				fontSize : Labelfont,
				fontWeight : 'bold'
			},
			left : 1
		});

		// Add to the parent view.
		body.add(textlabel);

		var textlabel2 = Ti.UI.createLabel({
			top : '67%',
			text : "call coss are $" + phone_no_rate + " per minute, GST included. Higher from Pay/Mob.",
			color : 'white',
			font : {
				fontSize : Labelfont,
				fontWeight : 'bold'
			},
			left : 1
		});

		// Add to the parent view.
		body.add(textlabel2);

		var agentImageView1 = Ti.UI.createImageView({
			backgroundColor : '#38313F',
			image : 'http://dnspalette.com/api/thumb/' + pic_url1,
			width : '20%',
			height : '15%',
			left : '2%',
			top : '74%'
		});
		agentImageView1.addEventListener('click', function() {
			player.pause();
			BigImageView.backgroundImage = 'http://dnspalette.com/api/images/' + pic_url1;
		});
		body.add(agentImageView1);

		var agentImageView2 = Ti.UI.createImageView({
			backgroundColor : '#38313F',
			image : 'http://dnspalette.com/api/thumb/' + pic_url2,
			width : '20%',
			height : '15%',
			left : '27%',
			top : '74%'
		});
		agentImageView2.addEventListener('click', function() {
			player.pause();
			BigImageView.backgroundImage = 'http://dnspalette.com/api/images/' + pic_url2;
		});
		body.add(agentImageView2);

		var agentImageView3 = Ti.UI.createImageView({
			backgroundColor : '#38313F',
			image : 'http://dnspalette.com/api/thumb/' + pic_url3,
			width : '20%',
			height : '15%',
			left : '52%',
			top : '74%'
		});
		agentImageView3.addEventListener('click', function() {
			player.pause();
			BigImageView.backgroundImage = 'http://dnspalette.com/api/images/' + pic_url3;
		});
		body.add(agentImageView3);
		var agentImageView4 = Ti.UI.createImageView({
			backgroundColor : '#38313F',
			image : 'http://dnspalette.com/api/thumb/' + pic_url4,
			width : '20%',
			height : '15%',
			left : '77%',
			top : '74%'
		});
		agentImageView4.addEventListener('click', function() {
			player.pause();
			BigImageView.backgroundImage = 'http://dnspalette.com/api/images/' + pic_url4;
		});
		body.add(agentImageView4);

	},
	// function called when an error occurs, including a timeout
	onerror : function(e) {
		Ti.API.debug(e.error);
		indicators.hide();
		alert(e.error);
	},
	timeout : 5000 // in milliseconds
});
// Prepare the connection.
detail.open("GET", url);
// Send the request.
detail.send();

