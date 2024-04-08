import { Router } from "express";
import { viewController, userController } from "./controllers/index.js";

// 'views' route
const viewsRouter = new Router();

viewsRouter.use('/', userController.checkLogin);
viewsRouter.get('/register', viewController.register);
viewsRouter.post('/register', viewController.actionRegister);
viewsRouter.get('/login', viewController.login);
viewsRouter.post('/login', viewController.actionLogin);
viewsRouter.get('/logout', viewController.logout);
viewsRouter.get('/admin', viewController.admin);
viewsRouter.get('/', viewController.index);

function enableRouter(app) {
  app.use("/", viewsRouter);
}

export {
  enableRouter,
  viewsRouter
};