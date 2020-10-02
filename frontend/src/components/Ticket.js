import React, { Component } from 'react'
import axios from 'axios'

class Ticket extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      content: '',
      messages:'',
      status:'',
      img:'',
      file: '',
      imagePreviewUrl: '',
      errors: {}
    }
    
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    
    console.log('handle uploading-', this.state.file);
    console.log('file burada');
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  onSubmit(e) {
    e.preventDefault()

    console.log("ONSUBMİTTE")

    let formData = new FormData()
    formData.append('img', this.state.file)
    formData.append('name', this.state.name)
    formData.append('content', this.state.content)
    formData.append('messages', this.state.messages)

    axios({
      method: 'post',
      url: 'tickets/addTickets',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
          //handle success
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      })

  }


  

  onChangeHandler=event=>{

    console.log(event.target.files[0])

}

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }




    return (
      
      <div className="container">
          
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">ADD TICKET</h1>
          </div>
          <form encType="multipart/form-data" noValidate onSubmit={this.onSubmit} >
          <div>
          <label htmlFor="name" className="mx-3"><p>Ticket Name</p></label> 
          <input type="text" id="name" className="mx-2"placeholder="Enter ticket name"
                  value={this.state.name}
                  onChange={this.onChange}  name="name" required ></input>
          </div>
          <br></br>
          <div> 
            
                <label htmlFor="content" className="mx-3"><p>Content</p></label> 
                <textarea id="content" name="content"  className="mx-4" rows="2" styles={{}}
                          placeholder="Enter content"
                          value={this.state.content}
                          onChange={this.onChange}  required> 
                </textarea> 
           </div>  
           <br></br>
           <div> 
                <label htmlFor="content" className="mx-3">Message</label> 
                <textarea id="messages"  className="mx-3" name="messages" rows="2" className="mx-3"
                          placeholder="Enter Message"
                          value={this.state.messages.text}
                          onChange={this.onChange}  required> 
                </textarea> 
           </div>  
           <br></br>
           <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
            <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
          </form>
         
        </div>
        <br></br>
            <div> 
                <button type="submit">Submit</button> 
            </div> 
          </form>
        </div>
      </div>
    )
  }
}

export default Ticket