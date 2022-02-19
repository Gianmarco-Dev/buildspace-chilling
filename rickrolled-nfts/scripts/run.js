
const main = async () => {

    // This will compile our contract and generate the necessary files 
    // we need to work with our contract under the artifacts directory.
    const nftContractFactory = await hre.ethers.getContractFactory('MyEpicNFT');

    /** Line 16: Hardhat will create a local Ethereum network for us, just for this contract. 
     * Then, after the script completes it'll destroy that local network. 
     * So, every time I run the contract, it'll be a fresh blockchain. 
     * Whats the point? 
     * It's kinda like refreshing my local server every time so I always start from a clean slate
     * which makes it easy to debug errors.
    */

    const nftContract = await nftContractFactory.deploy();

    // We'll wait until the contract is officially mined and deployed to the local blockchain.
    // Constructor runs when the contract is fully deployed

    await nftContract.deployed();

    /** Once it's deployed - nftContract.address - will basically give us the address of the deployed contract. 
     * This address is how we can actually find our contract on the blockchain */
    console.log("Contract deployed to: ", nftContract.address);
    
    // Call the function
    let txn = await nftContract.makeAnEpicNFT()
    // Wait for it to be mined
    await txn.wait()

};



const runMain = async () => {
    try  {
        await main();
        process.exit(0);

    }   catch (error) {
        console.log(error);
        process.exit(1);

    }
};

runMain();