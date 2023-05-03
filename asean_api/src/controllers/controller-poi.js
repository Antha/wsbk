const config = require('../configs/db-event-43');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil data semua karyawan
    getPoi(req,res){
        // console.log(req.header('user-agent'))
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `               
                SELECT SITE_ID,SITE_NAME, LONGITUDE, LATITUDE,
                (CASE WHEN REMARK = 'GREEN' THEN 'NORMAL'
                WHEN REMARK = 'YELLOW' THEN 'CAPACITY'
                WHEN REMARK = 'PURPLE' THEN 'QUALITY'
                ELSE 'CRITICAL' END)STATUS
                FROM
                (SELECT SITE_ID,SITE_NAME, LONGITUDE, LATITUDE,
                CASE 
                WHEN is_down = 1 THEN 'RED' 
                WHEN is_down = 0 AND is_capacity = 1 THEN 'YELLOW'
                WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 1 THEN 'PURPLE' ELSE 'GREEN' END AS REMARK
                FROM map_sitelist_kpi where POI_CATEGORY <> 'route')main_data
                `
            , function (error, results) {
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
    getPoiFirst(req,res){
        // console.log(req.header('user-agent'))
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                (SELECT SITE_ID,  SITE_NAME,AVG(latitude) as LATITUDE, AVG(longitude) as LONGITUDE,
                COUNT(CASE WHEN is_down = 1 THEN 1 END) CRITICAL,
                COUNT(CASE WHEN is_down = 0 AND is_capacity = 1 THEN 1 END) CAPACITY,
                COUNT(CASE WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 1 THEN 1 END) QUALITY,
                COUNT(CASE WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 0 THEN 1 END) NORMAL
                from map_sitelist_kpi msk where POI_LV2 ='MANDALIKA' and POI_CATEGORY <> 'route')
                union all 
                (SELECT SITE_ID,  SITE_NAME,AVG(latitude) as LATITUDE, AVG(longitude) as LONGITUDE,
                COUNT(CASE WHEN is_down = 1 THEN 1 END) CRITICAL,
                COUNT(CASE WHEN is_down = 0 AND is_capacity = 1 THEN 1 END) CAPACITY,
                COUNT(CASE WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 1 THEN 1 END) QUALITY,
                COUNT(CASE WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 0 THEN 1 END) NORMAL
                from map_sitelist_kpi msk where POI_LV2 ='PRAYA' and POI_CATEGORY <> 'route')
                union all 
                (SELECT SITE_ID,  SITE_NAME,AVG(latitude) as LATITUDE, AVG(longitude) as LONGITUDE,
                COUNT(CASE WHEN is_down = 1 THEN 1 END) CRITICAL,
                COUNT(CASE WHEN is_down = 0 AND is_capacity = 1 THEN 1 END) CAPACITY,
                COUNT(CASE WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 1 THEN 1 END) QUALITY,
                COUNT(CASE WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 0 THEN 1 END) NORMAL
                from map_sitelist_kpi msk where POI_LV2 ='MATARAM' and POI_CATEGORY <> 'route')
                `
            , function (error, results) {
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
    getPoiBySID(req,res){
        let sid = req.params.sid;
        let status = req.params.status;
        let query;
        if(status == 'CRITICAL'){
            query = `
                SELECT  SITE_ID,SITE_NAME,(CASE WHEN UCASE(POI_CATEGORY) = 'RECREATION' THEN 'SUPPORTING VENUE' ELSE UCASE(POI_CATEGORY) END )CATEGORY,
                VENUE,''KETERANGAN,LATITUDE, LONGITUDE, AlarmName , Type type, Severity SEVERITY, Status ,
                LEFT(OccurrenceTime,char_length(OccurrenceTime)-3)  OccurrenceTime,
                LEFT(inserttime,char_length(inserttime)-3)  LASTUPDATE
                from active_alarm_oss_cell a
                join map_sitelist_kpi b on b.SITE_ID = a.siteid 
                where siteid = ? AND REMARK = 'OK' AND is_down = 1  and POI_CATEGORY <> 'route'
            `;
        } else if(status == 'QUALITY'){
            query = `
            SELECT SITE_ID , SITE_NAME ,POI_CATEGORY CATEGORY , VENUE,'' KETERANGAN,LATITUDE, LONGITUDE,  LEFT(update_2g,char_length(update_2g)-3)  LASTUPDATE,
            TCHBR 2g_TCH_Blocking_Rate,
            HOSR 2g_HOSR , SDSR 2g_SDSR ,
            CSSR_VOICE 3g_CSSR_CS ,CSSR_PS 3g_CSSR_PS  ,CSSR_HSDPA 3g_CSSR_HSDPA ,CSSR_HSUPA 3g_CSSR_HSUPA ,
            CCSR_HSDPA 3g_CCSR_PS ,
            rrc_setup_success_rate 4g_RRC_Setup_SR_Service ,e_rab_setup_success_rate 4g_ERAB_Setup_SR_All ,service_drop_rate 4g_Service_Drop_Rate 
            FROM map_sitelist_kpi WHERE SITE_ID = ? AND is_down = 0 AND is_capacity = 0 AND is_quality = 1 and POI_CATEGORY <> 'route'
            `;
        } else if(status == 'CAPACITY'){
            query = `
            SELECT SITE_ID , SITE_NAME ,(CASE WHEN UCASE(POI_CATEGORY) = 'RECREATION' THEN 'SUPPORTING VENUE' ELSE UCASE(POI_CATEGORY) END )CATEGORY , VENUE,'' KETERANGAN,LATITUDE, LONGITUDE, LEFT(update_2g,char_length(update_2g)-3)  LASTUPDATE,
            dl_resource_block_utilizing_rate 4g_DL_Resource_Block_Utilizing_Rate,ul_resource_block_utilizing_rate 4g_UL_Resource_Block_Utilizing_Rate ,
            maximum_user_number 4g_MaxOfMax_Active_User ,
            N_User_RRCConn_Active_Avg 5g_RRC_User_Number 
            FROM map_sitelist_kpi WHERE SITE_ID = ? AND is_down = 0 AND is_capacity = 1 and POI_CATEGORY <> 'route'
            `;
        }else{
            query = `
            SELECT  SITE_ID , SITE_NAME ,LONGITUDE ,LATITUDE,VENUE,UPPER(POI_CATEGORY) CATEGORY,VENUE,'' KETERANGAN, POI_LV2, BAND
            FROM map_sitelist_kpi  
            where SITE_ID = ? AND is_down = 0  AND is_capacity = 0 AND is_quality = 0 and POI_CATEGORY <> 'route'
            GROUP BY SITE_ID
            `;
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
              query
                , [sid], function (error, results) {
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
    getAllPoiByCity(req,res){
        let city = req.params.city;
        let status = req.params.status;
        let query;
        if(status == 'CRITICAL'){
            query = `
            SELECT  SITE_ID,SITE_NAME,(CASE WHEN UCASE(POI_CATEGORY) = 'RECREATION' THEN 'SUPPORTING VENUE' ELSE UCASE(POI_CATEGORY) END )CATEGORY,
            VENUE,'' KETERANGAN,LATITUDE, LONGITUDE, AlarmName , Type type, Severity SEVERITY, Status ,
            LEFT(OccurrenceTime,char_length(OccurrenceTime)-3)  OccurrenceTime,
            LEFT(inserttime,char_length(inserttime)-3)  LASTUPDATE
            from active_alarm_oss_cell a
            join map_sitelist_kpi b on b.SITE_ID = a.siteid 
            where POI_LV2 = ? AND is_down = 1  and POI_CATEGORY <> 'route'
            `;
        }  else if(status == 'QUALITY'){
            query = `
            SELECT SITE_ID , SITE_NAME ,(CASE WHEN UCASE(POI_CATEGORY) = 'RECREATION' THEN 'SUPPORTING VENUE' ELSE UCASE(POI_CATEGORY) END )CATEGORY , VENUE,'' KETERANGAN,LATITUDE, LONGITUDE, LEFT(update_2g,char_length(update_2g)-3)  LASTUPDATE,
            TCHBR 2g_TCH_Blocking_Rate,
            HOSR 2g_HOSR , SDSR 2g_SDSR ,
            CSSR_VOICE 3g_CSSR_CS ,CSSR_PS 3g_CSSR_PS  ,CSSR_HSDPA 3g_CSSR_HSDPA ,CSSR_HSUPA 3g_CSSR_HSUPA ,
            CCSR_HSDPA 3g_CCSR_PS ,
            rrc_setup_success_rate 4g_RRC_Setup_SR_Service ,e_rab_setup_success_rate 4g_ERAB_Setup_SR_All ,service_drop_rate 4g_Service_Drop_Rate 
            FROM map_sitelist_kpi WHERE POI_LV2 = ? AND is_down = 0 AND is_capacity = 0 AND is_quality = 1 and POI_CATEGORY <> 'route'
            `;
        } else if(status == 'CAPACITY'){
            query = `
            SELECT SITE_ID , SITE_NAME ,(CASE WHEN UCASE(POI_CATEGORY) = 'RECREATION' THEN 'SUPPORTING VENUE' ELSE UCASE(POI_CATEGORY) END )CATEGORY , VENUE,'' KETERANGAN,LATITUDE, LONGITUDE, LEFT(update_2g,char_length(update_2g)-3)  LASTUPDATE,
            dl_resource_block_utilizing_rate 4g_DL_Resource_Block_Utilizing_Rate,ul_resource_block_utilizing_rate 4g_UL_Resource_Block_Utilizing_Rate ,
            maximum_user_number 4g_MaxOfMax_Active_User ,
            N_User_RRCConn_Active_Avg 5g_RRC_User_Number 
            FROM map_sitelist_kpi WHERE POI_LV2 = ? AND is_down = 0 AND is_capacity = 1 and POI_CATEGORY <> 'route'
            `;
        } else{
            query = `
            SELECT  SITE_ID , SITE_NAME ,LONGITUDE ,LATITUDE,VENUE,UPPER(POI_CATEGORY) CATEGORY,VENUE,'' KETERANGAN, POI_LV2, BAND
            FROM map_sitelist_kpi 
            where POI_LV2 = ?
            GROUP BY SITE_ID AND is_down = 0  AND is_capacity = 0 AND is_quality = 0 and POI_CATEGORY <> 'route'
            `;
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                query
                , [city], function (error, results) {
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
    getAllPoiAlarm(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `   
                SELECT (CASE WHEN UCASE(POI_CATEGORY) = 'RECREATION' THEN 'SUPPORTING VENUE' ELSE UCASE(POI_CATEGORY) END )CATEGORY, 
                COUNT(CASE WHEN is_down = 1 THEN 1 END) DOWN,
                COUNT(CASE WHEN is_down = 0 AND is_capacity = 1 THEN 1 END) CAPACITY,
                COUNT(CASE WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 1 THEN 1 END) QUALITY,
                COUNT(CASE WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 0 THEN 1 END) GREEN
                FROM map_sitelist_kpi where  POI_CATEGORY <> 'route'
                GROUP BY CATEGORY
                `
                , function (error, results) {
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
    getAllPoiAlarmDetail(req,res){
        let category = req.params.category;
        let status = req.params.status;
        let query;
        
        if(category == 'SUPPORTING VENUE'){
            category = 'RECREATION';
        }
        
        if(status == 'CRITICAL'){
            query = `
                SELECT DISTINCT SITE_ID,SITE_NAME,(CASE WHEN UCASE(POI_CATEGORY) = 'RECREATION' THEN 'SUPPORTING VENUE' ELSE UCASE(POI_CATEGORY) END )CATEGORY,
                VENUE,'' KETERANGAN,LATITUDE, LONGITUDE, AlarmName , Type type, Severity SEVERITY, Status , 
                LEFT(OccurrenceTime,char_length(OccurrenceTime)-3)  OccurrenceTime,
                LEFT(inserttime,char_length(inserttime)-3)  LASTUPDATE
                from active_alarm_oss_cell a
                join map_sitelist_kpi b on b.SITE_ID = a.siteid 
                where POI_CATEGORY = ?   AND is_down = 1  AND POI_CATEGORY <> 'route'
            `;
        } else if(status == 'QUALITY'){
            query = `
                SELECT SITE_ID , SITE_NAME ,(CASE WHEN UCASE(POI_CATEGORY) = 'RECREATION' THEN 'SUPPORTING VENUE' ELSE UCASE(POI_CATEGORY) END )CATEGORY , VENUE,'' KETERANGAN,LATITUDE, LONGITUDE,   LEFT(update_2g,char_length(update_2g)-3)  LASTUPDATE,
                TCHBR 2g_TCH_Blocking_Rate,
                HOSR 2g_HOSR , SDSR 2g_SDSR ,
                CSSR_VOICE 3g_CSSR_CS ,CSSR_PS 3g_CSSR_PS  ,CSSR_HSDPA 3g_CSSR_HSDPA ,CSSR_HSUPA 3g_CSSR_HSUPA ,
                CCSR_HSDPA 3g_CCSR_PS ,
                rrc_setup_success_rate 4g_RRC_Setup_SR_Service ,e_rab_setup_success_rate 4g_ERAB_Setup_SR_All ,service_drop_rate 4g_Service_Drop_Rate 
                FROM map_sitelist_kpi WHERE POI_CATEGORY = ? AND is_down = 0 AND is_capacity = 0 AND is_quality = 1 AND POI_CATEGORY <> 'route'
            `;
        } else if(status == 'CAPACITY'){
            query = `
                SELECT SITE_ID , SITE_NAME ,(CASE WHEN UCASE(POI_CATEGORY) = 'RECREATION' THEN 'SUPPORTING VENUE' ELSE UCASE(POI_CATEGORY) END )CATEGORY , VENUE,'' KETERANGAN,LATITUDE, LONGITUDE, LEFT(update_2g,char_length(update_2g)-3)  LASTUPDATE,
                dl_resource_block_utilizing_rate 4g_DL_Resource_Block_Utilizing_Rate,
                ul_resource_block_utilizing_rate 4g_UL_Resource_Block_Utilizing_Rate ,
                maximum_user_number 4g_MaxOfMax_Active_User , N_User_RRCConn_Active_Avg 5g_RRC_User_Number 
                FROM map_sitelist_kpi WHERE POI_CATEGORY = ? AND is_down = 0 AND is_capacity = 1  AND POI_CATEGORY <> 'route'
            `;
        } else{
            query = `
            SELECT  SITE_ID , SITE_NAME ,LONGITUDE ,(CASE WHEN UCASE(POI_CATEGORY) = 'RECREATION' THEN 'SUPPORTING VENUE' ELSE UCASE(POI_CATEGORY) END )CATEGORY ,LATITUDE,VENUE,VENUE KETERANGAN, POI_LV2
            FROM map_sitelist_kpi 
            where POI_CATEGORY = ? AND is_down = 0 AND is_capacity = 0 AND is_quality = 0 AND POI_CATEGORY <> 'route'
            
            `;
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                query
                , [category], function (error, results) {
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