var request = require("request"),
    assert = require('assert'),
    base_url = "http://localhost:5000"

describe("Test Google Book API", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });

 describe("GET /authors", function() {
     it("returns top 10 authors", function(done) {
       request.get(base_url + "/api/gladwell", function(error, response, body) {
           let data = JSON.parse(body);
           assert.equal(200, response.statusCode);
           assert.equal(10, data.length);
           done();        
       });
    });
  });

  describe("GET /titles", function() {
    it("returns top 10 book", function(done) {
      request.get(base_url + "/api/book", function(error, response, body) {
          let data = JSON.parse(body);
          assert.equal(200, response.statusCode);
          assert.equal(10, data.length);
          done();        
      });
   });
 });

 describe("GET /publication companies", function() {
    it("returns top 10 publications", function(done) {
      request.get(base_url + "/api/peason", function(error, response, body) {
          let data = JSON.parse(body);
          assert.equal(200, response.statusCode);
          assert.equal(10, data.length);
          done();        
      });
   });
 });
});
});