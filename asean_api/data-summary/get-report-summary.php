<?php


date_default_timezone_set('Asia/Makassar');



$db_43 = new mysqli('10.65.103.43', 'ts_admin', '1234', 'event_wsbk_2023');
// print_r($db_43);die();
// $sql = "SELECT (CASE WHEN UCASE(CATEGORY) = 'SUPPORTING' THEN 'SUPPORTING VENUE' ELSE UCASE(CATEGORY) END )CATEGORY, 
// COUNT(CASE WHEN is_down = 1 THEN 1 END) DOWN,
// COUNT(CASE WHEN is_down = 0 AND is_capacity = 1 THEN 1 END) CAPACITY,
// COUNT(CASE WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 1 THEN 1 END) QUALITY,
// COUNT(CASE WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 0 THEN 1 END) GREEN
// FROM royalwed_sitelist_kpi
// GROUP BY CATEGORY";
$sql = " SELECT (CASE WHEN UCASE(POI_CATEGORY) = 'RECREATION' THEN 'SUPPORTING VENUE'  ELSE UCASE(POI_CATEGORY) END )CATEGORY, 
COUNT(CASE WHEN is_down = 1 THEN 1 END) DOWN,
COUNT(CASE WHEN is_down = 0 AND is_capacity = 1 THEN 1 END) CAPACITY,
COUNT(CASE WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 1 THEN 1 END) QUALITY,
COUNT(CASE WHEN is_down = 0 AND is_capacity = 0 AND is_quality = 0 THEN 1 END) GREEN
FROM map_sitelist_kpi where POI_CATEGORY <> 'route'
GROUP BY CATEGORY";
// echo $sql;
$stmt = $db_43->prepare($sql);
// $stmt->bind_param('s',$sid);
$stmt->execute();
$result = $stmt->get_result();

$dataAvalibility = array();
if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)) {	
        array_push($dataAvalibility,$row);
    }
}
$title = "Report Posko WSBK 2023 \nSummary Time : ".date('d-m-Y H:i'). " WITA\n\n";

$content = ".: A. Availability\n(POI: Critical / Quality & Transport / Capacity / Green Site)\n\n";
$content .= "  - Main Venue: ".$dataAvalibility[2]['DOWN']." / ".$dataAvalibility[2]['QUALITY']." / ".$dataAvalibility[2]['CAPACITY']." / ".$dataAvalibility[2]['GREEN']."\n";
$content .= "  - Exit Point:".$dataAvalibility[0]['DOWN']." / ".$dataAvalibility[0]['QUALITY']." / ".$dataAvalibility[0]['CAPACITY']." / ".$dataAvalibility[0]['GREEN']."\n";
$content .= "  - Hospitality : ".$dataAvalibility[1]['DOWN']." / ".$dataAvalibility[1]['QUALITY']." / ".$dataAvalibility[1]['CAPACITY']." / ".$dataAvalibility[1]['GREEN']."\n";
$content .= "  - Recreation: ".$dataAvalibility[3]['DOWN']." / ".$dataAvalibility[3]['QUALITY']." / ".$dataAvalibility[3]['CAPACITY']." / ".$dataAvalibility[3]['GREEN']."\n\n";

$content .= "Critical Alarm :\n";

