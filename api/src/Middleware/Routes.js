const EventEmitter = require("events");
const constants = require("../../../common/constants");

/**
 * REST API
 */
class Routes extends EventEmitter {
  constructor(build, csrf, token, status, auth, avatars, redirect, sitemap) {
    super();

    this.routes = {
      build,
      csrf,
      token,
      status,
      auth,
      avatars,
      redirect,
      sitemap
    };
  }

  // eslint-disable-next-line lodash/prefer-constant
  static get $provides() {
    return "middleware.routes";
  }

  // eslint-disable-next-line lodash/prefer-constant
  static get $requires() {
    return [
      "route.build",
      "route.csrf",
      "route.token",
      "route.status",
      "route.auth",
      "route.avatars",
      "route.redirect",
      "route.sitemap"
    ];
  }

  // eslint-disable-next-line lodash/prefer-constant
  static get $lifecycle() {
    return "singleton";
  }

  async init() {
    if (this.promise) return this.promise;

    this.promise = Promise.resolve();
    return Promise.all(_.invokeMap(_.values(this.routes), "init"));
  }

  accept({ express }) {
    _.forEach(_.values(this.routes), item =>
      express.use(constants.apiBase, item.router)
    );
  }
}

module.exports = Routes;
