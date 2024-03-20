function movingShift(s, shift) {
    function encodeChar(char, shift) {
        if (/[a-z]/.test(char)) {
            return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
        }
        else if (/[A-Z]/.test(char)) {
            return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        }
        return char;
    }

    let encoded = "";
    for (let i = 0; i < s.length; i++) {
        encoded += encodeChar(s[i], shift + i);
    }

    const partLength = Math.ceil(encoded.length / 5);
    const parts = [];
    let startIndex = 0;
    for (let i = 0; i < 5; i++) {
        const part = encoded.slice(startIndex, startIndex + partLength);
        parts.push(part);
        startIndex += part.length;
    }

    return parts;
}

const s = "I should have known that you would have a perfect answer for me!!!";
const shift = 1;
const result = movingShift(s, shift);
console.log(result);
