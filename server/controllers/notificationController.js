const Notification = require("../models/Notification");

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
  .populate("user", "name email")
  .populate("lead", "name company")
  .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Mark one notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      notification,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};