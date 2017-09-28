import React from "react";
import Tweet from "./tweet.jsx";

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      block: this.props.block
    };
    this.manager = this.props.manager;
    this.manager.userModels.push(this);
  }
  
  get userPage() {
    return `https://twitter.com/${this.props.screen_name}`;
  }

  get onChange() {
    return e => {
      let isBlock = e.target.checked;
      let state = {
        users:this.manager.state.users.map(user => 
          user.id_str === this.props.id ? Object.assign(user, {block: isBlock}) : user
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
        <Tweet screen_name={this.props.screen_name} replies={this.props.replies} />
        <td className={"user-icon-container"}>
          <a href={this.userPage}><img src={this.props.profile_image_url_https}></img></a>
        </td>
        <td className={"screen-name-container"}>
          <a href={this.userPage}><span>{this.props.screen_name}</span></a>
        </td>
        <td className={"user-name-container"}>
          <span>{this.props.name}</span>
        </td>
        <td className={"user-profile-container"}>
          <p>{this.props.description}</p>
        </td>
      </tr>
    );
  }
}
