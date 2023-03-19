import React from 'react';
import Button from 'react-bootstrap/Button';

export const DownloadButton = (props) => {
  
    const downloadTxtFile = () => {
        // text content
    const texts = ["line 1", "line 2", "line 3"]
    // file object
    const file = new Blob(texts, {type: 'text/plain'});
    // anchor link
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "100ideas-" + Date.now() + ".txt";
    // simulate link click
    document.body.appendChild(element);
    // Required for this to work in FireFox
    element.click();
    }

  return (
    <>
      <Button variant="primary" value="download" onClick={downloadTxtFile}>Download</Button>{' '}
    </>
  )
}
