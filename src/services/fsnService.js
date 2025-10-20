import FsnModel from "../models/fsnModel.js";

const FsnService = {
    getFsnByUserId: async(userId) => {
        return await FsnModel.getFsnByUserId(userId);
    }
}

export default FsnService;