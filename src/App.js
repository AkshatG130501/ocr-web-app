import react, { useState } from "react";
import './App.css';
import Tesseract from "tesseract.js";


const App = () => {

  const [isLoading,setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleClick = () => {
    setIsLoading(true);
    Tesseract.recognize(image, "tha+eng", {
      logger: (m) => {
        console.log(m);
        if (m.status === "recognizing text") {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .then(({ data: { text } }) => {
        const apiKey = 'AIzaSyCM6UHNOq8xzfDWwJEoeVG1Ps8GIbnV_Tg';
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        const params = {
          q: text,
          source: 'th',
          target: 'en',
        };
  
        // Perform translation request
        fetch(`${url}&q=${encodeURIComponent(params.q)}&source=${params.source}&target=${params.target}`, {
          method: 'POST',
        })
          .then((response) => response.json())
          .then((translatedData) => {
            const translatedText = translatedData.data.translations[0].translatedText;
            setText(translatedText);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error translating text:', error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error recognizing text:', error);
        setIsLoading(false);
      });
  };
  
  

  return (
    <div className="container" style={{height:"100vh"}}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
          {!isLoading && <h1 className="mt-5 mb-4">Image To Text</h1>}

          {/* Form */}
          {
            !isLoading && !text && (
              <>
                <input type="file" className="form-control mt-5" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
                <input type="button" className="form-control btn btn-primary mt-4" value="convert" onClick={handleClick}/>
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
