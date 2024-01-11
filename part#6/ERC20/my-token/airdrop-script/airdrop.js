const {address, abi, airdropAddress_1, airdropAddress_2} = require('../constant.js') 

// for checking 
console.log(address);
console.log(abi.abi);

const amount = hre.ethers.parseEther('2');

const main = async() => {
    try{
        const [signer] = await hre.ethers.getSigners();
        const contract = new hre.ethers.Contract(address, abi.abi, signer);
        console.log(':::::::',contract);

        // airdroping 1
        const tx_1 = await contract.transfer(airdropAddress_1, amount);
        const rec_1 = await tx_1.wait();
        console.log(rec_1);

        // airdroping 2
        const tx_2 = await contract.transfer(airdropAddress_2, amount);
        const rec_2 = await tx_2.wait();
        console.log(rec_2);

        process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
    }   
}

const runMain = async() => {
    await main();
}

runMain();