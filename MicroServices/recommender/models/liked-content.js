import mongoose from "mongoose";

// LikedContent schema with discriminators
const LikedContentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      require: true,
      enum: ["Movie", "TvShow"],
    },
    contentData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// Static method for building documents
LikedContentSchema.statics.build = (attrs) => {
  return new LikedContent(attrs);
};

// Create model with discriminators
const LikedContent = mongoose.model(
  "LikedContent",
  LikedContentSchema
);

export { LikedContent };
