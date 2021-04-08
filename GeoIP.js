//=============================================================================\\
//                                GeoIP lookup                                  \\
//                             made by nullcheats                                \\
//================================================================================\\

/*
These are the 2 packages we use for this program
mySQL to be able to connect to our mySQL database and run querys
Chalk to be able to change console log colour
to install these run 'npm i chalk' & 'npm i mysql'
*/
var mysql = require('mysql');
const chalk = require('chalk');
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

/*
These are the variables we will be needing to conenct to the database
Host is either the "IP" or hostname for database
Username is the mySQL username setup
Password is the mySQL password for the username provided
Database is the main "Database" name 
Table is the Table name within the "Database"
*/
const Host = "";
const Username = "";
const Password = "";
const Database = "";
const Table = "";

/*
This is our IP2Number function that will convert the IPV4 address as seen below
Below you can also see how this "calculated" for each octec
This function will simply return the "int" for the IP address as shown below
Octecs = IP parts ( split via '.' )
IP | 192.168.1.1 => OCT 1 (192) | OCT 2 (168) | OCT 3 (1) | OCT 4 (1)
16777216 * OCT1 + 65536 * OCT2 + 256 * OCT3 +  OCT4 = IP number
*/

const IP2NUM = (IPV4) => {
	let SplitIP = IPV4.split('.');
	let octecs1 = parseInt(SplitIP[0]);
	let octecs2 = parseInt(SplitIP[1]);
	let octecs3 = parseInt(SplitIP[2]);
	let octecs4 = parseInt(SplitIP[3]);
	let sum = (16777216 * octecs1) + (65536 * octecs2) + (256 * octecs3) + octecs4;
	return sum;
}

// This is a regex expression that will ensure the input string is a valid IPV4 address
// Typical format is in the format of X.X.X.X (each X) is usually known as an "octec"
// Each octec must be a value between 0-255 and as you can see each octec is seperated by a '.'
// If IPV4 was matched via regex it will return 'true' else it will return 'false'
const ValidateIPV4 = (IPV4) => {
	const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	if (regex.test(IPV4)) {
		return true;
	} else {
		return false;
	}
}

/*
This is our main "Cross-check" function as you can see below we use "mySQL here"
This simply runs a SQL query that will check the converted IP address against a massive DB
If the SQL has a matched row it should return a country code and country name
Example | CA -> Canada (this is not 100% accurate)
*/
const CheckIP = (IPV4int, IPV4address) => {
	var con = mysql.createConnection({
		host: Host,
		user: Username,
		password: Password,
		database: Database
	});

	con.connect(function(err) {
		if (err) {
			console.log(chalk.red("[-] Error connecting to mySQL database please check credentials !"));
		} else {
			console.log(chalk.green("[+] Connected to Database " + Database + " | " + Table));
			console.log(chalk.yellow("[~] Attempting to lookup IP address !"));
			con.query("SELECT * FROM `" + Table + "` WHERE '" + IPV4int + "' LIKE `ip_from` <= '" + IPV4int + "' AND `ip_to` >= '" + IPV4int + "' LIMIT 1", function(err, result) {
				if (err) {
					console.log(chalk.red("[-] Error -> " + err));
				}
				results = (JSON.stringify(result[0]))
				var obj = JSON.parse(results);
				console.log(chalk.green("[+] Located -> " + IPV4address + " | " + obj.country_code + " | " + obj.country_name));

				return new Promise((resolve, reject) => {
					rl.question(chalk.blue('\nPlease press 1 to return to the menu ! '), (answer) => {
						if (parseInt(answer) == 1) {
							resolve()
							console.clear();
							Options();
						} else {
							resolve()
							console.log(chalk.red("[-] Invalid menu selection :( | waiting 5 seconds"));
							setInterval((function() {
								console.clear();
								Options();
							}), 5000);
						}
					})
				})
			});
		}
	});
}

/*
This is the function that invokes the other functions and passes params for us
As you can see we simply pass along the normal "IPV4" address as a param 
Once it has the IPV4 it will then attempt to see if the IP address is valid or not
Then it will convert the IP address into a int / decimal if its valid 
Once its been converted it will then cross-check our mySQL database to check for a match
*/
const CheckIPV4 = (IPV4address) => {
	console.log(chalk.yellow("[~] Attempting to validate IPV4 via regex !"));
	if (ValidateIPV4(IPV4address)) {
		console.log(chalk.green("[+] " + IPV4address + " | is a valid IP address !"));
		console.log(chalk.yellow("[~] Attempting to convert | " + IPV4address + " to int / decimal !"));
		var IPV4int = IP2NUM(IPV4address);
		if (IPV4int) {
			console.log(chalk.green("[+] Converted IPV4 to decimal / int -> [" + IPV4int + "]"));
			CheckIP(IPV4int, IPV4address);
		} else {
			console.log(chalk.red("[-] Error converting IPV4 address to decimal / int :("));
		}
	} else {
		console.log(chalk.red("[-] Invalid IPV4 address was entered :("));
	}
}

/*
This is out 'menu' where we simply list our options for users
Currently we only have 1 function as you can see "Check IPV4"
Once user has selected this they will be asked for the IPV4 address to check
*/
const Options = () => {
	console.log(chalk.blue("\r\n   ______           ________ \r\n  / ____/__  ____  /  _/ __ \\\r\n / / __/ _ \\/ __ \\ / // /_/ /\r\n/ /_/ /  __/ /_/ // // ____/ \r\n\\____/\\___/\\____/___/_/"));
	console.log(chalk.blueBright(' ----> Nullcheats' + chalk.red(' <3 \n \n')));
	console.log(chalk.blue('1 | Lookup IPV4 \n'));
	return new Promise((resolve, reject) => {
		rl.question(chalk.blue('Please select an option from above : '), (answer) => {
			if (parseInt(answer) == 1) {
				return new Promise((resolve, reject) => {
					rl.question(chalk.blue('What IPV4 address would you like to check ? '), (IPV4) => {
						CheckIPV4(IPV4);
						resolve()
					})
				})
			} else {
				console.log(chalk.red("[-] Invalid menu selection :("));
			}
			resolve()
		})
	})
}


Options();
