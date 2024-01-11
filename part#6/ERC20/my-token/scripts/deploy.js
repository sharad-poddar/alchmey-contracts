async function main(){
    try{
        const [deployer] = await hre.ethers.getSigners();
        console.log('contract deployed by ',deployer.address);
        console.log(deployer);
        const weiAmount = await hre.ethers.provider.getBalance(deployer.address);
        console.log(hre.ethers.formatEther(weiAmount));

        const getContract = await hre.ethers.getContractFactory('SHA');
        const contract = await getContract.deploy('SHA','SHA');
        
        console.log("Token address:", contract.target);
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

// contract deployed at: '0x675ACd0d37880397CE741219b12632BaA0FEEDbE';
// npx hardhat run scripts/deploy.js --network sepolia
// airdrop -> simply sending the tokens
