const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappazon", () => {

  let dappazon;

  beforeEach(async () => {
    const Dappazon = await ethers.getContractFactory("Dappazon");
    dappazon = await Dappazon.deploy();
  })

  describe("Deployment", () => {

    it("Has a name", async () => {
  
      const name = await dappazon.name()
      expect(name).to.be.equal("Dappazon");
    })
    
  })

  

})
