export const readText = (file, action) => { //action is our code to run on the event that the file reader is done

    const reader = new FileReader();

    reader.onload = action;
    reader.readAsText(file);
}