var win = Ti.UI.currentWindow;

var count = 0;
var body;

var busy = [];
var Busylabel = [];

var leftMenu, leftMenuhide;

var AgentImagesData = [];
var AgentStatusData = [];
var AgentidData = [];

var AgentImagesDatatmp = [];
var AgentStatusDatatmp = [];
var AgentidDatatmp = [];

var AgentStatusDataNew = [];

var Category_id = [];
var Category_name = [];

var ownership = Ti.App.Properties.getString('ownership');

Category_id = Ti.App.Properties.getList('Category_id');
Category_name = Ti.App.Properties.getList('Category_name');
var selected = Ti.App.Properties.getString('selectCategory');
var indx = Category_id.indexOf(selected);

AgentImagesData = Ti.App.Properties.getList('images');
AgentStatusData = Ti.App.Properties.getList('status');
AgentidData = Ti.App.Properties.getList('id');

AgentImagesDatatmp = Ti.App.Properties.getList('images');
AgentStatusDatatmp = Ti.App.Properties.getList('status');
AgentidDatatmp = Ti.App.Properties.getList('id');

// Facebook like menu window

var hgt = Titanium.Platform.displayCaps.platformHeight;
var wdh = Titanium.Platform.displayCaps.platformWidth;

var detailfont = Math.round(Ti.Platform.displayCaps.platformWidth * 0.035);
var titlefont = Math.round(Ti.Platform.displayCaps.platformWidth * 0.060);
var Buttonfont = Math.round(Ti.Platform.displayCaps.platformWidth * 0.045);

var isToggled = false;
var catshow = 4;

