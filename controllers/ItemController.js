let db = require('../models/dbconnection');

let item = {
    getAll(request,response) {
        //grab the site section from the req variable (/strains/)
        //console.log(req) to see all the goodies
        let pathname = request._parsedUrl.pathname.split('/');
        //split makes an array, so pick the second row
        let section = pathname[1];

        //query the DB using prepared statement
        var results = db.query('SELECT * from ??', [section], function (error, results, fields) {
            //if error, print blank results
            if (error) {
                // console.log(error);
                var apiResult = {};

                apiResult.meta = {
                    table: section,
                    type: "collection",
                    total: 0
                }
                //create an empty data table
                apiResult.data = [];

                //send the results (apiResult) as JSON to Express (res)
                //Express uses res.json() to send JSON to client
                //you will see res.send() used for HTML
                response.json(apiResult);

            }

            //make results
            var resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            var apiResult = {};


            // create a meta table to help apps
            //do we have results? what section? etc
            apiResult.meta = {
                table: section,
                type: "collection",
                total: 1,
                total_entries: 0
            }

            //add our JSON results to the data table
            apiResult.data = resultJson;

            //send JSON to Express
            response.json(apiResult);
        });
    },
};
module.exports = item;