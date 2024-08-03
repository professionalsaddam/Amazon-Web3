import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Dappazon from './abis/Dappazon.json'

// Config
import config from './config.json'

function App() {

  const [account, setAccount] = useState(null);

  const [provider, setProvider] = useState(null);
  const [network, setNetwork] = useState(null);
  const [dappazonContract, setDappazonContract] = useState(null);

  const [electronics,setElectronics] = useState(null);
  const [clothings,setClothings] = useState(null);
  const [toys,setToys] = useState(null);

  const [currentItem, setCurrentItem] = useState(null);
  const [toggle, setToggle] = useState(false);
  
  const loadBlockchainData = async () => {

    //Loading Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // console.log(provider);
    setProvider(provider);
    
    //Getting Network Details
    const network = await provider.getNetwork()
    // console.log(network);
    setNetwork(network);

    //Connect to Dappazon contract
    const dappazon = new ethers.Contract(config[network.chainId].dappazon.address, Dappazon, provider)
    // console.log(dappazon);
    setDappazonContract(dappazon);

    const items = []

    //Fetching the list of items from the contract
    for(let i=0; i< 9; i++)
    {
      const item = await dappazon.items(i+1);
      items.push(item);
    }

    console.log(items);

    //Filtering Products Based on their category
    let electronics = items.filter((item) => item.category === "electronics");
    let clothing = items.filter((item) => item.category === "clothing");
    let toys = items.filter((item) => item.category === "toys");

    setElectronics(electronics);
    setClothings(clothing);
    setToys(toys);

  }

  const togglePop = (item) => {
    setCurrentItem(item)
    toggle ? setToggle(false) : setToggle(true);
    // console.log(item);
  }

  useEffect(() => {
      loadBlockchainData();
  }, [])
  


  return (
    <div>

      <Navigation account={account} setAccount={setAccount} />
      
      <h2>Dappazon Best Seller's</h2>

      {
        electronics && clothings && toys && (
          <>
            <Section title={"Clothing & Jewelry"} items={clothings} togglePop={togglePop} />
            <Section title={"Electronics & Gadgets"} items={electronics} togglePop={togglePop} />
            <Section title={"Toys & Gaming"} items={toys} togglePop={togglePop} />
          </>
        )

      }

      {
        toggle && (
          <Product item={currentItem} provider={provider} account={account} dappazon={dappazonContract} togglePop={togglePop}  />
        )
      }

    </div>
  );
}

export default App;
