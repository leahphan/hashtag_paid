import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import ImageModal from './ImageModal';

class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }
  }

  handleOpen = (event) => {
    this.setState({ showModal: true });
  }

  handleClose = (event) => {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal } = this.state;
    return (
      <div className="col-md-3" style={{ paddingBottom: '20px' }}>
        <div onClick={this.handleOpen} >
          <img width="100%" src={`${this.props.picture}`} />
        </div>

        {showModal && (
          <ImageModal
            id={this.props.id}
            visible={showModal}
            onCancel={this.handleClose}
          />
        )}
      </div>
    )
  }
}

Image.propTypes = {
  id: PropTypes.number.isRequired,
  picture: PropTypes.string,
};

Image.defaultProps = {
  picture: '',
};

export default Image;





