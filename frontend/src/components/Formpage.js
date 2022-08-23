import axios from 'axios';
import React,{Component} from 'react';
import Spinner from "react-spinkit";
 
class Formpage extends Component {
  
    constructor(props){
      super(props)
      this.state = {
        selectedFile : null,
        uploadComplete : false,
        uploading : false,
      }
    }

    changeFunction = event => {   

      let fileNameField = document.getElementById('file-name');
      let uploadedFileName = event.target.files[0].name;
      fileNameField.textContent = uploadedFileName;

      this.setState({ selectedFile: event.target.files[0] });

    };

    onFileUpload = () => {
    
      this.setState({uploading : true});

      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    
      // Details of the uploaded file
      console.log(this.state.selectedFile);
    
      // Request made to the backend api
      // Send formData object
      axios.post("api/upload", formData)
      .then(() => {
        this.setState({uploadComplete : true});
      });

    };
    
    // file upload is complete message
    fileData = () => {

      if (this.state.uploadComplete === false) {   
        if(this.state.uploading === false){
          return (
            <div></div>
          );
        }
        if(this.state.uploading === true){
          return (
            <div>
              <br></br><br></br><br></br>
              <p style={{ marginLeft: "-4%"}}>Wgrywanie pliku</p>
              <div style={{ marginLeft: "53%", marginTop: "-1.5%"}}>
                <Spinner name="circle" style={{ width: "small", height: "small" }} />
              </div>  
            </div>
          );
        }
      } else {
        return (
          <div>
            <br></br><br></br><br></br>
            <p style={{color: "#ff0000"}}>Plik został wgrany poprawnie :)</p>
            <br></br>
            <p>Jeżeli chcesz wyświetlić dane w bazie wciśnij poniższy przycisk</p>
            <br></br><br></br><br></br>
            <a href="/list"><button class="button-24">Lista użytkowników</button></a>
          </div>
        );
      }
    };
    
    render() {
    
      return (
        <div>
            <h1 className = "text-center">Formularz wgrania pliku XML</h1>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <p>Wgraj plik XML korzystając z przycisku "przeglądaj", a następnie wciśnij przycisk "wgraj":</p>
            <br></br><br></br>
            <div>
                <input type="file" id="file-input" onChange={this.changeFunction} />
                <label for="file-input" >Przeglądaj...</label>
                <span>
                  <span id="file-name">Nie wybrano pliku.</span>
                </span>
                <button class="button-23" onClick={this.onFileUpload}>
                  Wgraj
                </button>
            </div>
            {this.fileData()}
        </div>
      );
    }
}
 
export default Formpage;