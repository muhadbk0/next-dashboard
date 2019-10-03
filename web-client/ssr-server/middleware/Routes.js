const Router = require("express").Router;

/**
 * Local API
 */
class Routes {
  constructor(app) {
    this.app = app;
    this.router = Router();

    this.router.post("/session", this.postSession.bind(this));
  }

  async accept({ express }) {
    express.use(this.router);
  }

  /**
   * POST /session
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
  async postSession(req, res, next) {
    try {
      const { accessToken, refreshToken } = req.body;
      await req.setTokens(accessToken, refreshToken);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Routes;
