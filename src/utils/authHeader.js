export default class AuthHeader {
  static instance = null;

  static getInstance() {
    if (AuthHeader.instance == null) {
      AuthHeader.instance = new AuthHeader();
    }
    return this.instance;
  }

  static destroyInstance() {
    if (AuthHeader.instance == null) return;
    AuthHeader.instance = null;
  }

  /**
   * @return Object: {Authorization: accessToken}
   */
  getHeader() {
    if (!this.accessToken) {
      return {};
    }
    return { Authorization: `Bearer ${this.accessToken}` };
  }

  /**
   * @params {session}: object
   * @params {session.accessToken}: string
   * @params {session.refreshToken}: string
   */
  setSession(session) {
    const { accessToken, refreshToken } = session;
    this.setTokens(accessToken, refreshToken);
  }

  /**
   * @params {accessToken}: string
   * @params {refreshToken}: string
   */
  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  getSession() {
    return { accessToken: this.accessToken, refreshToken: this.refreshToken };
  }

  /*
   * @returns refreshToken: string
   */
  getRefreshToken() {
    if (!this.refreshToken) {
      return null;
    }
    return this.refreshToken;
  }
}
