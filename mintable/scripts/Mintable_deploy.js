const hre = require("hardhat");

async function main() {
 
  const Mintable = await hre.ethers.getContractFactory("Mintable");
  const mintable = await Mintable.deploy();

  await mintable.deployed();

  console.log("Mintable deployed to:", mintable.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // 0xCcfD0F4A13b2b1c296D5cbad82B8e046081aA1BA