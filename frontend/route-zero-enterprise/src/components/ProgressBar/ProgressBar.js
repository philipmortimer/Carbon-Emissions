import React, { useEffect, useState} from "react";
import './ProgressBar.scss';

export const ProgressBar = ({loading}) => {

    const [progress, setProgress] = useState(0);


    useEffect(() => {
        setTimeout(() => {
            (progress === 100 ? setProgress(0) : setProgress(progress + 10));
        }, 90);
      }, [progress]);


    return(
        <>
            {(loading==='loading') ? 
                <div className="bar">
                    <div className="progress" style={{width:`${progress}%`}}>
                        <p>loading ...</p>
                    </div>
                </div>
                : <div></div>
            }
        </>
    )
}

