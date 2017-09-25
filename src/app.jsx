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
            screenName={user.screenName}
            userId={user.userId}
            key={user.userId}
            manager={this}
          />
        ))
      }
    </tbody>
    );
  }

  get blockList() {
  return this.state.users.filter(user => user.block).map(user => user.userId).join("\n");
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
              <th>ブロックするか</th>
              <th>screen_name</th>
              <th>ユーザー名</th>
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
