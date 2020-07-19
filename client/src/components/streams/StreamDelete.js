import React, {Component} from "react";
import Modal from "../Modal";
import history from "../../history";
import {fetchStream, deleteStream} from "../../actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class StreamDelete extends Component {
  renderAction() {
    return (
      <>
        <button onClick={this.removeStream} className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  }

  removeStream = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderTitle() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream ?";
    }
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
  }
  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderTitle()}
        action={this.renderAction()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, {fetchStream, deleteStream})(
  StreamDelete
);

// the empty tags above represent react fragment
