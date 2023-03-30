import Button from 'react-bootstrap/Button';
import { jsPDF } from 'jspdf'

export const DownloadGraphs = (beforeJourneyId, currentEmissionId, currentJourneyId, predictEmissionsId) => {

    const pdfOptions = {
        orientation: 'p',
        unit: 'px',
        format: 'a4',
        hotfixes: ["px_scaling"]
    }


    function addImage(pdf, canvas, startY) {
    }

    /**
     * Returns copy of canvas which is scaled to be as large as possible within the provided constraints whilst
     * maintaining the original image aspect ratio.
     * @param {*} image The image
     * @param {*} maxWidth The max width
     * @param {*} maxHeight The max height
     * @returns The scaled image
     */
    function scaleImage(image, maxWidth, maxHeight) {
        // Scales image so aspect ratio is maintained but image is as large as possible
        const maxAspect = maxWidth / maxHeight;
        const imageAspect = image.width / image.height;
        const scaleWidth = maxWidth / image.width;
        const scaleHeight = maxHeight / image.height;
        //Calculates scale factor
        let scale = null
        if (imageAspect > maxAspect) {
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
        return newCanvas
    }

    async function downloadGraphs() {
        let pdf = new jsPDF(pdfOptions);
        // Calculates dimensions 

        pdf.save('Carbon Savings.pdf');
    }

    return (
        <Button onClick={downloadGraphs}>Save</Button>
    )
}