// $sql = "SELECT DISTINCT SITE_ID,SITE_NAME,(CASE WHEN UCASE(CATEGORY) = 'SUPPORTING' THEN 'SUPPORTING VENUE' ELSE UCASE(CATEGORY) END )CATEGORY,
// VENUE,KETERANGAN,LATITUDE, LONGITUDE, AlarmName , Type type, a.Severity SEVERITY, Status , 
// LEFT(OccurrenceTime,char_length(OccurrenceTime)-3)  OccurrenceTime,
// LEFT(inserttime,char_length(inserttime)-3)  LASTUPDATE
// from event_area3_alarm a
// join royalwed_sitelist_kpi b on b.SITE_ID = a.siteid 
// join alarm_id c on c.ALARM_ID = a.AlarmID 
// where REMARK_BOD = 'OK'";
$sql = "SELECT DISTINCT SITE_ID,SITE_NAME,(CASE WHEN UCASE(POI_CATEGORY) = 'RECREATION' THEN 'SUPPORTING VENUE' ELSE UCASE(POI_CATEGORY) END )CATEGORY,
VENUE,'' KETERANGAN,LATITUDE, LONGITUDE, AlarmName , Type type, Severity SEVERITY, Status , 
LEFT(OccurrenceTime,char_length(OccurrenceTime)-3)  OccurrenceTime,
LEFT(inserttime,char_length(inserttime)-3)  LASTUPDATE
from active_alarm_oss_cell a
join map_sitelist_kpi b on b.SITE_ID = a.siteid 
where REMARK_BOD = 'OK' and  POI_CATEGORY <> 'route'";
// echo $sql;
$stmt = $db_43->prepare($sql);
// $stmt->bind_param('s',$sid);
$stmt->execute();
$result = $stmt->get_result();

if(mysqli_num_rows($result) > 0){
    $i = 1;
    while($row = mysqli_fetch_assoc($result)) {	
        $content .=$i.". ".$row['SITE_ID']." : ".$row['AlarmName']." - Status : ".$row['Status']."\n";
        $i++;
    }
}else{
    $content .= "CLEAR\n";
}

$content .= "\n .: B. Productivity (Current/Delta (Growth to Normal (%))) *Hourly\n";

// $sql = "SELECT SUM(B.TRAFFIC) TRAF_NOW, (SUM(B.TRAFFIC) - A.TRAFFIC) TRAF_DELTA,100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC,
// SUM(B.PAYLOAD) PAY_NOW,(SUM(B.PAYLOAD) - A.PAYLOAD) PAY_DELTA, 100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM

// (SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, STARTTIME, CATEGORY, 
// SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
// WHERE DATE(STARTTIME) >= '2022-11-26' AND DATE(STARTTIME) <= '2022-12-02' AND SITEID IN (SELECT SITE_ID FROM sitelist_poi)
// GROUP BY WD, JAM, CATEGORY) A
// JOIN (
// SELECT VENUE, WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, CATEGORY, STARTTIME, SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
// WHERE DATE(STARTTIME) = (SELECT DATE(MAX(STARTTIME)) FROM event_area3_ran_productivity) AND SITEID IN (SELECT SITE_ID FROM sitelist_poi) GROUP BY JAM,CATEGORY) B
// ON A.WD = B.WD
// AND A.JAM = B.JAM
// AND A.CATEGORY = B.CATEGORY";
$sql = "SELECT A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
SUM(B.PAYLOAD) PAY_NOW,(SUM(B.PAYLOAD) - A.PAYLOAD) PAY_DELTA, (SUM(B.TRAFFIC) - A.TRAFFIC) TRAF_DELTA, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM

(SELECT WEEKDAY(resulttime) WD, HOUR(resulttime) JAM,resulttime STARTTIME,
SUM(traffic_erlang) TRAFFIC, SUM(payload_MByte) PAYLOAD FROM productivity
WHERE DATE(resulttime) >= '2023-02-03' AND DATE(resulttime) <= '2023-02-09'
GROUP BY WD, JAM) A
JOIN (
SELECT WEEKDAY(resulttime) WD, HOUR(resulttime) JAM, resulttime STARTTIME, SUM(traffic_erlang) TRAFFIC, SUM(payload_MByte) PAYLOAD FROM productivity
WHERE DATE(resulttime) = (SELECT DATE(MAX(resulttime)) FROM productivity) GROUP BY JAM) B
ON A.WD = B.WD
AND A.JAM = B.JAM";
// echo $sql;
$stmt = $db_43->prepare($sql);
// $stmt->bind_param('s',$sid);
$stmt->execute();
$result = $stmt->get_result();
$dataProd = array();
// echo mysqli_num_rows($result);
if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)) {	
        array_push($dataProd,$row);
    }
}
// print_r($dataProd);die();

