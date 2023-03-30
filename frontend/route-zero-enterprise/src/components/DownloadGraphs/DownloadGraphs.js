import Button from 'react-bootstrap/Button';
import { jsPDF } from 'jspdf'

export const DownloadGraphs = () => {

    const pdfOptions = {
        orientation: 'p',
        unit: 'px',
        format: 'a4',
        hotfixes: ["px_scaling"]
    }
    

    function addImage(pdf, canvas, startY) {
        // Gets dimensions of pdf page
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Scales image so aspect ratio is maintained but image is as large as possible
        const pageAspect = pageWidth / pageHeight;
        const canvasAspect = canvas.width / canvas.height;
        const scaleWidth = pageWidth / canvas.width;
        const scaleHeight = pageHeight / canvas.height;
        //Calculates scale factor
        let scale = null
        if(canvasAspect > pageAspect) {
            scale = scaleWidth
        } else {
            scale = scaleHeight
        }
        const newWidth = Math.floor(canvas.width * scale);
        const newHeight = Math.floor(canvas.height * scale);
        // Resizes image by creating new canvas with same content
        const newCanvas = document.createElement('canvas');
        newCanvas.width = newWidth;
        newCanvas.height = newHeight;
        newCanvas.getContext('2d').drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight)
        // Centers image horizontally
        const startX = Math.floor((newWidth - pageWidth) / 2.0);
        const image = newCanvas.toDataURL("image/png");
        pdf.addImage(image, 'PNG', startX, startY, image.width, image.height);
    }

    function scaleImage(image, maxWidth, maxHeight) {
        // Scales image so aspect ratio is maintained but image is as large as possible
        const maxAspect = maxWidth / maxHeight;
        const imageAspect = image.width / image.height;
        const scaleWidth = maxWidth / image.width;
        const scaleHeight = maxHeight / image.height;
        //Calculates scale factor
        let scale = null
        if(imageAspect > maxAspect) {
            scale = scaleWidth
        } else {
            scale = scaleHeight
        }
        const newWidth = Math.floor(image.width * scale);
        const newHeight = Math.floor(image.height * scale);
        // Resizes image by creating new canvas with same content
        const newCanvas = document.createElement('canvas');
        newCanvas.width = newWidth;
        newCanvas.height = newHeight;
        newCanvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height, 0, 0, newWidth, newHeight)
    }

    async function downloadGraphs() {
        let pdf = new jsPDF(pdfOptions);
        
        
        pdf.save('Carbon Savings.pdf');
    }

    return (
        <Button onClick={downloadGraphs}>Save</Button>
    )
}