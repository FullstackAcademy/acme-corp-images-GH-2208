import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadImage } from './store';


const ImageUploader = connect(
  null,
  (dispatch)=> {
    return {
      upload: (image)=> dispatch(uploadImage(image))
    }
  }
)(class ImageUploader extends Component{
  constructor(){
    super();
    this.state = {
      data: '',
      name: ''
    };
    this.upload = this.upload.bind(this);
  }
  async upload(ev){
    ev.preventDefault();
    try {
      await this.props.upload(this.state);
      this.setState({ name: '', data: '' });
      this.el.value = '';
    }
    catch(ex){
      console.log(ex);
    }
  }
  componentDidMount(){
    this.el.addEventListener('change', (e)=> {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', ()=> {
        this.setState({
          data: reader.result,
          name: file.name
        });
      });
    });
  }
  render(){
    const { data } = this.state;
    const { upload } = this;
    return (
      <div>
        <form onSubmit={ upload }>
          <input type='file' ref={ el => this.el = el }/>
          <button disabled={ !data } >Upload Image</button>
        </form>
        <img src={ data } />
      </div>
    );
  }
});


export default ImageUploader;
