import { model, models, Schema } from "mongoose";
import { giftCard } from "~/utils/modelData.mjs";

const giftCardSchema = new Schema(giftCard, { timestamps: true });

export default models.giftCard || model("giftCard", giftCardSchema);
