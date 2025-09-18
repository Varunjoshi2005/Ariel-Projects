import mongoose from "mongoose";

const UserRoleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true }
);

const UserRoleModel = mongoose.model("UserRole", UserRoleSchema);

export default UserRoleModel;
