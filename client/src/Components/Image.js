import React, { Component } from 'react';
import { Modal } from 'antd';
import ImageModal from './ImageModal';

class Image extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClose = this.handleClose.bind(this);

    this.state = {
      showModal: false
    }
  }

  render() {
    const { showModal } = this.state;
    return (
      <div onClick={() => this.setState({ showModal: true })}  className="col-md-3">
        <img width="280px" height="280px" src={`${this.props.picture}`} />

        {showModal && (
          <ImageModal
            id={this.props.id}
            visible={showModal}
            onCancel={() => this.setState({ showModal: false })}
          />
        )}
      </div>
    )
  }

}

export default Image;





