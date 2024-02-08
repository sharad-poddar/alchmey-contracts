///@dev testing contract
const ethers = require('ethers');

const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_arbiter",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_beneficiary",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Approved",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "arbiter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "beneficiary",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositor",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isApproved",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


const contractAddress = '0x77C6Cb8C05B1e331cFAC9a295E619fa561fe348A';
const arbiterAddress = '0xA3aB2B30562f93bec585Af41dd407DA2C653a3D4';
const beneficieryAddress = '0xB738041C532F3D5fed2746726EE873b71fC8eABb';


const main = async() => {
    try{
        const provider = await new ethers.JsonRpcProvider('HTTP://127.0.0.1:7545');
        const signer = await provider.getSigner();
        console.log('signer -> ',signer.address);

        // signer used to read and write in contract
        // provider only used to read contract
        const contract = await new ethers.Contract(contractAddress, abi, signer);
        console.log(contract);

        const tx = await contract.connect(arbiterAddress).approve();
        const rec = await tx.wait(1);
        console.log('rec -> ',rec);

        process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

main();