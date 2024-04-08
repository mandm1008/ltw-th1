import cookie from "cookie";
import { userService } from "../services/index.js";

function userController() {
  return {
    /**
     * Middleware to check if user is login
     * @cookie { _id }
     */
    checkLogin: async function (req, res, next) {
      const _id = cookie.parse(req.headers.cookie || '')._id;
      if (!_id) {
        next();
        return;
      }

      const user = await userService.getUserByID(_id);
      if (!user) {
        next();
        return;
      }

      req.user = user.toObject();
      next();
    },
  };
}

export default userController();
