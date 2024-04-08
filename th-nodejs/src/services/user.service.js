import { UserModel } from "../models/index.js";

function UserService() {
  return {
    /**
     * Get user by id
     * @param {string} _id 
     * @returns User model
     */
    getUserByID: async function (_id) {
      const user = UserModel.findById(_id);

      return user;
    },

    /**
     * Get user by email
     * @param {string} email
     * @returns User model
     */
    getUserByEmail: async function (email) {
      const user = UserModel.findOne({ email });

      return user;
    },

    /**
     * Create new user
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * @returns false | _id
     */
    createUser: async function (name, email, password) {
      const user = new UserModel({
        name,
        email,
        password
      });

      if (await user.save()) {
        return user._id;
      } else {
        return false;
      }
    },

    updateUser: function () {
      return 'updateUser';
    },

    deleteUser: function () {
      return 'deleteUser';
    }
  }
}

export default UserService();