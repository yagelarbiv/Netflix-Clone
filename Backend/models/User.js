import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean,default: false},
    profilePicture: {type: String,default: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'},
    myList: {type: [Schema.Types.Mixed],default: []}
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;