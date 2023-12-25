import react, { useState } from "react";
import './App.css';

const App = () => {

  const [isLoading,setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  return (
    <div className="container" style={{height:"100vh"}}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
          {!isLoading && <h1 className="mt-5 mb-4">Image To Text</h1>}

          {/* Form */}
          {
            !isLoading && !text && (
              <>
                <input type="file" className="form-control mt-5" onChange={(e) => setImage(URL.createObjectURL(e.value.files[0]))} />
                <input type="button" className="form-control btn btn-primary mt-4" value="convert"/>
              </>
            )
          }

          {/* Progress Bar */}

          {
            isLoading && (
              <>
                <p className="text-center mt-5 ">Converting :- {progress}% </p>
              </>
            )
          }

          {/* Text-Area */}

          {
            !isLoading && text && (
              <textarea className="form-control" rows="15" value={text} onChange={(e)=>setText(e.target.value)}></textarea>
            )
          }

        </div>
      </div>
    </div>
  );
}

export default App;
