import React from "react";

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      block: this.props.block
    };
    this.manager = this.props.manager;
  }
  
  get userPage() {
    return `https://twitter.com/${this.props.screenName}`;
  }

  get onChange() {
    return e => {
      let isBlock = e.target.checked;
      let state = {
        users:this.manager.state.users.map(user => 
          user.userId === this.props.userId ? Object.assign(user, {block: isBlock}) : user
        )
      };
      this.manager.setState(state);
      this.setState({block: isBlock})
    }
  }

  render() {
    return (
      <tr className={"user-block"}>
        <td className={"block-container"}>
          <input type={"checkbox"} className={"block-checkbox form-control"} checked={this.state.block} onChange={this.onChange}></input>
        </td>
        <td className={"screen-name-container"}>
          <a href={this.userPage}><span>{this.props.screenName}</span></a>
        </td>
        <td className={"user-name-container"}>
          <span>{this.props.name}</span>
        </td>
      </tr>
    );
  }
}
