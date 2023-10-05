const getStringUntilCharacter = (inputString, character) => {
    const indexOfCharacter = inputString.indexOf(character);
    if (indexOfCharacter !== -1) {
        return inputString.slice(0, indexOfCharacter);
    }
    return inputString; // Return the whole string if the character is not found
}
module.exports = getStringUntilCharacter