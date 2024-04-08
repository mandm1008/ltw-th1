import cookie from 'cookie';
import { userService } from "../services/index.js";

function viewController() {
  return {
    /**
     * @path {GET} /
     */
    index: async (req, res) => {
      if (req.user) {
        res.redirect('/admin');
        return;
      }

      res.render('home', {});
    },

    /**
     * @path {GET} /admin
     * @cookie { _id }
     */
    admin: async (req, res) => {
      if (req.user) {
        res.render('admin/home', { name: req.user.name });
      } else {
        res.redirect('/login');
      }
    },

    /**
     * @path {GET} /login
     */
    login: (req, res) => {
      if (req.user) {
        res.redirect('/admin');
        return;
      }
      res.render('login', {});
    },

    /**
     * @path {POST} /login
     * @params { email, password } req.body
     */
    actionLogin: async (req, res) => {
      const { email, password } = req.body;

      const user = await userService.getUserByEmail(email);
      if (!user) {
        res.render('login', { error: 'Sai email!!!', email: req.body.email });
        return;
      }

      if (user.password !== password) {
        res.render('login', { error: 'Sai mật khẩu!!!', email: req.body.email });
        return;
      }

      res.setHeader('Set-Cookie', cookie.serialize('_id', user._id, {
        httpOnly: true,
        maxAge: 30
      }));
      res.redirect('/admin');
    },

    /**
     * @path {GET} /register
     */
    register: (req, res) => {
      if (req.user) {
        res.redirect('/');
        return;
      }
      res.render('register', {});
    },

    /**
     * @path {POST} /register
     * @params { name, email, password } req.body
     */
    actionRegister: async (req, res) => {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.render('register', { error: 'Vui lòng nhập đầy đủ thông tin!!!', name, email });
        return;
      }

      const user = await userService.getUserByEmail(email);
      if (user) {
        res.render('register', { error: 'Email đã tồn tại!!!', name, email });
        return;
      }

      userService.createUser(name, email, password);
      res.redirect('/login');
    },

    /**
     * @path {GET} /logout
     */
    logout: (req, res) => {
      res.setHeader('Set-Cookie', cookie.serialize('_id', '', {
        httpOnly: true,
        maxAge: -1
      }));

      res.redirect('/login');
    },
  }
}

export default viewController();
