const overviewData = require('../mock/dashboardOverviewData.json');
const costDetailData = require('../mock/costDetailData.json');
const inventoryDetailData = require('../mock/inventoryDetailData.json');
const complianceDetailData = require('../mock/complianceDetailData.json');
const monitoringDetailData = require('../mock/monitoringDetailData.json');
const utilizationDetailData = require('../mock/utilizationDetailData.json');
const storageDetailData = require('../mock/storageDetailData.json');

const handleGetDashboardOverview = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: overviewData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleGetDashboardDetail = (req, res) => {
  try {
    const consolidatedData = {
      cost: costDetailData,
      inventory: inventoryDetailData,
      compliance: complianceDetailData,
      monitoring: monitoringDetailData,
      utilization: utilizationDetailData,
      storage: storageDetailData
    };
    res.status(200).json({
      success: true,
      data: consolidatedData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleGetCostDetail = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: costDetailData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleGetInventoryDetail = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: inventoryDetailData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleGetComplianceDetail = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: complianceDetailData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleGetMonitoringDetail = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: monitoringDetailData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleGetUtilizationDetail = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: utilizationDetailData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleGetStorageDetail = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: storageDetailData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  handleGetDashboardOverview,
  handleGetDashboardDetail,
  handleGetCostDetail,
  handleGetInventoryDetail,
  handleGetComplianceDetail,
  handleGetMonitoringDetail,
  handleGetUtilizationDetail,
  handleGetStorageDetail
};
