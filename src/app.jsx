import React from "react";
import User from "./user.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users.map(u => Object.assign(u, {block: true}))
    };
    this.userModels = [];
  }

  get userView() {
    return (
      <tbody>
      { this.state.users.map(user => (
          <User
            block={user.block}
            name={user.name}
            screen_name={user.screen_name}
            description={user.description}
            profile_image_url_https={user.profile_image_url_https}
            id={user.id_str}
            key={user.id_str}
            replies={user.replies}
            manager={this}
          />
        ))
      }
    </tbody>
    );
  }

  get blockList() {
    return this.state.users.filter(user => user.block).map(user => user.id_str).join("\n");
  }

  get exportURL() {
    let objectURL = URL.createObjectURL(new File([this.blockList], "blocklist.csv", {type: "text/csv"}));
    this.objectURL = objectURL;
    return objectURL;
  }

  get blockAll() {
    return () => {
      this.setState({
        users: this.state.users.map(user => Object.assign(user, {block: true}))
      });
      this.userModels.forEach(u => u.setState({block: true}));
    };
  }

  get blockNone() {
    return () => {
      this.setState({
        users: this.state.users.map(user => Object.assign(user, {block: false}))
      });
      this.userModels.forEach(u => u.setState({block: false}));
    };
  }

  render() {
    URL.revokeObjectURL(this.objectURL);
    return (
      <div>
        <table className={"table"}>
          <thead>
            <tr>
              <td>
                <button
                  className={"btn btn-primary"}
                  onClick={this.blockNone}
                >
                  <span>全てのチェックを外す</span>
                </button>
              </td>
              <td>
                <button
                  className={"btn btn-primary"}
                  onClick={this.blockAll}
                >
                  <span>全てのチェックをつける</span>
                </button>
              </td>
            </tr>
            <tr>
              <th className={"col-md-1"}>ブロックする</th>
              <th className={"col-md-4"}>ツイート</th>
              <th className={"col-md-1"}>アイコン</th>
              <th>screen_name</th>
              <th>ユーザー名</th>
              <th>プロフィール</th>
            </tr>
          </thead>
          {this.userView}
        </table>
        <div>
        <a className="btn btn-info" href={this.exportURL} download={"blocklist.csv"} target={"_blank"}>Export</a>
        </div>
      </div>
    );
  }
}
