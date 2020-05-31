/**
 *
 * Comment  评论单个显示组件每条评论的具体显示
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      timeString: "",
    };
  }

  UNSAFE_componentWillMount() {
    this._updateTimeString();
    this._timer = setInterval(() => {
      this._updateTimeString.bind(this);
      console.log("1");
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }
  // 评论时间方法
  _updateTimeString() {
    const comment = this.props.comment;
    const duration = (+Date.now() - comment.createdTime) / 1000;
    this.setState({
      timeString:
        duration > 30
          ? `${Math.round(duration / 60)}分钟前`
          : `${Math.round(Math.max(duration, 1))}秒前`,
    });
  }
  // 显示code代码块
  _getProcessedContent(content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, "<code>$1</code>");
  }
  // 删除
  handleDeleteComment() {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index);
    }
  }

  render() {
    console.log(this.props, "props");
    const comment = this.props.comment;
    return (
      <div className="comment">
        <div className="comment-user">
          <span>{this.props.comment.username}: &nbsp;</span>
        </div>
        {/*<p>{this.props.comment.content}</p>*/}
        <p
          dangerouslySetInnerHTML={{
            __html: this._getProcessedContent(comment.content),
          }}
        ></p>
        <span className="comment-createdtime">{this.state.timeString}</span>
        <span
          className="comment-delete"
          onClick={this.handleDeleteComment.bind(this)}
        >
          删除
        </span>
      </div>
    );
  }
}
