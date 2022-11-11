import React, {useEffect, useState} from "react";
import { Button } from 'react-bootstrap';

export const UploadButton = (props) => {

    const [fileInput, setFileInput] = useState(null); //for handling file input 
    const [fileName , setFileName ] = useState(null); //for displaying the file name

    useEffect(() => {
        setFileInput(document.getElementById("file-input"));
    }, []);

    const handleClicked = () => { //opens file explorer
        fileInput.click();
    }

    const handleUpload = () => { //sets the current file via hoisted setter
        let f = fileInput.files[0];
        if(f){
            setFileName(f.name);
            console.log(f);
            props['setFile'](f);
            // let data = new FormData();
            // data.append(f.name, f);
            // console.log(data.get(f.name));
        }
    }

    return (
        <>
            <input id="file-input" onChange={handleUpload} className="d-none" type="file" />
            <Button className={`btn-${props['validity'] === 'valid' ? "success" : props['validity'] === 'invalid_extension' ? "danger" : "primary"}`}onClick={handleClicked}>{fileName ? fileName : "Upload" }</Button>
        </>
    );
}