var leftMenuWin = Ti.UI.createWindow({
	backgroundColor : '#550000',
	top : 0,
	left : 0,
	width : wdh * 0.8,
	zIndex : 1
});
MenuView();
function MenuView() {
	leftMenu = Ti.UI.createScrollView({
		backgroundColor : '#550000',
		layout : 'vertical'
	});
	leftMenuWin.add(leftMenu);

	var TopView = Ti.UI.createView({
		backgroundColor : '#840000',
		width : '100%',
		height : hgt * 0.09,
		//top : 0
	});
	leftMenu.add(TopView);

	// Create a Label.
	var Wuckers = Ti.UI.createLabel({
		text : 'No Wuckers',
		color : 'white',
		font : {
			fontSize : titlefont,
			fontFamily : 'ChalkDust'
		},
		textAlign : 'center'
	});
	TopView.add(Wuckers);

	var TopViewline = Ti.UI.createView({
		backgroundColor : '#990000',
		width : '100%',
		height : hgt * 0.005,
		//top : '9.5%'
	});
	leftMenu.add(TopViewline);

	var blankView = Ti.UI.createView({
		backgroundColor : '#550000',
		width : '100%',
		height : hgt * 0.09,
		//top : '20.5%'
	});

	leftMenu.add(blankView);

	var TopViewline = Ti.UI.createView({
		backgroundImage : '/images/sepreter.png',
		width : '100%',
		height : hgt * 0.005,
		//top : '20%'
	});
	leftMenu.add(TopViewline);

	var homeView = Ti.UI.createView({
		backgroundColor : '#350000',
		width : '100%',
		height : hgt * 0.09,
		//top : '20.5%'
	});
	homeView.addEventListener('click', function() {
		isToggled = false;
		win.animate(animateRight);
	});

	leftMenu.add(homeView);

	var homeimage = Ti.UI.createImageView({
		image : '/images/home.png',
		width : '12%',
		height : '50%',
		left : '5%'
	});
	homeView.add(homeimage);

	var Available = Ti.UI.createLabel({
		text : 'Available Agents',
		color : '#D09494',
		font : {
			fontSize : titlefont,
			fontWeight : 'bold'
		},
		left : '23%'
	});
	homeView.add(Available);

	var homeViewline = Ti.UI.createView({
		backgroundImage : '/images/sepreter.png',
		width : '100%',
		height : '0.5%',
		//top : '30%'
	});
	leftMenu.add(homeViewline);

	var CategoryView = Ti.UI.createView({
		backgroundColor : '#550000',
		width : '100%',
		height : hgt * 0.09,
		//top : '30.5%'
	});
	var clicked = false;
	CategoryView.addEventListener('click', function() {
		leftMenu.hide();
		leftMenuhide.show();
	});
	leftMenu.add(CategoryView);

	var categoriesimage = Ti.UI.createImageView({
		image : '/images/categories-hover.png',
		width : '12%',
		height : '50%',
		left : '5%'
	});
	CategoryView.add(categoriesimage);

	var categories = Ti.UI.createLabel({
		text : 'Categories',
		color : 'white',
		font : {
			fontSize : titlefont,
			fontWeight : 'bold'
		},
		left : '23%'
	});
	CategoryView.add(categories);

	var arrowdownimage = Ti.UI.createImageView({
		image : '/images/arrow-up.png',
		width : '8%',
		height : '25%',
		right : '10%'
	});
	CategoryView.add(arrowdownimage);

	var CategoryViewline = Ti.UI.createView({
		backgroundImage : '/images/sepreter.png',
		width : '100%',
		height : hgt * 0.005,
		//top : '40%'
	});
	leftMenu.add(CategoryViewline);

	var categoryView = [];
	var categoryimage = [];
	var Category = [];
	var categoryViewline = [];
	var lengthcat = Category_name.length;
	for (var i = 0; i < lengthcat; i++) {
		categoryView[i] = Ti.UI.createView({
			backgroundColor : '#550000',
			width : '100%',
			height : hgt * 0.09,
			id : i
		});

		categoryView[i].addEventListener('click', function(e) {
			var tmp = e.source.id;
			if (tmp != undefined) {
				categoryView[indx].backgroundColor = '#550000';
				categoryimage[indx].image = '/images/circule.png';
				indx = tmp;
				categoryView[tmp].backgroundColor = '#350000';
				categoryimage[tmp].image = '/images/circule-active.png';
				var cat = Ti.App.Properties.setString('Category', Category_id[tmp]);
				var indicators = Ti.UI.createActivityIndicator({
					height : '50%',
					width : '60%',
					color : 'white',
					message : '  Loading...'
				});
				Allview.add(indicators);
				indicators.show();

				isToggled = false;
				win.animate(animateRight);

				AgentImagesData = [];
				AgentStatusData = [];
				AgentidData = [];
				AgentImagesDatatmp = [];
				AgentStatusDatatmp = [];
				AgentidDatatmp = [];
				category_selected = Category_id[tmp];
				var url = "http://dnspalette.com/api/agentlistApi.php?category_id=%20" + Category_id[tmp] + "&show_next=0";
				var client = Ti.Network.createHTTPClient({
					// function called when the response data is available
					onload : function(e) {
						Ti.API.info("Received text: " + this.responseText);
						json = JSON.parse(this.responseText);
						for ( i = 0; i < json.length; i++) {
							AgentImagesData.push(json[i].photo_url);
							AgentStatusData.push(json[i].status);
							AgentidData.push(json[i].agent_id);
							AgentImagesDatatmp.push(json[i].photo_url);
							AgentStatusDatatmp.push(json[i].status);
							AgentidDatatmp.push(json[i].agent_id);
						}
						count = 0;
						Allview.remove(body);
						BodyPart();
						agents();
						indicators.hide();
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
				client.open("GET", url);
				// Send the request.
				client.send();
			}
		});

		leftMenu.add(categoryView[i]);

		categoryimage[i] = Ti.UI.createImageView({
			image : '/images/circule.png',
			width : '12%',
			height : '50%',
			left : '5%',
			id : i
		});
		categoryView[i].add(categoryimage[i]);

		Category[i] = Ti.UI.createLabel({
			text : Category_name[i],
			color : '#D09494',
			font : {
				fontSize : titlefont,
				fontWeight : 'bold'
			},
			left : '23%',
			id : i
		});
		categoryView[i].add(Category[i]);

		categoryViewline[i] = Ti.UI.createView({
			backgroundImage : '/images/sepreter.png',
			width : '100%',
			height : hgt * 0.005,
			id : i
			//top : '50%'
		});
		leftMenu.add(categoryViewline[i]);
	}

	categoryView[indx].backgroundColor = '#350000';
	categoryimage[indx].image = '/images/circule-active.png';

	var helpView = Ti.UI.createView({
		backgroundColor : '#550000',
		width : '100%',
		height : hgt * 0.09,
		//top : '40.5%'
	});

	helpView.addEventListener('click', function() {
		var help = Ti.UI.createWindow({
			backgroundColor : '#A00002',
			url : 'Help.js',
			navBarHidden : true,
			fullscreen : true
		});
		help.open();
		isToggled = false;
		win.animate(animateRight);
	});
	leftMenu.add(helpView);

	var Helpimage = Ti.UI.createImageView({
		image : '/images/help.png',
		width : '12%',
		height : '50%',
		left : '5%'
	});
	helpView.add(Helpimage);

	var Available = Ti.UI.createLabel({
		text : 'Help Center',
		color : '#D09494',
		font : {
			fontSize : titlefont,
			fontWeight : 'bold'
		},
		left : '23%'
	});
	helpView.add(Available);

	var helpViewline = Ti.UI.createView({
		backgroundImage : '/images/sepreter.png',
		width : '100%',
		height : hgt * 0.005,
		//top : '50%'
	});
	leftMenu.add(helpViewline);

	// Create a Label.
	var Detail = Ti.UI.createLabel({
		text : '\n\n' + ownership,
		color : '#D09494',
		font : {
			fontSize : detailfont,
		},
		left : '2%',
		//top : '60%'
	});
	leftMenu.add(Detail);

	var Terms = Ti.UI.createLabel({
		text : '\n\n\nTerms & Conditions\n\n',
		color : '#D09494',
		font : {
			fontSize : detailfont,
		},
		left : '2%',
		//top : '70%'
	});
	Terms.addEventListener('click', function() {
		var terms = Ti.UI.createWindow({
			backgroundColor : '#A00002',
			url : 'Terms.js',
			navBarHidden : true,
			fullscreen : true
		});
		terms.open();
		isToggled = false;
		win.animate(animateRight);
	});
	leftMenu.add(Terms);
}

NotMenuView();
function NotMenuView() {
	leftMenuhide = Ti.UI.createScrollView({
		backgroundColor : '#550000',
		layout : 'vertical'
	});
	leftMenuWin.add(leftMenuhide);

	var TopView = Ti.UI.createView({
		backgroundColor : '#840000',
		width : '100%',
		height : hgt * 0.09,
	});
	leftMenuhide.add(TopView);

	// Create a Label.
	var Wuckers = Ti.UI.createLabel({
		text : 'No Wuckers',
		color : 'white',
		font : {
			fontSize : titlefont,
			fontFamily : 'ChalkDust'
		},
		textAlign : 'center'
	});
	TopView.add(Wuckers);

	var TopViewline = Ti.UI.createView({
		backgroundColor : '#990000',
		width : '100%',
		height : hgt * 0.005,
	});
	leftMenuhide.add(TopViewline);

	var blankView = Ti.UI.createView({
		backgroundColor : '#550000',
		width : '100%',
		height : hgt * 0.09,
	});

	leftMenuhide.add(blankView);

	var TopViewline = Ti.UI.createView({
		backgroundImage : '/images/sepreter.png',
		width : '100%',
		height : hgt * 0.005,
	});
	leftMenuhide.add(TopViewline);

	var homeView = Ti.UI.createView({
		backgroundColor : '#350000',
		width : '100%',
		height : hgt * 0.09,
	});
	homeView.addEventListener('click', function() {
		isToggled = false;
		win.animate(animateRight);
	});

	leftMenuhide.add(homeView);

	var homeimage = Ti.UI.createImageView({
		image : '/images/home.png',
		width : '12%',
		height : '50%',
		left : '5%'
	});
	homeView.add(homeimage);

	var Available = Ti.UI.createLabel({
		text : 'Available Agents',
		color : '#D09494',
		font : {
			fontSize : titlefont,
			fontWeight : 'bold'
		},
		left : '23%'
	});
	homeView.add(Available);

	var homeViewline = Ti.UI.createView({
		backgroundImage : '/images/sepreter.png',
		width : '100%',
		height : '0.5%',
	});
	leftMenuhide.add(homeViewline);

	var CategoryView = Ti.UI.createView({
		backgroundColor : '#550000',
		width : '100%',
		height : hgt * 0.09
	});
	var clicked = false;
	CategoryView.addEventListener('click', function() {
		leftMenuhide.hide();
		leftMenu.show();
	});
	leftMenuhide.add(CategoryView);

	var categoriesimage = Ti.UI.createImageView({
		image : '/images/categories.png',
		width : '12%',
		height : '50%',
		left : '5%'
	});
	CategoryView.add(categoriesimage);

	var categories = Ti.UI.createLabel({
		text : 'Categories',
		color : '#D09494',
		font : {
			fontSize : titlefont,
			fontWeight : 'bold'
		},
		left : '23%'
	});
	CategoryView.add(categories);

	var arrowdownimage = Ti.UI.createImageView({
		image : '/images/arrow-down.png',
		width : '8%',
		height : '25%',
		right : '10%'
	});
	CategoryView.add(arrowdownimage);

	var CategoryViewline = Ti.UI.createView({
		backgroundImage : '/images/sepreter.png',
		width : '100%',
		height : hgt * 0.005,
	});
	leftMenuhide.add(CategoryViewline);

	var helpView = Ti.UI.createView({
		backgroundColor : '#550000',
		width : '100%',
		height : hgt * 0.09,
	});

	helpView.addEventListener('click', function() {
		var help = Ti.UI.createWindow({
			backgroundColor : '#A00002',
			url : 'Help.js',
			navBarHidden : true,
			fullscreen : true
		});
		help.open();
		isToggled = false;
		win.animate(animateRight);
	});
	leftMenuhide.add(helpView);

	var Helpimage = Ti.UI.createImageView({
		image : '/images/help.png',
		width : '12%',
		height : '50%',
		left : '5%'
	});
	helpView.add(Helpimage);

	var Available = Ti.UI.createLabel({
		text : 'Help Center',
		color : '#D09494',
		font : {
			fontSize : titlefont,
			fontWeight : 'bold'
		},
		left : '23%'
	});
	helpView.add(Available);

	var helpViewline = Ti.UI.createView({
		backgroundImage : '/images/sepreter.png',
		width : '100%',
		height : hgt * 0.005,
	});
	leftMenuhide.add(helpViewline);

	// Create a Label.
	var Detail = Ti.UI.createLabel({
		text : '\n\n' + ownership,
		color : '#D09494',
		font : {
			fontSize : detailfont,
		},
		left : '2%',
	});
	leftMenuhide.add(Detail);

	var Terms = Ti.UI.createLabel({
		text : '\n\n\nTerms & Conditions\n\n\n',
		color : '#D09494',
		font : {
			fontSize : detailfont,
		},
		left : '2%',
	});
	Terms.addEventListener('click', function() {
		var terms = Ti.UI.createWindow({
			backgroundColor : '#A00002',
			url : 'Terms.js',
			navBarHidden : true,
			fullscreen : true
		});
		terms.open();
		isToggled = false;
		win.animate(animateRight);
	});
	leftMenuhide.add(Terms);
}

// animations
var animateLeft = Ti.UI.createAnimation({
	left : wdh * 0.8,
	duration : 350,
	height : '100%',
	width : Ti.Platform.displayCaps.platformWidth,
});
var animateRight = Ti.UI.createAnimation({
	left : 0,
	duration : 350,
	height : '100%',
	width : Ti.Platform.displayCaps.platformWidth,
});

var animateTop = Ti.UI.createAnimation({
	top : 0,
	height : 60,
	duration : 300,
	width : Ti.Platform.displayCaps.platformWidth,
});

var animatebottom = Ti.UI.createAnimation({
	top : -60,
	height : 60,
	duration : 300,
	width : Ti.Platform.displayCaps.platformWidth,
});

//**********************************************************************************************************************************************************

var Allview = Ti.UI.createView({
	backgroundColor : '#A00002',
	width : '100%',
	height : '100%'
});
win.add(Allview);

var TopBar = Ti.UI.createView({
	backgroundColor : '#B80000',
	width : '100%',
	height : '9.5%',
	top : 0
});
Allview.add(TopBar);

var TopViewline = Ti.UI.createView({
	backgroundColor : '#990000',
	width : '100%',
	height : '0.5%',
	top : '9.5%'
});
Allview.add(TopViewline);

var Menuimage = Ti.UI.createImageView({
	image : '/images/menu.png',
	width : '15%',
	height : '70%',
	left : '2%'
});
TopBar.add(Menuimage);
// Create an ImageView.
var Menu = Ti.UI.createView({
	width : '19%',
	height : '100%',
	left : '0%'
});

Menu.addEventListener('click', function() {
	if (!isToggled) {
		isToggled = true;
		win.animate(animateLeft);
	} else {
		isToggled = false;
		win.animate(animateRight);

	}
});

// Add to the parent view.
TopBar.add(Menu);

// Create a Label.
var Wuckers = Ti.UI.createLabel({
	text : 'No Wuckers',
	color : 'white',
	font : {
		fontSize : titlefont,
		fontFamily : 'ChalkDust'
	},
	textAlign : 'center'
});

// Add to the parent view.
TopBar.add(Wuckers);
BodyPart();

function BodyPart() {

	body = Ti.UI.createScrollView({
		backgroundColor : '#A00002',
		width : 'auto',
		height : 'auto',
		top : '10%',
		layout : 'vertical'
	});

	body.addEventListener('swipe', function(e) {
		if (e.direction == 'left') {
			win.animate(animateRight);
			isToggled = false;
		} else if (e.direction == 'right') {
			win.animate(animateLeft);
			isToggled = true;
		}
	});

	var tableHeader = Ti.UI.createView({
		width : 320,
		height : 60,
		top : -60
	});
	body.add(tableHeader);
	tableHeader.hide();

	var arrow = Ti.UI.createView({
		backgroundImage : "/images/arrowscroll.png",
		width : 33,
		height : 30,
		bottom : 10,
		left : 20
	});

	tableHeader.add(arrow);

	var statusLabel = Ti.UI.createLabel({
		text : "Pull to reload",
		left : 55,
		width : 200,
		bottom : 20,
		height : "auto",
		color : "white",
		textAlign : "center",
		font : {
			fontSize : 13,
			fontWeight : "bold"
		},
		shadowColor : "#999",
		shadowOffset : {
			x : 0,
			y : 1
		}
	});

	tableHeader.add(statusLabel);

	var actInd = Titanium.UI.createActivityIndicator({
		left : 20,
		bottom : 15,
		width : 30,
		height : 30
	});
	tableHeader.add(actInd);

	body.headerPullView = tableHeader;

	body.addEventListener('scroll', function(e) {
		var offset = e.y;

		if (offset <= -65.0 && !pulling) {
			tableHeader.show();
			var t = Ti.UI.create2DMatrix();
			t = t.rotate(-180);
			pulling = true;
			arrow.animate({
				transform : t,
				duration : 180
			});
			statusLabel.text = "Release to refresh...";

			setTimeout(function() {
				StatusChange();
				arrow.hide();
				actInd.show();
				statusLabel.text = "refresing...";
			}, 300);
		} else if (offset <= -120.0 && !pulling) {

			tableHeader.animate(animateTop);
			var t = Ti.UI.create2DMatrix();
			t = t.rotate(-180);
			pulling = true;
			arrow.animate({
				transform : t,
				duration : 180
			});
			statusLabel.text = "Release to refresh...";

			setTimeout(function() {
				StatusChange();
				arrow.hide();
				actInd.show();
				statusLabel.text = "refresing...";
			}, 300);
		} else if (pulling && offset > -65.0 && offset < 0) {
			arrow.show();
			actInd.hide();
			body.scrollTo(0, 0);
			//tableHeader.animate(animatebottom);
			pulling = false;
			var t = Ti.UI.create2DMatrix();
			arrow.animate({
				transform : t,
				duration : 180
			});
			statusLabel.text = "Pull down to refresh...";
		}
	});

	var pulling = false;
	var reloading = false;

	Allview.add(body);
}

function StatusChange() {
	var url = "http://dnspalette.com/api/agentstatusshow.php?category_id=" + Category_id[indx] + "&show_next=" + AgentStatusData.length;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			json = JSON.parse(this.responseText);
			AgentStatusDataNew = [];
			for (var i = 0; i < json.length; i++) {
				AgentStatusDataNew.push(json[i].status);
			}
			for (var i = 0; i < AgentStatusData.length; i++) {

				if (AgentStatusData[i] != AgentStatusDataNew[i]) {
					Ti.API.error('in if  ' + AgentStatusData[i] + '___' + AgentStatusDataNew[i]);
					if (AgentStatusData[i] == 0) {
						if (AgentStatusDataNew[i] == 1) {
							busy[i].backgroundColor = '#FFAE14';
							Busylabel[i].text = 'Busy';
						} else {
							busy[i].backgroundColor = '#FFAE14';
							Busylabel[i].text = 'Offline';
						}

					} else if (AgentStatusData[i] == 1) {

						if (AgentStatusDataNew[i] == 0) {
							Busylabel[i].text = '';
							busy[i].backgroundColor = 'transparent';
						} else {
							Busylabel[i].text = 'Offline';
							busy[i].backgroundColor = '#FFAE14';
						}
					} else {
						if (AgentStatusDataNew[i] == 0) {
							Busylabel[i].text = '';
							busy[i].backgroundColor = 'transparent';
						} else {
							Busylabel[i].text = 'Busy';
							busy[i].backgroundColor = '#FFAE14';
						}
					}

				} else {
					Ti.API.error('in else' + AgentStatusData[i] + '___' + AgentStatusDataNew[i]);
				}
				AgentStatusData[i] = AgentStatusDataNew[i];
			}

		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
		},
		timeout : 5000 // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
}

agents();
function agents() {
	var length = AgentImagesDatatmp.length;
	var div = parseInt(length / 2);
	var mdule = length % 2;
	Loop = parseInt((div + mdule) + (count * 6));

	var i = count * 6;
	for (i; i < Loop; i++) {
		var row = Ti.UI.createView({
			backgroundColor : "#A00002",
			height : hgt * 0.23,
			width : 'auto',
			//id : i
		});
		body.add(row);

		if (AgentImagesData.length <= 1) {
			var NoAgents = Ti.UI.createLabel({
				text : 'No Agents Found',
				color : '#622C07',
				font : {
					fontSize : Buttonfont,
					fontWeight : 'bold'
				},
				textAlign : 'center'
			});
			body.add(NoAgents);
		}

		var AgentImageView = Ti.UI.createView({
			width : '46.7%',
			height : '94%',
			top : '3%',
			left : '2%',
		});

		if (AgentidData[i * 2] == undefined || AgentImagesData[i * 2] == undefined) {
		} else {
			row.add(AgentImageView);
		}

		// Create an ImageView.
		var AgentImage = Ti.UI.createImageView({
			backgroundColor : '#A00002',
			image : 'http://dnspalette.com/api/thumb/' + AgentImagesData[2 * i],
			width : '100%',
			height : '100%',
			id : (i * 2)
		});
		AgentImage.addEventListener('click', function(e) {

			if (isToggled) {
				isToggled = false;
				win.animate(animateRight);
			}
			var aid = e.source.id;
			var agentid = AgentidData[aid];
			if (AgentidData[aid] == undefined || AgentImagesData[aid] == undefined) {
			} else {
				var Aids = Ti.App.Properties.setString('busy', agentid);
				var agentswindow = Ti.UI.createWindow({
					backgroundColor : '#A00002',
					url : 'AgentDetail.js',
					navBarHidden : true,
					fullscreen : true
				});
				agentswindow.open();
			}

		});

		AgentImageView.add(AgentImage);

		if (AgentStatusData[2 * i] == 1) {
			busy[2 * i] = Ti.UI.createView({
				backgroundColor : '#FFAE14',
				height : '30%',
				width : '100%',
				bottom : '0%'
			});
			AgentImageView.add(busy[2 * i]);

			// Create a Label.
			Busylabel[2 * i] = Ti.UI.createLabel({
				text : 'Busy',
				color : '#622C07',
				font : {
					fontWeight : 'bold',
				},
				textAlign : 'center'
			});

			// Add to the parent view.
			busy[2 * i].add(Busylabel[2 * i]);

		} else if (AgentStatusData[2 * i] == 2) {
			busy[2 * i] = Ti.UI.createView({
				backgroundColor : '#FFAE14',
				height : '30%',
				width : '100%',
				bottom : '0%'
			});
			AgentImageView.add(busy[2 * i]);

			Busylabel[2 * i] = Ti.UI.createLabel({
				text : 'Offline',
				color : '#622C07',
				font : {
					fontWeight : 'bold',
				},
				textAlign : 'center'
			});

			// Add to the parent view.
			busy[2 * i].add(Busylabel[2 * i]);

		} else if (AgentStatusData[2 * i] == 0) {
			busy[2 * i] = Ti.UI.createView({
				backgroundColor : 'transparent',
				height : '30%',
				width : '100%',
				bottom : '0%'
			});
			AgentImageView.add(busy[2 * i]);

			Busylabel[2 * i] = Ti.UI.createLabel({
				text : '',
				color : '#622C07',
				font : {
					fontWeight : 'bold',
				},
				textAlign : 'center'
			});

			// Add to the parent view.
			busy[2 * i].add(Busylabel[2 * i]);
		} else {

		}

		var AgentImageView2 = Ti.UI.createImageView({
			width : '46.7%',
			height : '94%',
			top : '3%',
			right : '2%',
		});

		if (AgentidData[i * 2 + 1] == undefined || AgentImagesData[i * 2 + 1] == undefined) {
		} else {
			row.add(AgentImageView2);
		}

		// Create an ImageView.
		var AgentImage2 = Ti.UI.createImageView({
			backgroundColor : '#A00002',
			image : 'http://dnspalette.com/api/thumb/' + AgentImagesData[2 * i + 1],
			width : '100%',
			height : '100%',
			id : (i * 2 + 1)
		});

		AgentImage2.addEventListener('click', function(e) {
			var aid = e.source.id;
			var agentid = AgentidData[aid];
			if (AgentidData[aid] == undefined || AgentImagesData[aid] == undefined) {
			} else {
				var Aids = Ti.App.Properties.setString('busy', agentid);
				var agentswindow = Ti.UI.createWindow({
					backgroundColor : '#A00002',
					url : 'AgentDetail.js',
					navBarHidden : true,
					fullscreen : true
				});
				agentswindow.open();
			}
		});

		AgentImageView2.add(AgentImage2);

		if (AgentStatusData[2 * i + 1] == 1) {
			busy[2 * i + 1] = Ti.UI.createView({
				backgroundColor : '#FFAE14',
				height : '30%',
				width : '100%',
				bottom : '0%'
			});
			AgentImageView2.add(busy[2 * i + 1]);

			Busylabel[2 * i + 1] = Ti.UI.createLabel({
				text : 'Busy',
				color : '#622C07',
				font : {
					fontWeight : 'bold',
				},
				textAlign : 'center'
			});

			// Add to the parent view.
			busy[2 * i + 1].add(Busylabel[2 * i + 1]);

		} else if (AgentStatusData[2 * i + 1] == 2) {
			busy[2 * i + 1] = Ti.UI.createView({
				backgroundColor : '#FFAE14',
				height : '30%',
				width : '100%',
				bottom : '0%'
			});
			AgentImageView2.add(busy[2 * i + 1]);

			Busylabel[2 * i + 1] = Ti.UI.createLabel({
				text : 'Offline',
				color : '#622C07',
				font : {
					fontWeight : 'bold',
				},
				textAlign : 'center'
			});

			// Add to the parent view.
			busy[2 * i + 1].add(Busylabel[2 * i + 1]);
		} else if (AgentStatusData[2 * i + 1] == 2) {
			busy[2 * i + 1] = Ti.UI.createButton({
				backgroundColor : 'transparent',
				height : '30%',
				width : '100%',
				bottom : '0%'
			});
			AgentImageView2.add(busy[2 * i + 1]);

			Busylabel[2 * i + 1] = Ti.UI.createLabel({
				text : '',
				color : '#622C07',
				font : {
					fontWeight : 'bold',
				},
				textAlign : 'center'
			});

			// Add to the parent view.
			busy[2 * i + 1].add(Busylabel[2 * i + 1]);
		} else {

		}

	}

	if (AgentImagesDatatmp.length >= 12) {

		var bottomrow = Ti.UI.createView({
			backgroundColor : "#A00002",
			height : hgt * 0.12,
			width : 'auto',
		});
		body.add(bottomrow);

		// Create a Button.
		var more = Ti.UI.createButton({
			backgroundImage : 'none',
			title : 'More...',
			color : '#622C07',
			backgroundColor : '#FFAE14',
			height : '60%',
			width : '35%',
			font : {
				fontSize : Buttonfont,
				fontWeight : 'bold'
			},
			zIndex : 20
		});
		// Listen for click events.

		more.addEventListener('click', function() {
			count++;
			indicator.show();
			bottomrow.remove(more);

			var url = "http://dnspalette.com/api/agentlistApi.php?category_id=%20" + Category_id[indx] + "&show_next=" + count * 12;
			var client = Ti.Network.createHTTPClient({
				// function called when the response data is available
				onload : function(e) {
					Ti.API.info("Received text: " + this.responseText);
					json = JSON.parse(this.responseText);

					var result = json[0].toString();
					if (result == 'No result for this') {
						indicator.hide();
						// Create a Label.
						var NoMore = Ti.UI.createLabel({
							text : 'No More Agents..',
							color : '#622C07',
							font : {
								fontSize : Buttonfont,
								fontWeight : 'bold'
							},
							textAlign : 'center'
						});
						bottomrow.add(NoMore);

					} else {
						AgentImagesDatatmp = [];
						AgentStatusDatatmp = [];
						AgentidDatatmp = [];
						for ( i = 0; i < json.length; i++) {
							AgentImagesData.push(json[i].photo_url);
							AgentStatusData.push(json[i].status);
							AgentidData.push(json[i].agent_id);
							AgentImagesDatatmp.push(json[i].photo_url);
							AgentStatusDatatmp.push(json[i].status);
							AgentidDatatmp.push(json[i].agent_id);
						}
						indicator.hide();
						body.remove(bottomrow);
						agents();
					}
				},
				// function called when an error occurs, including a timeout
				onerror : function(e) {
					Ti.API.debug(e.error);
					alert(e.error);
					indicator.hide();
					bottomrow.add(more);
				},
				timeout : 5000 // in milliseconds
			});
			// Prepare the connection.
			client.open("GET", url);
			// Send the request.
			client.send();

		});
		// Add to the parent view.
		bottomrow.add(more);

		var indicator = Ti.UI.createActivityIndicator({
			height : '50%',
			width : '60%',
			color : 'white',
			message : '  Loading...'
		});
		bottomrow.add(indicator);
	} else {
		if (count > 0) {
			var bottomrow = Ti.UI.createView({
				backgroundColor : "#A00002",
				height : hgt * 0.12,
				width : 'auto',
			});
			body.add(bottomrow);

			var NoMore = Ti.UI.createLabel({
				text : 'No More Agents..',
				color : '#622C07',
				font : {
					fontSize : Buttonfont,
					fontWeight : 'bold'
				},
				textAlign : 'center'
			});
			bottomrow.add(NoMore);
		}
	}
}

leftMenuWin.open();
win.open();

