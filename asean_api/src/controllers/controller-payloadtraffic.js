const config = require('../configs/db-event-43');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    getPayloadTraffic(req,res){
        pool.getConnection(function(err, connection, getGrowthHourly) {
            if (err) throw err;
            connection.query(
                `
                SELECT
                    DATE_FORMAT(t.resulttime, '%Y-%m-%d %H:00:00') AS STARTTIME,
                    SUM(t.traffic_erlang) AS TRAFFIC,
                    SUM(t.downlink_traffic_volume_ok) AS PAYLOAD
                FROM ch_balnus.\`4g_kpi_hourly_202639\` t
                where 1  AND siteid IN (SELECT site_id FROM \`event_motogp_2026\`.sitelist)
                GROUP BY STARTTIME
                ORDER BY STARTTIME ASC;
                `
            , function (error, results) {
                // console.log(results)
                if(error) throw error;  
                    let query = ` 		   (
                        SELECT A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
                        SUM(B.PAYLOAD) PAY_NOW, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
                        100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM
                        (
                            SELECT WEEKDAY(resulttime) WD, HOUR(resulttime) JAM,resulttime STARTTIME,
                            SUM(traffic_erlang) TRAFFIC, SUM(downlink_traffic_volume_ok) PAYLOAD FROM ch_balnus.\`4g_kpi_hourly_202634\`
                            WHERE DATE(resulttime) >= '2026-08-24' AND DATE(resulttime) <= '2026-08-30'
                            AND siteid IN (SELECT site_id FROM \`event_motogp_2026\`.sitelist)
                            GROUP BY WD, JAM
                        ) A
                        JOIN (
                            SELECT WEEKDAY(resulttime) WD, HOUR(resulttime) JAM, resulttime STARTTIME, SUM(traffic_erlang) TRAFFIC, SUM(downlink_traffic_volume_ok) PAYLOAD FROM ch_balnus.\`4g_kpi_hourly_202639\`
                            WHERE DATE(resulttime) = (SELECT DATE(MAX(resulttime)) FROM ch_balnus.\`4g_kpi_hourly_202639\`)
                            AND siteid IN (SELECT site_id FROM \`event_motogp_2026\`.sitelist)			    
                            GROUP BY JAM
                       ) B
                        ON A.WD = B.WD
                        AND A.JAM = B.JAM
                        )
                        #GROUP BY A.CATEGORY
                        UNION
                        -- daily
                        (
                        SELECT  A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
                        SUM(B.PAYLOAD) PAY_NOW, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
                        100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM
                        (
                            SELECT WEEKDAY(resulttime) WD,resulttime STARTTIME, 
                            SUM(traffic_erlang) TRAFFIC, SUM(downlink_traffic_volume_ok) PAYLOAD FROM  ch_balnus.\`4g_kpi_hourly_202634\`
                            WHERE DATE(resulttime) >= '2026-08-24' AND DATE(resulttime) <= '2026-08-30' 
                            AND siteid IN (SELECT site_id FROM \`event_motogp_2026\`.sitelist)
                            GROUP BY WD
                        ) A
                        JOIN (
                            SELECT WEEKDAY(resulttime) WD,resulttime STARTTIME, SUM(traffic_erlang) TRAFFIC, SUM(downlink_traffic_volume_ok) PAYLOAD FROM ch_balnus.\`4g_kpi_hourly_202639\`
                            WHERE DATE(resulttime) = (SELECT DATE(DATE_SUB(MAX(resulttime), INTERVAL 1 DAY)) FROM ch_balnus.\`4g_kpi_hourly_202639\`)
                            AND siteid IN (SELECT site_id FROM \`event_motogp_2026\`.sitelist)
                        ) B
                        ON A.WD = B.WD
                    )`;

                    connection.query(
                    query
                , function (error, resultsBaseline) {
                    // console.log(results)
                    if(error) throw error;  
                    var dataHourly = [{
                        "TRAFFIC": resultsBaseline[0].TRAF_NOW,
                        "PAYLOAD": resultsBaseline[0].PAY_NOW,
                        "GROWTH_TRAFFIC": resultsBaseline[0].GROWTH_TRAFFIC,
                        "GROWTH_PAYLOAD": resultsBaseline[0].GROWTH_PAYLOAD
                    }];

                    var dataDaily = [{
                        "SUM(B.TRAFFIC)": resultsBaseline[1].TRAF_NOW,
                        "SUM(B.PAYLOAD)": resultsBaseline[1].PAY_NOW,
                        "GROWTH_TRAFFIC": resultsBaseline[1].GROWTH_TRAFFIC,
                        "GROWTH_PAYLOAD": resultsBaseline[1].GROWTH_PAYLOAD
                    }];

                    var hourlyResult = results.slice(0,results.length);
                    var dailyResult = results.slice(results.length - 5);
                    
                    dailyResult= dailyResult.map(({ STARTTIME,TRAFFIC,PAYLOAD}) => ({ RESULTTIME: STARTTIME,TRAFFIC: TRAFFIC,PAYLOAD: PAYLOAD}));
                    var all =[hourlyResult, dataHourly, dailyResult, dataDaily];
                    res.send({ 
                        statusCode: 200, 
                        statusMessage: 'Success',
                        resultData: all 
                    });
                });
               
            });
            connection.release();
        })
    },

    getTrafficCategory(req,res){
        // console.log(req.header('user-agent'))
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                // `
                // SELECT date(starttime) mydate, SUM(TRAFFIC) TRAFFIC,
                // (CASE WHEN UCASE(CATEGORY) = 'SUPPORTING' THEN 'SUPPORTING VENUE' ELSE UCASE(CATEGORY) END )CATEGORY
                // FROM event_area3_ran_productivity
				// WHERE DATE(STARTTIME) <= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 1 DAY) FROM event_area3_ran_productivity)
                // GROUP BY date(STARTTIME),CATEGORY
                // `
                // `
                // SELECT A.mydate, main_venue,men_house ,supporting_venue
                // ,woman_house
                // from 
                // (SELECT date(starttime) mydate, SUM(TRAFFIC) main_venue
               	// FROM event_area3_ran_productivity
				// WHERE DATE(STARTTIME) >= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 7 DAY) FROM event_area3_ran_productivity)
				// AND DATE(STARTTIME) <= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 1 DAY) FROM event_area3_ran_productivity)
				// and CATEGORY = 'MAIN VENUE'
                // GROUP BY date(STARTTIME),CATEGORY)A
                // JOIN  
                //  (SELECT date(starttime) mydate, SUM(TRAFFIC) men_house
               	// FROM event_area3_ran_productivity
				// WHERE DATE(STARTTIME) >= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 7 DAY) FROM event_area3_ran_productivity)
				// AND DATE(STARTTIME) <= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 1 DAY) FROM event_area3_ran_productivity)
				// and CATEGORY = 'RUMAH MEMPELAI PRIA'
                // GROUP BY date(STARTTIME),CATEGORY)B
                // ON B.mydate = A.mydate
                // JOIN  
                //  (SELECT date(starttime) mydate, SUM(TRAFFIC) supporting_venue
               	// FROM event_area3_ran_productivity
				// WHERE DATE(STARTTIME) >= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 7 DAY) FROM event_area3_ran_productivity)
				// AND DATE(STARTTIME) <= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 1 DAY) FROM event_area3_ran_productivity)
				// and CATEGORY = 'SUPPORTING'
                // GROUP BY date(STARTTIME),CATEGORY)C
                // ON C.mydate = A.mydate
                // JOIN  
                //  (SELECT date(starttime) mydate, SUM(TRAFFIC) woman_house
               	// FROM event_area3_ran_productivity
				// WHERE DATE(STARTTIME) >= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 7 DAY) FROM event_area3_ran_productivity)
				// AND DATE(STARTTIME) <= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 1 DAY) FROM event_area3_ran_productivity)
				// and CATEGORY = 'RUMAH MEMPELAI WANITA'
                // GROUP BY date(STARTTIME),CATEGORY)D
                // ON D.mydate = A.mydate
                // `
                `
                SELECT 
                a.STARTTIME, 
                DATE_FORMAT(a.STARTTIME, '%Y-%m-%d %H') AS mydate, 
                (
                    SELECT 
                    SUM(
                        COALESCE(TRAFFIC, 0)
                    ) 
                    FROM 
                    event_area3_ran_productivity AS c 
                    JOIN royalwed_sitelist_kpi AS b ON b.SITE_ID = c.SITEID 
                    WHERE 
                    b.CATEGORY = 'RUMAH PRIA' 
                    AND c.STARTTIME = a.STARTTIME
                ) men_house, 
                (
                    SELECT 
                    SUM(
                        COALESCE(TRAFFIC, 0)
                    ) 
                    FROM 
                    event_area3_ran_productivity AS c 
                    JOIN royalwed_sitelist_kpi AS b ON b.SITE_ID = c.SITEID 
                    WHERE 
                    b.CATEGORY = 'RUMAH WANITA' 
                    AND c.STARTTIME = a.STARTTIME
                ) woman_house, 
                (
                    SELECT 
                    SUM(
                        COALESCE(TRAFFIC, 0)
                    ) 
                    FROM 
                    event_area3_ran_productivity AS c 
                    JOIN royalwed_sitelist_kpi AS b ON b.SITE_ID = c.SITEID 
                    WHERE 
                    b.CATEGORY = 'MAIN VENUE' 
                    AND c.STARTTIME = a.STARTTIME
                ) main_venue, 
                (
                    SELECT 
                    SUM(
                        COALESCE(TRAFFIC, 0)
                    ) 
                    FROM 
                    event_area3_ran_productivity AS c 
                    JOIN royalwed_sitelist_kpi AS b ON b.SITE_ID = c.SITEID 
                    WHERE 
                    b.CATEGORY = 'SUPPORTING' 
                    AND c.STARTTIME = a.STARTTIME
                ) supporting_venue 
                FROM 
                event_area3_ran_productivity AS a 
                WHERE DATE(STARTTIME) >= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 7 DAY) FROM event_area3_ran_productivity)
                AND DATE(STARTTIME) <= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 0 DAY) FROM event_area3_ran_productivity)
                                
                GROUP BY 
                a.STARTTIME 
                ORDER BY 
                a.STARTTIME ASC

                `
            , function (error, results) {
                // console.log(results)
                if(error) throw error; 
                res.send({ 
                    statusCode: 200, 
                    statusMessage: 'Success',
                    resultData: results 
                });
            });
            connection.release();
        })
    },

    getPayloadCategory(req,res){
        // console.log(req.header('user-agent'))
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT 
                a.STARTTIME, 
                DATE_FORMAT(a.STARTTIME, '%Y-%m-%d %H') AS mydate, 
                (
                    SELECT 
                    SUM(
                        COALESCE(PAYLOAD, 0)
                    ) 
                    FROM 
                    event_area3_ran_productivity AS c 
                    JOIN royalwed_sitelist_kpi AS b ON b.SITE_ID = c.SITEID 
                    WHERE 
                    b.CATEGORY = 'RUMAH PRIA' 
                    AND c.STARTTIME = a.STARTTIME
                ) men_house, 
                (
                    SELECT 
                    SUM(
                        COALESCE(PAYLOAD, 0)
                    ) 
                    FROM 
                    event_area3_ran_productivity AS c 
                    JOIN royalwed_sitelist_kpi AS b ON b.SITE_ID = c.SITEID 
                    WHERE 
                    b.CATEGORY = 'RUMAH WANITA' 
                    AND c.STARTTIME = a.STARTTIME
                ) woman_house, 
                (
                    SELECT 
                    SUM(
                        COALESCE(PAYLOAD, 0)
                    ) 
                    FROM 
                    event_area3_ran_productivity AS c 
                    JOIN royalwed_sitelist_kpi AS b ON b.SITE_ID = c.SITEID 
                    WHERE 
                    b.CATEGORY = 'MAIN VENUE' 
                    AND c.STARTTIME = a.STARTTIME
                ) main_venue, 
                (
                    SELECT 
                    SUM(
                        COALESCE(PAYLOAD, 0)
                    ) 
                    FROM 
                    event_area3_ran_productivity AS c 
                    JOIN royalwed_sitelist_kpi AS b ON b.SITE_ID = c.SITEID 
                    WHERE 
                    b.CATEGORY = 'SUPPORTING' 
                    AND c.STARTTIME = a.STARTTIME
                ) supporting_venue 
                FROM 
                event_area3_ran_productivity AS a 
                WHERE DATE(STARTTIME) >= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 7 DAY) FROM event_area3_ran_productivity)
                AND DATE(STARTTIME) <= (SELECT DATE_SUB(MAX(STARTTIME),INTERVAL 0 DAY) FROM event_area3_ran_productivity)
                                
                GROUP BY 
                a.STARTTIME 
                ORDER BY 
                a.STARTTIME ASC

                `
            , function (error, results) {
                // console.log(results)
                if(error) throw error; 
                res.send({ 
                    statusCode: 200, 
                    statusMessage: 'Success',
                    resultData: results 
                });
            });
            connection.release();
        })
    },

    getTopGrowthPOI(req,res){
        let param = req.params.param;
        let order = req.params.order;
        let query;
        
        if(param == 'GROWTH_TRAFFIC'){
            if(order == 'DESC'){
                query = `
                SELECT @rownum := @rownum + 1 as number,CATEGORY POI_CATEGORY,VENUE POI_NAME,TRAF_NOW P1, TRAF_BASELINE P2, GROWTH_TRAFFIC,GROWTH_PAYLOAD
                FROM
                (SELECT A.CATEGORY,A.VENUE,A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
                SUM(B.PAYLOAD) PAY_NOW, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
                100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM

                (SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, STARTTIME, CATEGORY, VENUE,
                SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) >= '2022-11-26' AND DATE(STARTTIME) <= '2022-12-02' AND SITEID IN (SELECT SITE_ID FROM sitelist_poi)
                GROUP BY WD, JAM, VENUE ,CATEGORY) A
                JOIN (
                SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, CATEGORY, VENUE, STARTTIME, SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) = (SELECT DATE(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND HOUR(STARTTIME) = (SELECT HOUR(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND SITEID IN (SELECT SITE_ID FROM sitelist_poi) GROUP BY JAM,VENUE,CATEGORY) B
                ON A.WD = B.WD
                AND A.JAM = B.JAM
                AND A.VENUE = B.VENUE
                GROUP BY A.VENUE
                ORDER BY GROWTH_TRAFFIC DESC LIMIT 10)growth_data
                cross join (select @rownum := 0) r
                `;
            }else{
                query = `
                SELECT @rownum := @rownum + 1 as number,CATEGORY POI_CATEGORY,VENUE POI_NAME,TRAF_NOW P1, TRAF_BASELINE P2, GROWTH_TRAFFIC,GROWTH_PAYLOAD
                FROM
                (SELECT A.CATEGORY,A.VENUE,A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
                SUM(B.PAYLOAD) PAY_NOW, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
                100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM
                
                (SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, STARTTIME, CATEGORY, VENUE,
                SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) >= '2022-11-26' AND DATE(STARTTIME) <= '2022-12-02' AND SITEID IN (SELECT SITE_ID FROM sitelist_poi)
                GROUP BY WD, JAM, VENUE ,CATEGORY) A
                JOIN (
                SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, CATEGORY, VENUE, STARTTIME, SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) = (SELECT DATE(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND HOUR(STARTTIME) = (SELECT HOUR(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND SITEID IN (SELECT SITE_ID FROM sitelist_poi) GROUP BY JAM,VENUE,CATEGORY) B
                ON A.WD = B.WD
                AND A.JAM = B.JAM
                AND A.VENUE = B.VENUE
                GROUP BY A.VENUE
                 ORDER BY GROWTH_TRAFFIC ASC LIMIT 10)growth_data
                cross join (select @rownum := 0) r
                `;
            }
        }else if(param == 'GROWTH_PAYLOAD'){
            if(order == 'DESC'){
                query = `
                SELECT @rownum := @rownum + 1 as number,CATEGORY POI_CATEGORY,VENUE POI_NAME,PAY_NOW P1, PAY_BASELINE P2, GROWTH_TRAFFIC,GROWTH_PAYLOAD
                FROM
                (SELECT A.CATEGORY,A.VENUE,A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
                SUM(B.PAYLOAD) PAY_NOW, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
                100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM
                
                (SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, STARTTIME, CATEGORY, VENUE,
                SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) >= '2022-11-26' AND DATE(STARTTIME) <= '2022-12-02' AND SITEID IN (SELECT SITE_ID FROM sitelist_poi)
                GROUP BY WD, JAM, VENUE ,CATEGORY) A
                JOIN (
                SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, CATEGORY, VENUE, STARTTIME, SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) = (SELECT DATE(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND HOUR(STARTTIME) = (SELECT HOUR(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND SITEID IN (SELECT SITE_ID FROM sitelist_poi) GROUP BY JAM,VENUE,CATEGORY) B
                ON A.WD = B.WD
                AND A.JAM = B.JAM
                AND A.VENUE = B.VENUE
                GROUP BY A.VENUE
                ORDER BY GROWTH_PAYLOAD DESC LIMIT 10)growth_data
                cross join (select @rownum := 0) r
                `;
            }else{
                query = `
                SELECT @rownum := @rownum + 1 as number,CATEGORY POI_CATEGORY,VENUE POI_NAME,PAY_NOW P1, PAY_BASELINE P2, GROWTH_TRAFFIC,GROWTH_PAYLOAD
                FROM
                (SELECT A.CATEGORY,A.VENUE,A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
                SUM(B.PAYLOAD) PAY_NOW, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
                100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM
                
                (SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, STARTTIME, CATEGORY, VENUE,
                SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) >= '2022-11-26' AND DATE(STARTTIME) <= '2022-12-02' AND SITEID IN (SELECT SITE_ID FROM sitelist_poi)
                GROUP BY WD, JAM, VENUE ,CATEGORY) A
                JOIN (
                SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, CATEGORY, VENUE, STARTTIME, SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) = (SELECT DATE(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND HOUR(STARTTIME) = (SELECT HOUR(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND SITEID IN (SELECT SITE_ID FROM sitelist_poi) GROUP BY JAM,VENUE,CATEGORY) B
                ON A.WD = B.WD
                AND A.JAM = B.JAM
                AND A.VENUE = B.VENUE
                GROUP BY A.VENUE
                ORDER BY GROWTH_PAYLOAD ASC LIMIT 10)growth_data
                cross join (select @rownum := 0) r
                `;
            }
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                query
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
    getTopGrowthSite(req,res){
        let param = req.params.param;
        let order = req.params.order;
        let query;
        
        if(param == 'GROWTH_TRAFFIC'){
            if(order == 'DESC'){
                query = `
                SELECT @rownum := @rownum + 1 as number,SITENAME,SITEID,TRAF_NOW P1, TRAF_BASELINE P2, GROWTH_TRAFFIC,GROWTH_PAYLOAD
                FROM
                (SELECT A.CATEGORY,A.SITEID,A.SITENAME, A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
                SUM(B.PAYLOAD) PAY_NOW, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
                100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM

                (SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, STARTTIME, CATEGORY, siteid SITEID, sitename SITENAME,
                SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) >= '2022-11-26' AND DATE(STARTTIME) <= '2022-12-02' AND SITEID IN (SELECT SITE_ID FROM sitelist_poi)
                GROUP BY WD, JAM, siteid ,CATEGORY) A
                JOIN (
                SELECT VENUE, WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, CATEGORY, siteid SITEID, sitename SITENAME, STARTTIME, SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) = (SELECT DATE(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND HOUR(STARTTIME) = (SELECT HOUR(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND SITEID IN (SELECT SITE_ID FROM sitelist_poi) GROUP BY JAM,siteid,CATEGORY) B
                ON A.WD = B.WD
                AND A.JAM = B.JAM
                AND A.siteid = B.siteid
                GROUP BY A.siteid
                ORDER BY GROWTH_TRAFFIC DESC LIMIT 10)growth_data
                cross join (select @rownum := 0) r
                `;
            }else{
                query = `
                SELECT @rownum := @rownum + 1 as number,SITENAME,SITEID,TRAF_NOW P1, TRAF_BASELINE P2, GROWTH_TRAFFIC,GROWTH_PAYLOAD
                FROM
                (SELECT A.CATEGORY,A.SITEID,A.SITENAME, A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
                SUM(B.PAYLOAD) PAY_NOW, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
                100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM

                (SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, STARTTIME, CATEGORY, siteid SITEID, sitename SITENAME,
                SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) >= '2022-11-26' AND DATE(STARTTIME) <= '2022-12-02' AND SITEID IN (SELECT SITE_ID FROM sitelist_poi)
                GROUP BY WD, JAM, siteid ,CATEGORY) A
                JOIN (
                SELECT VENUE, WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, CATEGORY, siteid SITEID, sitename SITENAME, STARTTIME, SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) = (SELECT DATE(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND HOUR(STARTTIME) = (SELECT HOUR(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND SITEID IN (SELECT SITE_ID FROM sitelist_poi) GROUP BY JAM,siteid,CATEGORY) B
                ON A.WD = B.WD
                AND A.JAM = B.JAM
                AND A.siteid = B.siteid
                GROUP BY A.siteid
                ORDER BY GROWTH_TRAFFIC ASC LIMIT 10)growth_data
                cross join (select @rownum := 0) r
                `;
            }
        }else if(param == 'GROWTH_PAYLOAD'){
            if(order == 'DESC'){
                query = `
                SELECT @rownum := @rownum + 1 as number,SITENAME,SITEID,PAY_NOW P1, PAY_BASELINE P2, GROWTH_TRAFFIC,GROWTH_PAYLOAD
                FROM
                (SELECT A.CATEGORY,A.SITEID,A.SITENAME, A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
                SUM(B.PAYLOAD) PAY_NOW, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
                100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM

                (SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, STARTTIME, CATEGORY, siteid SITEID, sitename SITENAME,
                SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) >= '2022-11-26' AND DATE(STARTTIME) <= '2022-12-02' AND SITEID IN (SELECT SITE_ID FROM sitelist_poi)
                GROUP BY WD, JAM, siteid ,CATEGORY) A
                JOIN (
                SELECT VENUE, WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, CATEGORY, siteid SITEID, sitename SITENAME, STARTTIME, SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) = (SELECT DATE(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND HOUR(STARTTIME) = (SELECT HOUR(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND SITEID IN (SELECT SITE_ID FROM sitelist_poi) GROUP BY JAM,siteid,CATEGORY) B
                ON A.WD = B.WD
                AND A.JAM = B.JAM
                AND A.siteid = B.siteid
                GROUP BY A.siteid
                ORDER BY GROWTH_PAYLOAD DESC LIMIT 10)growth_data
                cross join (select @rownum := 0) r
                `;
            }else{
                query = `
                SELECT @rownum := @rownum + 1 as number,SITENAME,SITEID,PAY_NOW P1, PAY_BASELINE P2, GROWTH_TRAFFIC,GROWTH_PAYLOAD
                FROM
                (SELECT A.CATEGORY,A.SITEID,A.SITENAME, A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
                SUM(B.PAYLOAD) PAY_NOW, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
                100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM

                (SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, STARTTIME, CATEGORY, siteid SITEID, sitename SITENAME,
                SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) >= '2022-11-26' AND DATE(STARTTIME) <= '2022-12-02' AND SITEID IN (SELECT SITE_ID FROM sitelist_poi)
                GROUP BY WD, JAM, siteid ,CATEGORY) A
                JOIN (
                SELECT VENUE, WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, CATEGORY, siteid SITEID, sitename SITENAME, STARTTIME, SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
                WHERE DATE(STARTTIME) = (SELECT DATE(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND HOUR(STARTTIME) = (SELECT HOUR(MAX(STARTTIME)) FROM event_area3_ran_productivity)
                AND SITEID IN (SELECT SITE_ID FROM sitelist_poi) GROUP BY JAM,siteid,CATEGORY) B
                ON A.WD = B.WD
                AND A.JAM = B.JAM
                AND A.siteid = B.siteid
                GROUP BY A.siteid
                ORDER BY GROWTH_PAYLOAD ASC LIMIT 10)growth_data
                cross join (select @rownum := 0) r
                `;
            }
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                query
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