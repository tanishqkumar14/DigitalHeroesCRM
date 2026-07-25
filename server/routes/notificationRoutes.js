const express = require("express");

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

// Get all notifications
router.get("/", getNotifications);

// Mark one notification as read
router.put("/:id/read", markAsRead);

// Mark all as read
router.put("/read-all", markAllAsRead);

module.exports = router;