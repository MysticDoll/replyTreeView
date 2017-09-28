import React from "react";
import User from "./user.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users.map(u => Object.assign(u, {block: true}))
    };
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

  render() {
    URL.revokeObjectURL(this.objectURL);
    return (
      <div>
        <table className={"table"}>
          <thead>
            <tr>
              <th className={"col-md-1"}>ブロックする</th>
              <th>ツイート</th>
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
