const router = require('express').Router();
const { poi,payloadtraffic, vlr,engineer,summary, poibod } = require('../controllers');

// GET localhost:8080/karyawan => Ambil data semua karyawan
const root = '/motogp-2026/api';

// get all poi
router.get(root+'/poi', poi.getPoi);

// get site id maps first
router.get(root+'/poi/map/first', poi.getPoiFirst);

// detail modal poi by siteid and status
router.get(root+'/poi/:sid/:status', poi.getPoiBySID);

// detail modal all poi by city and status
router.get(root+'/poi/map/first/:city/:status', poi.getAllPoiByCity);

// detail modal all poi alarm
router.get(root+'/poi-alarm', poi.getAllPoiAlarm);

// detail modal poi alarm category and status
router.get(root+'/poi-alarm/:category/:status', poi.getAllPoiAlarmDetail);


// START BOD

// get all poi
router.get(root+'/bod/poi', poibod.getPoi);

// get site id maps first
router.get(root+'/bod/poi/map/first', poibod.getPoiFirst);

// detail modal poi by siteid and status
router.get(root+'/bod/poi/:sid/:status', poibod.getPoiBySID);

// detail modal all poi by city and status
router.get(root+'/bod/poi/map/first/:city/:status', poibod.getAllPoiByCity);

// detail modal all poi alarm
router.get(root+'/bod/poi-alarm', poibod.getAllPoiAlarm);

// detail modal poi alarm category and status
router.get(root+'/bod/poi-alarm/:category/:status', poibod.getAllPoiAlarmDetail);

// END BOD

// get data paylaod traffic
router.get(root+'/payloadtraffic', payloadtraffic.getPayloadTraffic);

// get data paylaod traffic growth
router.get(root+'/payloadtraffic/poi/:param/:order', payloadtraffic.getTopGrowthPOI);

// get data paylaod traffic growth
router.get(root+'/payloadtraffic/site/:param/:order', payloadtraffic.getTopGrowthSite);

// get data traffic
router.get(root+'/productivity/traffic', payloadtraffic.getTrafficCategory);

// get data payload
router.get(root+'/productivity/payload', payloadtraffic.getPayloadCategory);

// get data vlr
router.get(root+'/vlr/chart', vlr.getVLRChart);

// get top operator
router.get(root+'/vlr/top_operator', vlr.getTopOperator);

// get data engineer
router.get(root+'/engineer', engineer.getEngineer);

// get data summary
router.get(root+'/report/summary', summary.getSummary);

module.exports = router;