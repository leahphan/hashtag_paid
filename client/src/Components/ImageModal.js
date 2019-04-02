import React, { Component } from 'react';
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
          console.log(this.state.image.user)
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
      >
        <img width="280px" height="280px" src={`${picture}`} />
        <div style={{float:'right', width: '35%'}}>
          User Name: {user.name}
          Caption: {caption}
          Likes: {likes}
          Comments: {comments}
          Tags: {tags}
        </div>
      </Modal>
    )
  }
};

export default ImageModal;
