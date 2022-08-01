const { expect } = require("chai");

describe("Token Contract", function () {
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    let Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2] = await ethers.getSigners();
    this.contract = await Token.deploy();
  });

  describe("Deployment", async function () {
    
    it("Should set the right owner", async function () {
      expect(await this.contract.owner()).to.equal(owner.address);
    });
    

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await this.contract.balanceOf(owner.address);
      expect(await this.contract.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should trasfer tokens between accounts", async function () {
      //owner account to addr1.address
      await this.contract.transfer(addr1.address, 5);
      const addr1Balance = await this.contract.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(5);

      await this.contract.connect(addr1).transfer(addr2.address, 5);
      const addr2Balance = await this.contract.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(5);
      expect(await this.contract.balanceOf(owner.address)).to.equal(5);
      expect(await this.contract.balanceOf(addr1.address)).to.equal(0);
      expect(await this.contract.balanceOf(addr2.address)).to.equal(5);

    });

    it("Should fail if sender does not have enough tokens", async function () {
      const initialOwnerBalance = await this.contract.balanceOf(owner.address); //10

      await expect(
         this.contract.connect(addr1).transfer(owner.address, 1) //initially - 0 tokens addr1
      ).to.be.revertedWith('Not enough tokens');
      expect(await this.contract.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await this.contract.balanceOf(owner.address);
      await this.contract.transfer(addr1.address, 5);
      await this.contract.transfer(addr2.address, 5);
      const addr1Balance = await this.contract.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(5);
      const addr2Balance = await this.contract.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(5);
      const finalOwnerBalance = await this.contract.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(0);
    });
  });
});