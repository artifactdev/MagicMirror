const Application = require("spectron").Application;
const path = require("path");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

// Set config sample for use in test
process.env.MM_CONFIG_FILE = "tests/confs/helloworld.js";

var electronPath = path.join(__dirname, "../../../", "node_modules", ".bin", "electron");

if (process.platform === "win32") {
	electronPath += ".cmd";
}

var appPath = path.join(__dirname, "../../../js/electron.js");

var app = new Application({
	path: electronPath,
	args: [appPath]
});

global.before(function () {
	chai.should();
	chai.use(chaiAsPromised);
});

describe("Test helloworld module", function () {
	this.timeout(10000);

	beforeEach(function (done) {
		app.start().then(function() { done(); } );
	});

	afterEach(function (done) {
		app.stop().then(function() { done(); });
	});

	it("Test message helloworld module", function () {
		return app.client.waitUntilWindowLoaded()
			.getText(".helloworld").should.eventually.equal("Test HelloWorld Module");
	});
});
