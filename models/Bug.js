const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bugSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignee: {
      type: String,
      emum: ["john", "alex", "tom"],
      default: "user",
    },
    time: {
      type: String,
      default: () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
        return `${formattedHours}:${minutes} ${ampm}`;
      },
    },
    date: {
      type: String,
      default: () => {
        const now = new Date();
        const day = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][now.getDay()];
        const date = now.getDate().toString().padStart(2, "0");
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const year = now.getFullYear();
        return `${day}, ${date}/${month}/${year}`;
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bug", bugSchema);
