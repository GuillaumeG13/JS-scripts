import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        loaded: 0
      }
   
  }

  checkMimeType=(event)=>{
    //getting file object
    let files = event.target.files 
    //define message container
    let err = ''
    var x = 0
    // list allow mime type
    const types = ['image/png', 'image/jpeg', 'image/gif', 'video/mp4']
    // loop access array
    for(x; x<files.length; x++) {
    // compare file type find doesn't matach
    // eslint-disable-next-line
        if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container   
        err += files[x].type+' is not a supported format\n';
        }
      };
  
      if (err !== ''){
        event.target.value = null 
        toast.error(err)
      }
      

    return true;
    }

  onChangeHandler=event=>{
    var files = event.target.files[0]
    if(this.checkMimeType(event)){ 
    // if return true allow to setState
      console.log("all right")
      this.setState({
      selectedFile: files,
      loaded: 0
      })
    }
  }

  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:8000/upload", data, { 
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total*100)
        })}
      // receive two    parameter endpoint url ,form data
    }).then(res => { 
      toast.success('upload success')
  })
  .catch(err => { 
      toast.error('upload fail')
  })
    
  }

  render() {
    return (
    <div className="form-group">
      <ToastContainer />
    <div className="container">
	    <div className="row">
	      <div className="col-md-6">
	        <form method="post" action="#" id="#">
            <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file" className="form-control" name="file" multiple="" onChange={this.onChangeHandler}></input> 
            </div>
            <div className="form-group">
          <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
          </div>
          <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
          </form>
        </div>
	    </div>
  </div>
  </div>
    )
  }
}

export default App