$content .= " 1. Traffic : ".number_format(round($dataProd[0]['TRAF_NOW'],2))." Erl / ".number_format(round($dataProd[0]['TRAF_DELTA'],2))." Erl (".round($dataProd[0]['GROWTH_TRAFFIC'],2)." %)\n";
$content .= $dataProd[0]['STARTTIME']." WITA\n\n";

// $sql = "SELECT CATEGORY,TRAF_NOW, (TRAF_NOW - TRAF_BASELINE) TRAF_DELTA, GROWTH_TRAFFIC
// FROM
// (SELECT A.CATEGORY,A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
// SUM(B.PAYLOAD) PAY_NOW, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
// 100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM

// (SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, STARTTIME, CATEGORY,
// SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
// WHERE DATE(STARTTIME) >= '2022-11-26' AND DATE(STARTTIME) <= '2022-12-02' AND SITEID IN (SELECT SITE_ID FROM sitelist_poi)
// GROUP BY WD, JAM,CATEGORY) A
// JOIN (
// SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, CATEGORY, STARTTIME, SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
// WHERE DATE(STARTTIME) = (SELECT DATE(MAX(STARTTIME)) FROM event_area3_ran_productivity)
// AND HOUR(STARTTIME) = (SELECT HOUR(MAX(STARTTIME)) FROM event_area3_ran_productivity)
// AND SITEID IN (SELECT SITE_ID FROM sitelist_poi) GROUP BY JAM,CATEGORY) B
// ON A.WD = B.WD
// AND A.JAM = B.JAM
// AND A.CATEGORY = B.CATEGORY
// GROUP BY A.CATEGORY
// )growth_data";
// // echo $sql;
// $stmt = $db_43->prepare($sql);
// // $stmt->bind_param('s',$sid);
// $stmt->execute();
// $result = $stmt->get_result();

// if(mysqli_num_rows($result) > 0){
//     $i = 1;
//     while($row = mysqli_fetch_assoc($result)) {	
//         $content .=$i.". ".$row['CATEGORY']." : ".number_format(round($row['TRAF_NOW'],2))." Erl / ".number_format(round($row['TRAF_DELTA'],2))." Erl (".round($row['GROWTH_TRAFFIC'],2)." %)\n";
//         $i++;
//     }
// }else{
//     $content .= "CLEAR\n";
// }




// $content .= "- 22,87 Erl / 15,64 Erl (46,27%)\n";
// $content .= "- 24,19 Erl / 23,86 Erl (1,37%)n";
// $content .= "- 261,21 Erl / 201,52 Erl (29,62%)\n\n";

$content .= "\n 2. Payload : ".number_format(round($dataProd[0]['PAY_NOW'],2))." GB / ".number_format(round($dataProd[0]['PAY_DELTA'],2))." GigaByte (".round($dataProd[0]['GROWTH_PAYLOAD'],2)." %)\n";
$content .= $dataProd[0]['STARTTIME']." WITA\n\n";


// $sql = "SELECT CATEGORY,PAY_NOW, (PAY_NOW - PAY_BASELINE) PAY_DELTA, GROWTH_PAYLOAD
// FROM
// (SELECT A.CATEGORY,A.TRAFFIC TRAF_BASELINE, A.PAYLOAD PAY_BASELINE, SUM(B.TRAFFIC) TRAF_NOW, 
// SUM(B.PAYLOAD) PAY_NOW, 100*(SUM(B.TRAFFIC)/SUM(A.TRAFFIC)-1) GROWTH_TRAFFIC, 
// 100*(SUM(B.PAYLOAD)/SUM(A.PAYLOAD)-1) GROWTH_PAYLOAD, MAX(B.STARTTIME) STARTTIME FROM

