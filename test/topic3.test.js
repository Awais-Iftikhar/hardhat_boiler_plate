
const chai = require("chai");
const { expect } = chai;

describe("abstract and interface: ", function () {
  beforeEach("deploy", async function () {
    [account1,addr1] = await ethers.getSigners();
    this.reciever = addr1
    console.log(this.reciever.address)
    // this.EthersProvider = new ethers.providers.Web3Provider(network.provider)
      const helloContract = await ethers.getContractFactory(
        "Hello"
      );
      this.helloContractVariable = await helloContract.deploy("awaiskhan",20);
    await this.helloContractVariable.deployed();
    console.log(this.helloContractVariable.address);
    
    const StateVariableFactory = await ethers.getContractFactory(
      "ExternalCaller"
    );

    this.deployedStateVariable = await StateVariableFactory.deploy(this.helloContractVariable.address);
    await this.deployedStateVariable.deployed();
  });

  it("Should Get the values from state variable", async function () {
    // await this.deployedStateVariable.makeMeSayHello2();
    // console.log(await this.deployedStateVariable.makeMeSayHello2())
    // console.log((await this.deployedStateVariable.age()).toString())
    // console.log((await this.deployedStateVariable.setAge(12)))
    console.log((await this.deployedStateVariable.getAgeandName()))

    
  });
 
});
