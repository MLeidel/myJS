/*
	myJS-1.2.js
	09/08/2019 54 functions
	Michael D Leidel
	Version: many date fixes. Added Dateobj.
	Updated /config/myJSref.html
	See ES6/myDates.html
	addClass, delClass
	doq uses arrow func
	fixed JS.show
*/
'use strict';

const JS = {

  doq : qs => document.querySelector(qs),

	htm : function(qs,val) {
		if (val === undefined) {
			return JS.doq(qs).innerHTML;
		} else {
			JS.doq(qs).innerHTML = val;
		}
	},

	css : function(qs, cssx) {
		let m = JS.doq(qs);
		if (cssx === undefined) {
			return m.style;
		} else {
			m.style = cssx;
		}
	},

  addClass : function(qs, cname) {
    let m = JS.doq(qs);
    m.classList.add(cname);
  },

  delClass : function(qs, cname) {
    let m = JS.doq(qs);
    m.classList.remove(cname);
  },

	gss : function(qs, cssx) {
		let m = JS.doq(qs);
		let prop = window.getComputedStyle(m, null).getPropertyValue(cssx);
		return prop;
	},

	val : function(qs,val) {
		if (val === undefined) {
			return JS.doq(qs).value;
		} else {
			JS.doq(qs).value = val;
		}
	},

	tod : function(qs, mode) {
		let m = JS.doq(qs);
		if (m.style.display === 'none') {
				m.style.display = mode;
		} else {
				m.style.display = 'none';
		}
	},

	show : function(qs) {
			let obj = JS.doq(qs);
			obj.style.visibility = "visible";
	},

	hide : function(qs) {
			let obj = JS.doq(qs);
			obj.style.visibility = "hidden";
	},

	attr : function(qs, aname, avalue) {
		if (avalue !== undefined) {
			JS.doq(qs).setAttribute(aname, avalue);
		} else {
			return JS.doq(qs).getAttribute(aname);
		}
	},

	// START ASYNC FUNCTIONS

	webget : function(url, n) {
		fetch(url, {cache: "no-cache"}).then(function(response) {
			return response.text().then(function(text) {
				webresponse(n, text);	// user function to handle response
			});
		});
	},

	webgetjson : function(url, n) {
		fetch(url, {cache: "no-cache"})
		.then(function(response) {
			return response.json();
		})
		.then(function(jobj) {
			webresponse(n, jobj);	// user function to handle json object
		})
			.catch(function(error) {
				webresponse(n, "error");	// return "error" instead of json
			});
	},

	webpost : function(url, n, qs) {
		fetch(url, {
			method: 'post',
			headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: qs
			})
			.then(function(response) {
				return response.text();
			})
			.then(function (text) {
				webresponse(n, text);	// user function to handle response
			})
			.catch(function (error) {
				console.log('Request failed', error);
			});
	},

	websend : function(url, qs) {
		fetch(url, {
			method: 'post',
			headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: qs
			})
			.catch(function (error) {
				console.log('Request failed', error);
			});
	},

	// START DATE FUNCTIONS

	twoDigitDate : function(n) {
		if (n < 10)
			return "0" + n;
		else
			return n;
	},

	todayDay : function(objdate) {
		// Day of Week Index 0..6
		let d;
		if (objdate !== undefined) {
		  d = objdate;
		} else {
		  d = new Date();
		}
		return d.getDay();
	},

	todayMon : function(objdate) {
    let d;
		if (objdate !== undefined) {
		  d = objdate;
		} else {
		  d = new Date();
		}
		return d.getMonth() + 1;
	},

	todayYear : function(objdate) {
	  let d;
		if (objdate !== undefined) {
		  d = objdate;
		} else {
		  d = new Date();
		}
		return d.getFullYear();
	},

	getMDY : function(objdate) {
	  let d;
		if (objdate !== undefined) {
		  d = objdate;
		} else {
		  d = new Date();
		}
		let curr_date = JS.twoDigitDate(d.getDate());
		let curr_month = JS.twoDigitDate(d.getMonth() + 1);	//months are zero based
		let curr_year = d.getFullYear();
		return curr_month + "/" + curr_date + "/" + curr_year;
	},

	getYMD : function(objdate) {
	  let d;
		if (objdate !== undefined) {
		  d = objdate;
		} else {
		  d = new Date();
		}
		let curr_date = JS.twoDigitDate(d.getDate());
		let curr_month = JS.twoDigitDate(d.getMonth() + 1);	//months are zero based
		let curr_year = d.getFullYear();
		return curr_year + "-" + curr_month + "-" + curr_date;
	},

	getHM : function() {
	  let d = new Date();
		let curr_Hour = JS.twoDigitDate(d.getHours());
		let curr_Minute = JS.twoDigitDate(d.getMinutes());
		return curr_Hour + ":" + curr_Minute;
	},

	getShortDay : function(n) {
		// Sunday = 0 ...
		let d = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
		return d[n];
	},

	getLongDay : function(n) {
		let d = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
		return d[n];
	},

	getShortMon : function(n) {
		// January = 0 ...
		let m = new Array('0','Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec');
		return m[n];
	},

	getLongMon : function(n) {
		// January = 0 ...
		let m = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
		return m[n];
	},

	addDays : function(n) {
		let d = new Date();
		d.setDate(d.getDate() + n);
		return d;
	},

	//	OTHER FUNCTIONS

	sleep : function(milliSeconds) {
		let startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds) {}
	},

	getCB : function() {
  	navigator.clipboard.readText()
  		.then(text => {
  			getCBtext(text);
  		})
  		.catch(err => {
  			alert("could not paste from clipboard");
  		});
	},

	setCB : function(txt) {
	navigator.clipboard.writeText(txt)
		.catch(err => {
	    alert("could not copy to clipboard");
		});
	},

	scrollBottom : function() {
		window.scrollTo(0,document.body.scrollHeight);
	},

	rand : function(low, hi) {
		// number between 0 and 9
		return Math.floor((Math.random() * hi) + low);
	},

	getOptionText : function(sid) {
		let obj = document.getElementById(sid);
		return obj.options[obj.selectedIndex].text;
	},

	getOptionIndex : function(sid) {
			let obj = document.getElementById(sid);
			return obj.selectedIndex;
	},

	getQvar : function(v) {
		let query = window.location.search.substring(1);
		let vars = query.split("&");
		for (let i=0;i<vars.length;i++) {
			 let pair = vars[i].split("=");
			 if(pair[0] == v){return pair[1];}
		}
		return(false);
	},

	notify : function(msg) {
    if (!("Notification" in window)) {
      alert(msg);
      return;
    }
    // check if notification permissions have been granted
    else if (Notification.permission === "granted") {
      let notification = new Notification(msg);
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, create a notification
        if (permission === "granted") {
          let notification = new Notification(msg);
        } else {
          alert(msg);
        }
      });
    }
  },

	titleCase : function(str) {
		if (str===undefined)
				return false;
		else
				str = str.toString();
	 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	},

	numfix : function(n,p) {
		if (p === undefined) {
		  return parseFloat(n.toFixed(2));
		} else {
		  return parseFloat(n.toFixed(p));
		}
	},

  dlgOpen : function(qs) {
    return JS.doq(qs).show();
  },
  dlgClose : function(qs) {
    return JS.doq(qs).close();
  },

	/*
	COOKIE FUNCTIONS:
			setCookie( cname, cvalue [, exdays] )
			getCookie( cname )
			deleteCookie( name)

	If exdays (number of days) is not used for setCookie,
	then cookie is deleted when browser is closed.
	*/

	setCookie : function(cname, cvalue, exdays) {
			let d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			let expires = "expires=" + d.toUTCString();
			if (exdays)
				document.cookie = cname + "=" + cvalue + "; " + expires;
			else
				document.cookie = cname + "=" + cvalue;
	},

	getCookie : function(cname) {
		let name = cname + "=";
		let ca = document.cookie.split(';');
		for(let i=0; i<ca.length; i++) {
						let c = ca[i];
						while (c.charAt(0)==' ') c = c.substring(1);
						if (c.indexOf(name) != -1)
							return c.substring(name.length, c.length);
		}
		return "";
	},

	deleteCookie : function(name) {
		JS.setCookie(name,"",-1);
	}

};
