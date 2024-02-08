const ethers = require("ethers")

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
]

const bytecode = '60806040526000600260146101000a81548160ff0219169083151502179055506040516105ab3803806105ab8339818101604052810190610040919061016c565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050506101ac565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006101398261010e565b9050919050565b6101498161012e565b811461015457600080fd5b50565b60008151905061016681610140565b92915050565b6000806040838503121561018357610182610109565b5b600061019185828601610157565b92505060206101a285828601610157565b9150509250929050565b6103f0806101bb6000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806312424e3f1461005c57806328f371aa1461006657806338af3eed14610084578063c7c4ff46146100a2578063fe25e00a146100c0575b600080fd5b6100646100de565b005b61006e61022b565b60405161007b91906102c9565b60405180910390f35b61008c61023e565b6040516100999190610325565b60405180910390f35b6100aa610264565b6040516100b79190610325565b60405180910390f35b6100c8610288565b6040516100d59190610325565b60405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461013857600080fd5b60004790506000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff164760405161018590610371565b60006040518083038185875af1925050503d80600081146101c2576040519150601f19603f3d011682016040523d82523d6000602084013e6101c7565b606091505b50509050806101d557600080fd5b6001600260146101000a81548160ff0219169083151502179055507f3ad93af63cb7967b23e4fb500b7d7d28b07516325dcf341f88bebf959d82c1cb8260405161021f919061039f565b60405180910390a15050565b600260149054906101000a900460ff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008115159050919050565b6102c3816102ae565b82525050565b60006020820190506102de60008301846102ba565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061030f826102e4565b9050919050565b61031f81610304565b82525050565b600060208201905061033a6000830184610316565b92915050565b600081905092915050565b50565b600061035b600083610340565b91506103668261034b565b600082019050919050565b600061037c8261034e565b9150819050919050565b6000819050919050565b61039981610386565b82525050565b60006020820190506103b46000830184610390565b9291505056fea26469706673582212202c08a9376d1e55deab1a46794e988b10b97553b6dc2d8c283a6cce620920dc8d64736f6c63430008130033';

const arbiterAddress = '0xA3aB2B30562f93bec585Af41dd407DA2C653a3D4';
const beneficieryAddress = '0xB738041C532F3D5fed2746726EE873b71fC8eABb';

const main = async() => {
    try{

        const provider = new ethers.JsonRpcProvider('HTTP://127.0.0.1:7545');
        const signer = await provider.getSigner();

        console.log('deployer -> ',signer);

        const getContract = new ethers.ContractFactory(abi, bytecode, signer);
        const contract = await getContract.deploy(arbiterAddress, beneficieryAddress, {value: ethers.parseEther('1')});

        console.log('contract address -> ',contract.target);
        process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

main();

// deployed address = 0x24a82b560D08199916922e53D9f6338D53529d6A