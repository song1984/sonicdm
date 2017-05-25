"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var xhr = createXHR();

function createXHR() {
	if (typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != "undefined") {
		if (typeof arguments.callee.activeXString != "string") {
			var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
			for (var i = 0, len = versions.length; i < len; i++) {
				try {

					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				} catch (ex) {}
			}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	} else {
		throw new Error("No XHR object available");
	}
}

function httpRequest(type, url, data, async, callback, context) {
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			try {
				if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					callback.call(context, xhr.responseText);
				} else {
					console.log('Request was unsuccessful status code: ' + xhr.status);
				}
			} catch (ex) {
				console.log("XHR ERROR");
			}
		}
	};

	xhr.open(type, url, async);
	xhr.send(data);
}

exports.default = httpRequest;