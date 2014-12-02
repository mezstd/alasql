if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

if(typeof exports != 'object') {

describe('Test 151 - localStorage Engine', function() {

	it("1. Create database", function(done){
		alasql('SET AUTOCOMMIT OFF');
		alasql('DROP localStorage DATABASE IF EXISTS ls151');
		alasql('CREATE localStorage DATABASE IF NOT EXISTS ls151');
		alasql('ATTACH localStorage DATABASE ls151');
		alasql('CREATE TABLE IF NOT EXISTS ls151.one (a int, b string)');
		alasql('SELECT * INTO ls151.one FROM ?', [[{"a":1,"b":"Moscow"},{"a":2,"b":"Kyiv"},{"a":3,"b":"Minsk"}]]);
		var res = alasql('SELECT * FROM ls151.one');
		assert.deepEqual(res, [{"a":1,"b":"Moscow"},{"a":2,"b":"Kyiv"},{"a":3,"b":"Minsk"}]);
		done();
	});


	it("5.Insert values into localStorage database", function(done) {
		alasql('USE ls151');
		alasql('BEGIN');
		var res = alasql('SELECT * FROM ls151.one');
		assert(res.length == 3);

		alasql('SELECT * INTO ls151.one FROM ?', [[{"a":4,"b":"London"},{"a":5,"b":"Madrid"},{"a":6,"b":"Tirana"}]]);
		var res = alasql('SELECT * FROM ls151.one');
		assert(res.length == 6);

		alasql('ROLLBACK');
		var res = alasql('SELECT * FROM ls151.one');
		console.log(res);
		assert(res.length == 3);

		done();
	});

	it("99. Detach database", function(done){
		alasql('DROP localStorage DATABASE ls151');
		alasql('DROP DATABASE test151');
		done();
	});
});

}
