const Notification = require("../models/Notification");
const Lead = require("../models/Lead");

// ================================
// Create Lead (Protected)
// ================================

exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      createdBy: req.user._id,
    });

    await Notification.create({
      message: `New lead "${lead.name}" has been created.`,
      type: "create",
      user: req.user._id,
      lead: lead._id,
    });

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================================
// Public Lead Submission
// ================================

exports.publicCreateLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      status: "New",
    });

    await Notification.create({
      message: `New lead "${lead.name}" has been created.`,
      type: "create",
      lead: lead._id,
    });

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================================
// Get All Leads
// ================================

exports.getLeads = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
        { company: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(query)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    const total = await Lead.countDocuments(query);

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      leads,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================================
// Get Single Lead
// ================================

exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      lead,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================================
// Update Lead
// ================================

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    await Notification.create({
      message: `Lead "${lead.name}" was updated.`,
      type: "update",
      user: req.user._id,
      lead: lead._id,
    });

    res.json({
      success: true,
      lead,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================================
// Delete Lead
// ================================

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    await lead.deleteOne();

    await Notification.create({
      message: `Lead "${lead.name}" was deleted.`,
      type: "delete",
      user: req.user._id,
      lead: lead._id,
    });

    res.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================================
// Dashboard Stats
// ================================

exports.dashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: "New" });
    const wonLeads = await Lead.countDocuments({ status: "Won" });
    const lostLeads = await Lead.countDocuments({ status: "Lost" });

    const revenueResult = await Lead.aggregate([
      {
        $match: {
          status: "Won",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$value",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    // Lead Sources
    const sourceAgg = await Lead.aggregate([
      {
        $group: {
          _id: "$source",
          value: {
            $sum: 1,
          },
        },
      },
    ]);

    const sourceData = sourceAgg.map((item) => ({
      name: item._id || "Unknown",
      value: item.value,
    }));

    // Lead Status
    const statusAgg = await Lead.aggregate([
      {
        $group: {
          _id: "$status",
          value: {
            $sum: 1,
          },
        },
      },
    ]);

    const statusData = statusAgg.map((item) => ({
      name: item._id || "Unknown",
      value: item.value,
    }));

    // Monthly Leads
    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyAgg = await Lead.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },
          leads: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const monthlyLeads = monthlyAgg.map((item) => ({
      month: monthNames[item._id.month],
      leads: item.leads,
    }));

    const recentLeads = await Lead.find()
      .sort("-createdAt")
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        wonLeads,
        lostLeads,
        totalRevenue,
      },
      sourceData,
      statusData,
      monthlyLeads,
      recentLeads,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};