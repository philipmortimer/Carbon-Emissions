import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { View } from '../../pages/View/View'

describe("Policy Selector Aesthetics", async () => {
    test("Policy Selector Categories all appear in view page", () => {

    })
})


async function renderViewPage(apiResponse) {
    // Causes fetch method to return API response
    jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
        json: () => Promise.resolve(apiResponse)
        })
    )
    render(<App />)
    const btn = getUploadButton('Upload')
    // Uploads file
    await waitFor(() => {
        userEvent.click(btn)
        userEvent.upload(global.window.document.getElementById('file-input'), file)
    })
    // Restores fetch implementation
    global.fetch.mockRestore()
}