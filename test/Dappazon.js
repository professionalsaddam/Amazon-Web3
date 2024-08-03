const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappazon", () => {

  let dappazon;
  let deployer,buyer


  beforeEach(async () => {


    //Setup Accounts
    // console.log(await ethers.getSigners())
    [deployer,buyer] = await ethers.getSigners();

    //Deploy Contract
    const Dappazon = await ethers.getContractFactory("Dappazon");
    dappazon = await Dappazon.deploy();
  })

  describe("Deployment", () => {

    // it("Has a name", async () => {
  
    //   const name = await dappazon.name()
    //   expect(name).to.be.equal("Dappazon");
    // })

    it("Sets the onwer",async () => {
      const owner = await dappazon.owner();
      expect(owner).to.equal(deployer.address);
    })



  })

  

})