// (SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, STARTTIME, CATEGORY,
// SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
// WHERE DATE(STARTTIME) >= '2022-11-26' AND DATE(STARTTIME) <= '2022-12-02' AND SITEID IN (SELECT SITE_ID FROM sitelist_poi)
// GROUP BY WD, JAM,CATEGORY) A
// JOIN (
// SELECT WEEKDAY(STARTTIME) WD, HOUR(STARTTIME) JAM, CATEGORY, STARTTIME, SUM(TRAFFIC) TRAFFIC, SUM(PAYLOAD) PAYLOAD FROM event_area3_ran_productivity
// WHERE DATE(STARTTIME) = (SELECT DATE(MAX(STARTTIME)) FROM event_area3_ran_productivity)
// AND HOUR(STARTTIME) = (SELECT HOUR(MAX(STARTTIME)) FROM event_area3_ran_productivity)
// AND SITEID IN (SELECT SITE_ID FROM sitelist_poi) GROUP BY JAM,CATEGORY) B
// ON A.WD = B.WD
// AND A.JAM = B.JAM
// AND A.CATEGORY = B.CATEGORY
// GROUP BY A.CATEGORY)growth_data";
// // echo $sql;
// $stmt = $db_43->prepare($sql);
// // $stmt->bind_param('s',$sid);
// $stmt->execute();
// $result = $stmt->get_result();

// if(mysqli_num_rows($result) > 0){
//     $i = 1;
//     while($row = mysqli_fetch_assoc($result)) {	
//         $content .=$i.". ".$row['CATEGORY']." : ".number_format(round($row['PAY_NOW'],2))." GB / ".number_format(round($row['PAY_DELTA'],2))." GB (".round($row['GROWTH_PAYLOAD'],2)." %)\n";
//         $i++;
//     }
// }else{
//     $content .= "CLEAR\n";
// }


// $content .= "- 403,74 GB / 317,98 GB (26,97%)\n";
// $content .= "- 24,19 Erl / 23,86 Erl (1,37%)n";
// $content .= "- 261,21 Erl / 201,52 Erl (29,62%)\n\n";

$content .= "\n .:  C. Subscriber\n\n";


$db_42 = new mysqli('10.65.103.42', 'npa', 'NPA.2022#', 'reg07');
// $sql = "SELECT datehour, numuser totalUser FROM `event_area3_subscribers_by_origin` 
// WHERE datehour = (SELECT MAX(datehour) FROM `event_area3_subscribers_by_origin`) AND origin = 'domestic';";
// $sql = "SELECT B.datehour,B.WD,B.HR, B.NUMUSER totalUser, 100*(SUM(B.NUMUSER)/SUM(A.NUMUSER)-1) GROWTH,(SUM(B.NUMUSER) - SUM(A.NUMUSER))DELTA FROM
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
// on A.WD = B.WD 
// and A.HR = B.HR";
$sql = "SELECT B.datehour,B.WD,B.HR, B.NUMUSER totalUser, 100*(SUM(B.NUMUSER)/SUM(A.NUMUSER)-1) GROWTH,(SUM(B.NUMUSER) - SUM(A.NUMUSER))DELTA FROM
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
and A.HR = B.HR";
// echo $sql;
$stmt = $db_42->prepare($sql);
// $stmt->bind_param('s',$sid);
$stmt->execute();
$result = $stmt->get_result();

if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)) {	
        $content .="Last Update : ".$row['datehour']."\n";
        $content .="Total User : ".number_format($row['totalUser'])."\n";
        $content .="Delta : ".number_format($row['DELTA'])."\n";
        $content .="Growth : ".round($row['GROWTH'],2)." %\n";
    }
}else{
    $content .= "CLEAR\n";
}


$content .= "\nPosko WSBK 2023";


$data = $title.$content;
// echo $data;
$db_43->close();
$db_42->close();
echo json_encode(array("response" => $data));
?>