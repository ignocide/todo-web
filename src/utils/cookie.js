import cookie from 'js-cookie';
import jwtDecoder from 'jwt-decode';

class Cookie {
  keys = {
    ACCESS_TOKEN: 'at',
    REFRESH_TOKEN: 'rt',
  };

  getTokens() {
    const refreshToken = cookie.get(this.keys.REFRESH_TOKEN);
    const accessToken = cookie.get(this.keys.ACCESS_TOKEN);

    return {
      refreshToken,
      accessToken,
    };
  }

  setTokens(tokens) {
    // const refresh_token = cookie.get(this.keys.REFRESH_TOKEN);
    // const access_token = cookie.get(this.keys.Access_TOKEN);

    // return {
    //   refresh_token,
    //   access_token,
    // };

    this.setCookie(this.keys.ACCESS_TOKEN, tokens.access_token);
    this.setCookie(this.keys.REFRESH_TOKEN, tokens.refresh_token);
  }

  setCookie(key, value) {
    cookie.set(key, value, {
      expires: 365,
      path: '/',
    });
  }

  getUser() {
    let user = null;
    const tokens = this.getTokens();
    if (tokens.accessToken) {
      user = jwtDecoder(tokens.accessToken);
    }
    return user;
  }

  getUserRoles() {
    const user = this.getUser() || {};
    const { authorities = [] } = user;
    return authorities;
  }

  hasRole(role) {
    const roles = this.getUserRoles();
    return roles.includes(`ROLE_${role}`);
  }

  // getUserAndRole(){
  //
  // }
  // getCookie(key){
  //   cookie.get()
  // }
}

const cookieUtil = new Cookie();

export default cookieUtil;
