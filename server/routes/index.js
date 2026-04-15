const router = require('express').Router();
const { 
  handleGetDashboardOverview, 
  handleGetDashboardDetail,
  handleGetCostDetail,
  handleGetInventoryDetail,
  handleGetComplianceDetail,
  handleGetMonitoringDetail,
  handleGetUtilizationDetail,
  handleGetStorageDetail
} = require('../controllers/dashboardController');

router.get('/', handleGetDashboardOverview);

router.get('/cost', handleGetCostDetail);
router.get('/inventory', handleGetInventoryDetail);
router.get('/compliance', handleGetComplianceDetail);
router.get('/monitoring', handleGetMonitoringDetail);
router.get('/utilization', handleGetUtilizationDetail);
router.get('/storage', handleGetStorageDetail);

module.exports = router;
