import Button from 'react-bootstrap/Button';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';

import { beforeJourneyId, currentEmissionId, predictedJourneyId, predictEmissionsId } from '../../pages/View/View';
import { policySelectorId } from '../Policy/PolicySelector';

export const DownloadGraphs = () => {

    // Note that rough expected ratio of file is 450px tall and 794 px wide (multiplied by some scalar)
    // Increase format size to increase quality
    const pdfOptions = {
        orientation: 'l',
        unit: 'px',
        format: /*[450, 794]*/'a4',
        hotfixes: ["px_scaling"]
    }

    function addImages(pdf, img1, img2, startY, startX) {
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const availableWidth = pdfWidth - startX;

        const imgWidth = Math.floor(availableWidth / 2.0)
        const imgHeight = Math.floor(pdfHeight / 2.0);
        const scaled1 = scaleImage(img1, imgWidth, imgHeight)
        const scaled2 = scaleImage(img2, imgWidth, imgHeight)
        const totalWidth = scaled1.width + scaled2.width
        // Horizontally centres images
        const pdfStartX = Math.floor((availableWidth - totalWidth) / 2.0) + startX
        // Adds images
        pdf.addImage(scaled1.toDataURL("image/png"), 'PNG', pdfStartX, startY, scaled1.width, scaled1.height)
        pdf.addImage(scaled2.toDataURL("image/png"), 'PNG', pdfStartX + scaled1.width, startY, scaled2.width, scaled2.height)
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

    async function addPolicySelector(pdf) {
        const policyCanvas = await html2canvas(document.getElementById(policySelectorId));
        const maxWidth = Math.floor(pdf.internal.pageSize.getWidth() / 5.0)
        const maxHeight = pdf.internal.pageSize.getHeight()
        const policyScaled = scaleImage(policyCanvas, maxWidth, maxHeight)
        // Horizontally centers component
        const startX = Math.floor((maxWidth - policyScaled.width) / 2.0)
        pdf.addImage(policyScaled.toDataURL('image/png'), 'PNG', startX, 0, policyScaled.width, policyScaled.height)
        return {width: policyScaled.width + startX, height: policyScaled.height}
    }

    function addText(pdf, width, startY) {
        // Sets font and size
        pdf.setFont('helvetica', 'italic')
        pdf.setFontSize(10)
        // Adds text
        const text = "This is a PDF summary of your current transport carbon emissions" + 
            " and potential future carbon reductions. The policy selector shows various potential company" + 
            " travel policies and their resulting predicted changes in carbon emissions. The selected options" +
            " are represented in the graphs. The \"Journeys\" graph shows the current journeys that your company" +
            " is taking, broken down by transport type. The \"Current Emissions (KgC02)\" chart shows the carbon" +
            " emissions caused by your current travels, broken down by emissions for each type of transportation." +
            " The \"Average Predicted Journeys\" graph shows the predicted future journeys that can be taken in" + 
            " order to meet your travel needs whilst also being environmentally responsible. These predicted future" +
            " journeys are calculated by Route Zero. The \"Predicted Emissions (KgC02)\" chart shows the estimated" +
            " carbon emissions that would be produced by adopting the recommended new travel routes, broken down" +
            " by transport type. To access the full informatic, resubmit your travel data to the website used to" +
            " generate this report. Route Zero's website: https://routezero.world/"
        const txtHeight = pdf.getTextDimensions(text).h;
        const whiteSpace = Math.floor(width / 30.0);
        // Splits text into columns
        const noCols = 3.0;
        const textSplit = []
        let chars = 0;
        const charsInCol = Math.round(text.length / noCols)
        for (let i = 0; i < noCols - 1; i++) {
            textSplit.push(text.slice(chars, chars + charsInCol))
            chars += charsInCol
        }
        textSplit.push(text.slice(chars, text.length))
        // Adds columns
        let startX = whiteSpace
        const colWidth = Math.floor((width - ((noCols + 1) * whiteSpace)) / noCols)
        for (let i = 0; i < noCols; i++) {
            pdf.text(textSplit[i], startX, startY + txtHeight, {align: 'left',  maxWidth: colWidth})
            startX += colWidth + whiteSpace
        }
    }

    async function downloadGraphs() {
        let pdf = new jsPDF(pdfOptions);
        // Adds policy selector
        const policyDims = await addPolicySelector(pdf)

        // Adds graphs to document
        let startY = 0;
        startY = addImages(pdf, document.getElementById(beforeJourneyId), document.getElementById(currentEmissionId),
            startY, policyDims.width)
        startY = addImages(pdf, document.getElementById(predictedJourneyId), document.getElementById(predictEmissionsId),
            startY, policyDims.width)
        // Adds text
        addText(pdf, pdf.internal.pageSize.getWidth(), startY)
        pdf.save('Carbon Savings.pdf');
    }

    return (
        <Button onClick={downloadGraphs}>Save</Button>
    )
}