const express = require("express");

const {
  createLead,
  publicCreateLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  dashboardStats,
} = require("../controllers/leadController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorizeMiddleware");

const router = express.Router();

// ================================
// Public Route
// ================================

router.post("/public", publicCreateLead);

// ================================
// Protected Routes
// ================================

router.use(protect);

// Dashboard
router.get("/dashboard", dashboardStats);

// CRUD
router
  .route("/")
  .post(createLead)
  .get(getLeads);

router
  .route("/:id")
  .get(getLead)
  .put(updateLead)
  .delete(authorize("admin"), deleteLead);

module.exports = router;