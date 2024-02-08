const {Keccak256} = require("ethereum-cryptography/keccak"); 
const {toHex, utf8ToBytes} = require("ethereum-cryptography/utils");


// indexed values can be efficiently search
function firstTopic(){
    const eventSignature = "Transfer(address, address, uint256)";
    const bytes = utf8ToBytes(eventSignature);
    const digest = keccak256(bytes);
    return toHex(digest); 
}

function secondTopic(){
    const address = "28c6c06298d514db089934071355e5743bf21d60";
    // making an address of 32 bytes, know it is of 20 bytes
    return "0".repeat(24) + address;

}

module.exports = { firstTopic, secondTopic };