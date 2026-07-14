import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
    },

    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true,
    },

    screen: {
      type: Number,
      default: 1,
    },

    showDate: {
      type: Date,
      required: true,
    },

    showTime: {
      type: String,
      required: true,
    },

    ticketPrice: {
      type: Number,
      required: true,
    },

    totalSeats: {
      type: Number,
      default: 120,
    },

    bookedSeats: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Show", showSchema);