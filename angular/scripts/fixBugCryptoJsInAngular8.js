/**
 * This fix concerns crypto-js@4.0.0 only
 */
const fs = require('fs');
const thirdPartyVersionCheck = './node_modules/crypto-js/package.json';
const pathToTheLibToFix = './node_modules/crypto-js/core.js';
let packageJson;

fs.readFile(thirdPartyVersionCheck, 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	packageJson = JSON.parse(data);
	if(packageJson.version !=='4.0.0'){
		console.error(`Cant apply fix on version ${packageJson.version}`);
		return;
	}
	applyFix();
});

const isFileAlreadyPatched = function(dataFile) {
	if(dataFile.indexOf('// Native crypto from window (Browser)') >= 0){
		return false;
	} else {
		return true;
	}
}

const applyFix = function() {
	fs.readFile(pathToTheLibToFix, 'utf8', function (err, data) {
		if (err) {
			return console.log(`Error occurred while reading file for patch: ${err}`);
		}
		if(isFileAlreadyPatched(data)){
			console.log(`======> file ${pathToTheLibToFix} already patched <=====`);
			return;
		}
		// transforms the text file into an array in order to insert some lines easily
		let stringToArray = data.split("\n");

		// on item 24 , remove 21 lines, and add empty string
		stringToArray.splice(24, 21, "");

		// transforms back the array into text
		const arrayBackToString = stringToArray.join("\n");

		fs.writeFile(pathToTheLibToFix, arrayBackToString, 'utf8', function (err) {
			if (err){
				return console.log(`Error occurred while applying proxy patch to lib: ${err}`);
			} else {
				console.log(`======> file ${pathToTheLibToFix} successfully patched for crypto-js@${packageJson.version} <=====`);
			}
		});
	});
}