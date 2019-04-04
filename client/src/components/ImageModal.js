import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

class ImageModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      image: {},
      loadingImageData: false
    }
  }

  componentWillMount() {
    this.loadImage();
  }

  loadImage = () => {
    this.setState({ loadingImageData: true }, () => {
      fetch(`http://localhost:3001/images/${this.props.id}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            image: json,
            loadingImageData: false,
          })
        })
    })
  }

  render() {
    const {
      onCancel,
      visible,
    } = this.props;

    const {
      loadingImageData,
      image: {
        picture,
        caption,
        likes,
        comments,
        tags,
        user
      }
    } = this.state;

    if (loadingImageData) {
      return <div>Loading</div>
    }

    return(
      <Modal
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <img width="280px" height="280px" src={`${picture}`} />
        <div style={{float:'right', width: '35%'}}>
          <p><strong>User Name:</strong> {user.name}</p>
          <p><strong>Likes:</strong> {likes}</p>
          <p><strong>Comments:</strong> {comments}</p>
          <p><strong>Caption:</strong> {caption.substr(0, 20)}...</p>
          <p><strong>Tags:</strong> {tags}</p>
        </div>
      </Modal>
    )
  }
};

ImageModal.propTypes = {
  id: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ImageModal;
