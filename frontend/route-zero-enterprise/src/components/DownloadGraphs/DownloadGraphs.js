import Button from 'react-bootstrap/Button';
import { jsPDF } from 'jspdf'

import {beforeJourneyId, currentEmissionId, predictedJourneyId, predictEmissionsId} from '../../pages/View/View'

export const DownloadGraphs = () => {

    const pdfOptions = {
        orientation: 'p',
        unit: 'px',
        format: 'a4',
        hotfixes: ["px_scaling"]
    }

    function addImages(pdf, img1, img2, startY, width, height) {
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        const imgWidth = Math.floor(width / 2.0)
        const imgHeight = Math.floor(height / 2.0)
        const scaled1 = scaleImage(img1, imgWidth, imgHeight)
        const scaled2 = scaleImage(img2, imgWidth, imgHeight)
        const totalWidth = scaled1.width + scaled2.width
        // Horizontally centres images
        const pdfStartX = Math.floor((pdfWidth - totalWidth) / 2.0)
        // Adds images
        pdf.addImage(scaled1, 'PNG', pdfStartX, startY, scaled1.width, scaled1.height)
        pdf.addImage(scaled2, 'PNG', pdfStartX + scaled1.width, startY, scaled1.width, scaled1.height)
        return startY + Math.max(scaled1.height, scaled2.height)
    }

    /**
     * Returns copy of canvas which is scaled to be as large as possible within the provided constraints whilst
     * maintaining the original image aspect ratio. Note the provided image canvas is not altered
     * @param {*} image The image
     * @param {*} maxWidth The max width
     * @param {*} maxHeight The max height
     * @returns The new scaled image
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
        let startY = 0;
        startY = addImages(pdf, document.getElementById(beforeJourneyId), document.getElementById(currentEmissionId), startY,
            pdf.internal.pageSize.getWidth(), Math.floor(pdf.internal.pageSize.getHeight() / 2.0))
        startY = addImages(pdf, document.getElementById(predictedJourneyId), document.getElementById(predictEmissionsId), startY,
            pdf.internal.pageSize.getWidth(), Math.floor(pdf.internal.pageSize.getHeight() / 2.0))

        pdf.save('Carbon Savings.pdf');
    }

    return (
        <Button onClick={downloadGraphs}>Save</Button>
    )
}