import React, { useState } from "react";
import './App.css';
import Tesseract from "tesseract.js";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const extractDetails = (extractedText) => {
    const details = {
      name: '',
      lastName: '',
      identificationNumber: '',
      issueDate: '',
      expiryDate: '',
      birthDate: '',
    };

    const nameRegex = /Name of Mr\. (.+?) o- o}/;
    const lastNameRegex = /LastName (.+?) - i =/;
    const idRegex = /Thai National ID Card (.+?) Identification Number =/;
    const issueDateRegex = /Date of Issue\. (.+?) S\.B\. Rai/;
    const expiryDateRegex = /Jan\. 2573 S\.B\. Rai = Date of Issue\. Date of 5 ต/;
    const birthDateRegex = /Date of Birth (.+?) 1 - = 2300/;

    details.name = extractedText.match(nameRegex)?.[1]?.trim() || '';
    details.lastName = extractedText.match(lastNameRegex)?.[1]?.trim() || '';
    details.identificationNumber = extractedText.match(idRegex)?.[1]?.trim() || '';
    details.issueDate = extractedText.match(issueDateRegex)?.[1]?.trim() || '';
    details.expiryDate = extractedText.match(expiryDateRegex)?.[1]?.trim() || '';
    details.birthDate = extractedText.match(birthDateRegex)?.[1]?.trim() || '';

    return details;
  };

  const handleClick = () => {
    setIsLoading(true);
    Tesseract.recognize(image, "tha", {
      logger: (m) => {
        console.log(m);
        if (m.status === "recognizing text") {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .then(({ data: { text } }) => {
        // Translated text obtained from OCR
        const translatedText = text;

        // Extract specific details
        const extractedDetails = extractDetails(translatedText);

        // Set state for extracted details
        setText(
          `Name: ${extractedDetails.name}\n` +
          `Last Name: ${extractedDetails.lastName}\n` +
          `Identification Number: ${extractedDetails.identificationNumber}\n` +
          `Issue Date: ${extractedDetails.issueDate}\n` +
          `Expiry Date: ${extractedDetails.expiryDate}\n` +
          `Birth Date: ${extractedDetails.birthDate}`
        );

        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error recognizing text:', error);
        setIsLoading(false);
      });
  };

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
          {!isLoading && <h1 className="mt-5 mb-4">Image To Text</h1>}

          {/* Form */}
          {!isLoading && !text && (
            <>
              <input type="file" className="form-control mt-5" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
              <input type="button" className="form-control btn btn-primary mt-4" value="Convert" onClick={handleClick} />
            </>
          )}

          {/* Progress Bar */}
          {isLoading && (
            <p className="text-center mt-5">Converting: {progress}% </p>
          )}

          {/* Text-Area */}
          {!isLoading && text && (
            <textarea className="form-control" rows="15" value={text} onChange={(e) => setText(e.target.value)}></textarea>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
