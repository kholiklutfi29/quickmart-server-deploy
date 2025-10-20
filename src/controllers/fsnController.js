import FsnService from "../services/fsnService.js";

const FsnController = {
  getFsnByUserId: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const fsn = await FsnService.getFsnByUserId(user_id);

      res.status(200).json({
        message: `FSN fetched`,
        data: fsn,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default FsnController;