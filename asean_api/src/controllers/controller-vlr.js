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
                        FROM ch_balnus.4g_kpi_hourly_202638 t
                        WHERE resulttime >= (
                        SELECT DATE(MAX(resulttime)) 
                        FROM ch_balnus.4g_kpi_hourly_202638
                    )
                    GROUP BY resulttime;
                `
            , function (error, results) {
                if(error) throw error;  
                // let query = `SELECT B.WD,B.HR, A.NUMUSER NUMUSER, 100*(SUM(B.NUMUSER)/SUM(A.NUMUSER)-1) GROWTH,(SUM(B.NUMUSER) - SUM(A.NUMUSER))DELTA FROM
                // (SELECT WEEKDAY(datehour) WD, HOUR(datehour) HR, datehour,
                // SUM(numuser) NUMUSER FROM event_area3_subscribers_by_origin
                // WHERE DATE(datehour) >= '2022-11-26' AND DATE(datehour) <= '2022-12-02' AND origin ='Domestic'
                // GROUP BY WD, HR)A
                // JOIN (
                // SELECT WEEKDAY(datehour) WD, HOUR(datehour) HR, datehour,
                // SUM(numuser) NUMUSER FROM event_area3_subscribers_by_origin
                // WHERE DATE(datehour) = (SELECT DATE(MAX(datehour)) FROM event_area3_subscribers_by_origin)
                // AND HOUR(datehour) = (SELECT HOUR(MAX(datehour)) FROM event_area3_subscribers_by_origin)
                // AND origin ='Domestic' GROUP BY HR) B
                // ON A.WD = B.WD
                // AND A.HR = B.HR`;

                let query = `
                SELECT B.WD,B.HR, A.NUMUSER NUMUSER, 100*(SUM(B.NUMUSER)/SUM(A.NUMUSER)-1) GROWTH,(SUM(B.NUMUSER) - SUM(A.NUMUSER))DELTA FROM
                (SELECT WEEKDAY(datetime) WD, HOUR(datetime) HR, datetime datehour,
                SUM(vlr_real) NUMUSER FROM ndm.vlr_kab_hour 
                WHERE DATE(datetime) >= '2023-02-03' AND DATE(datetime) <= '2023-02-09' and KABUPATEN ='LOMBOK TENGAH'
                GROUP BY WD, HR) A
                JOIN (
                SELECT WEEKDAY(datetime) WD, HOUR(datetime) HR,datetime datehour,
                SUM(vlr_real) NUMUSER FROM ndm.vlr_kab_hour
                WHERE DATE(datetime) = (SELECT DATE(MAX(datetime)) FROM ndm.vlr_kab_hour)
                AND HOUR(datetime) = (SELECT HOUR(MAX(datetime)) FROM ndm.vlr_kab_hour)
                AND KABUPATEN ='LOMBOK TENGAH' GROUP BY HR) B
                on A.WD = B.WD 
                and A.HR = B.HR`;

                connection.query(
                  query
                , function (error, resultsGrowth) {
                    if(error) throw error;  
                    var growth = [{
                        "WD": (resultsGrowth[0].WD == null) ? 0 : resultsGrowth[0].WD,
                        "HR": (resultsGrowth[0].HR == null)? 0 : resultsGrowth[0].HR,
                        "NUMUSER": (resultsGrowth[0].NUMUSER == null)? 0 : resultsGrowth[0].NUMUSER,
                        "GROWTH": (resultsGrowth[0].GROWTH == null)? 0 : resultsGrowth[0].GROWTH /100,
                        "DELTA": (resultsGrowth[0].DELTA == null)? 0 : resultsGrowth[0].DELTA
                    }];
                    res.send({ 
                        statusCode: 200, 
                        statusMessage: 'Success',
                        data: results ,
                        growth : growth
                    });
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
}