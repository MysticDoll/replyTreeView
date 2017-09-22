const User = class User {
  constructor(name, screenName, userId){
    this.name = name;
    this.screenName = screenName;
    this.userId = userId
  }

  static factory(dom) {
    let name = dom.getAttribute("data-name");
    let screenName = dom.getAttribute("data-screen-name");
    let userId = dom.getAttribute("data-user-id");
    return new User(name, screenName, userId);
  }
};

module.exports = User;
