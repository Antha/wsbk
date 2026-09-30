const config = require('../configs/db-event-42');
const config_13 = require('../configs/db-event-13');
const mysql = require('mysql');
const pool = mysql.createPool(config);
const pool_13 = mysql.createPool(config_13);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil data semua karyawan
    getVLRChart(req,res){
        // console.log(req.header('user-agent'))
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                    SELECT 
                        DATE_FORMAT(resulttime,'%Y-%m-%d %H %i %s') resulttime,
                        SUM(t.maximum_user_number) AS vlr_domestic
                        FROM ch_balnus.4g_kpi_hourly_202639 t
                        WHERE resulttime >= (
                        SELECT DATE(MIN(resulttime)) 
                        FROM ch_balnus.4g_kpi_hourly_202639
                    )
                    GROUP BY resulttime;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    statusCode: 200, 
                    statusMessage: 'Success',
                    data: results 
                })
            });
            connection.release();
        })
    },
    getRoamerChart(req,res){
        // console.log(req.header('user-agent'))
        pool_13.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                    SELECT 
                    DATE_FORMAT(datehour,'%Y-%m-%d %H %i %s') datehour, COUNT(msisdn) vlr_roamer FROM \`roamer_all_msisdn_tes\` 
                    GROUP BY datehour
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    statusCode: 200, 
                    statusMessage: 'Success',
                    data: results 
                });
            });
            connection.release();
        })
    },
    getTopOperator(req,res){
        // console.log(req.header('user-agent'))
        pool_13.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                    SELECT operator , COUNT(msisdn) _count FROM \`roamer_all_msisdn\`  GROUP BY operator ORDER BY _count DESC LIMIT 5
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    statusCode: 200, 
                    statusMessage: 'Success',
                    data: results
                });
            });
            connection.release();
        })
    },
    getTopApps(req,res){
        // console.log(req.header('user-agent'))
        pool_13.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                    SELECT 
                    apps, ROUND(SUM(trafficmb) / 1024,2) trafficmb, SUM(usercount) usercount FROM \`roamer_all_per_app\` 
                    WHERE datehour = (SELECT MAX(datehour) FROM \`roamer_all_per_app\` )
                    GROUP BY apps
                    ORDER BY trafficmb DESC LIMIT 5
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    statusCode: 200, 
                    statusMessage: 'Success',
                    data: results
                });
            });
            connection.release();
        })
    },
}