
function basicFun(operationName) {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);
    if (isNaN(value))
        return alert("Enter a valid number.");

    let result;

    switch (operationName) {
        case 'absolute':
            result = Math.abs(value);
            break;

        case 'floor':
            result = Math.floor(value);
            break;

        case 'ceil':
            result = Math.ceil(value);
            break;

        case 'random':
            result = Math.random(value);
            break;

        case 'toDMS':
            result = convertToDMS();
            break;

        // case 'toDEG':
        //     result = convertToDecimalDegrees();
        //     break;
    }

    input.value = result;
    localStorage.setItem('calculations', result);
    console.log(result);
}