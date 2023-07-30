const hre = require("hardhat");
const ethers = hre.ethers;
const chai = require("chai");
const { expect } = chai;

describe.only("ReferenceType: ", function () {
  const str = (arg) => {
    return arg.toString()
  }
  beforeEach("deploy", async function () {
    [account1] = await ethers.getSigners();

    this.EthersProvider = new ethers.providers.Web3Provider(network.provider);

    this.ReferenceTypeContract;

    const ReferenceTypeFactory = await ethers.getContractFactory(
      "ReferenceTypes"
    );

    this.ReferenceTypeContract = await ReferenceTypeFactory.deploy();
    await this.ReferenceTypeContract.deployed();
  });

  it.only("Test 1", async function () {
    let list = await this.ReferenceTypeContract.getList();
    console.log("list", list);
    await this.ReferenceTypeContract.updateList();

    let list1 = await this.ReferenceTypeContract.getList();
    console.log("list1", list1);

    let updList2 = await this.ReferenceTypeContract.updateList2();
    console.log(updList2);
    let list2 = await this.ReferenceTypeContract.getList();
    console.log("list2", list2);

    let nlist = await this.ReferenceTypeContract.receiveListAndUpdate([20, 30, 30]);
    console.log(nlist);
    let list3 = await this.ReferenceTypeContract.getList();
    console.log("list3", list3);

    let upd3 = await this.ReferenceTypeContract.updateList3();
    console.log("upd3", upd3);

    let list4 = await this.ReferenceTypeContract.getList();
    console.log("list4", list4);

    let upd4 = await this.ReferenceTypeContract.updateList4();
    console.log("upd4", upd4);

    let list5 = await this.ReferenceTypeContract.getList();
    console.log("list5", list5);

    let upd5 = await this.ReferenceTypeContract.updateList5();
    console.log("upd5", upd5);

    let list6 = await this.ReferenceTypeContract.getList();
    console.log("list6", list6)

    await this.ReferenceTypeContract.updateStruct();
    let getStruct1 = await this.ReferenceTypeContract.getAgeandName();
    console.log("getStruct1", getStruct1);

    await this.ReferenceTypeContract.updateStruct2();
    let getStruct2 = await this.ReferenceTypeContract.getAgeandName();
    console.log("getStruct2", getStruct2);
    
  });

  it("Value Types", async function () {
    let age = await this.ReferenceTypeContract.age();
    console.log("one", str(age));
    let c2 = await this.ReferenceTypeContract.count();
    console.log("one", str(c2));
    await this.ReferenceTypeContract.updateAge();
    let age1 = await this.ReferenceTypeContract.age();
    console.log("one", str(age1));
    let list1 = await this.ReferenceTypeContract.updateAge2();
    console.log("list1", str(list1));

    let list2 = await this.ReferenceTypeContract.receiveAgeAndUpdate(10);
    console.log("list1", str(list2));

    let list3 = await this.ReferenceTypeContract.updateCount();

        let agen = await this.ReferenceTypeContract.age();
    console.log("one", str(agen));
    let count1 = await this.ReferenceTypeContract.count();
    console.log("one", str(count1));
    
  });
});
