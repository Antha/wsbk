const config = require('../configs/db-event');
const mysql = require('mysql');
const pool = mysql.createPool(config);

const http = require('http');
pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    getEngineer(req,res){
        http.get('http://10.54.36.55:9007/dashboard-g20/api/paragames/engineer', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            let engineer = JSON.parse(data).data;
            // console.log(engineer)
            res.send({ 
                statusCode: 200, 
                statusMessage: 'Success',
                data: engineer 
            });
        });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    },

}