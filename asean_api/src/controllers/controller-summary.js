const config = require('../configs/db-event');
const mysql = require('mysql');
const pool = mysql.createPool(config);
var axios = require('axios');
const https = require('https');
pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    getSummary(req,res){

        // let data = `Report Posko Royal Wedding 2022 Indonesia
        // Summary time: 08-12-2022 17:25 WIB
        
        // .: A. Availability
        // (POI: Critical / Quality & Transport / Capacity / Green Site)
        
        // - Delegation Hotel: 2 / 11 / 0 / 17
        // - Main Road: 7 / 19 / 0 / 33
        // - Main Venue: 8 / 1 / 0 / 3
        
        // .: B. Productivity (Current/Delta (Growth to Normal (%))) *Hourly
        // 1. Traffic : 307,00 Erl / 239,00 Erl (28,45%)
        // 2022-12-02 22:00:00 WITA
        
        // - 22,87 Erl / 15,64 Erl (46,27%)
        // - 24,19 Erl / 23,86 Erl (1,37%)
        // - 261,21 Erl / 201,52 Erl (29,62%)
        
        // 2. Payload : 3.089,39 GB / 2.843,63 GigaByte (8,64%)
        // 2022-12-02 22:00:00 WITA
        
        // - 403,74 GB / 317,98 GB (26,97%)
        // - 426,11 GB / 336,23 GB (26,73%)
        // - 2.259,54 GB / 2.189,41 GB (3,20%)
        
        // .: C. Subscriber
        
        // Posko Royal Wedding 2022`;
        // res.send({ 
        //     statusCode: 200, 
        //     statusMessage: 'Success',
        //     data: data 
        // });
        const agent = new https.Agent({  
            rejectUnauthorized: false
        });
        const showModalDownloadReport = async() => {await axios('http://localhost/reportMotgp2026/get-report-summary.php', {
            httpsAgent: agent,
            method: 'GET',
        }).then(result => {
            // console.log(result.data)
            if(res){
            let data = result.data.response; 
            res.send({ 
                    statusCode: 200, 
                    statusMessage: 'Success',
                    data: data 
                });
            }else{
                return result.status(200).send({
                    error: true,
                    response: "failed to load data!"
                });
            }
        })
        .catch(error => {
            
            console.log("Error: " + error.message);
        });
        }
        showModalDownloadReport()
        // https.get('https://localhost/royal-wedding/data-summary/get-report-summary.php', (resp) => {
        // let data = '';
        // resp.on('data', (chunk) => {
        //     data += chunk;
        // });
        // // The whole response has been received. Print out the result.
        // resp.on('end', () => {
        //     let summary = JSON.parse(data).data;
        //     // console.log(engineer)
        //     res.send({ 
        //         statusCode: 200, 
        //         statusMessage: 'Success',
        //         data: summary 
        //     });
        // });

        // }).on("error", (err) => {
        //     console.log("Error: " + err.message);
        // });
    },

}