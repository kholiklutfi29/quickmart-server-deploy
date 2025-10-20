import SupplyService from "../services/supplyService.js";

const SupplyController = {
  createSupply: async (req, res, nex) => {
    try {
      const { user_id, product_id, amount, price } = req.body;

      const newSupply = await SupplyService.createSupply(
        user_id,
        product_id,
        amount,
        price
      );

      res.status(201).json({
        message: `New supply for product ${newSupply.product_name} added`,
        data: newSupply,
      });
      console.log(`New supply for product ${newSupply.product_name} added`);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  getSupplyByUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const supplies = await SupplyService.getSupplyByUser(user_id);

      res.status(200).json({
        message: "Supplies fetched successfully",
        data: supplies,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  getTotalSupplyPriceByUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const total = await SupplyService.getTotalSupplyPriceByUser(user_id);

      res.status(200).json({
        message: "Fetch total successfully",
        data: total,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default SupplyController;
