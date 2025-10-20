
import { body, validationResult } from "express-validator";

const validateSupply = [
  body("user_id")
    .notEmpty().withMessage("user_id is required")
    .isUUID().withMessage("user_id must be a valid UUID"),

  body("product_id")
    .notEmpty().withMessage("product_id is required")
    .isUUID().withMessage("product_id must be a valid UUID"),

  body("amount")
    .notEmpty().withMessage("amount is required")
    .isInt({ min: 1 }).withMessage("amount must be a positive integer"),

  body("price")
    .notEmpty().withMessage("price is required")
    .isInt({ min: 1 }).withMessage("price must be a positive integer"),

  // handler untuk kumpulin semua error
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateSupply;
