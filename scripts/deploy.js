
async function main() {
    const [deployer] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Hello");
    const token = await Token.deploy("awais",23);
    console.log("Token address:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });