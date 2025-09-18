import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      enum: ["ADMIN", "SUPER ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const RoleModel = mongoose.model("Role", RoleSchema);

export default RoleModel;
