import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {


    const connectHandler = async () => {
        const accounts = await window.ethereum.request({'method' : 'eth_requestAccounts'});
        const account = ethers.utils.getAddress(accounts[0]);
        console.log(account);
        setAccount(account)
    }

    return (
        <nav>
            {/* BRAND */}
            <div className='nav__brand'>
                <h1>Dappazon</h1>
            </div>

            {/* SEARCH */}
            <input className='nav__search' type='text' />

            {/* CONNECT */}
            { account ?
                <button className='nav__connect'>
                    {account.slice(0,6) + "..." + account.slice(32,36) }
                </button>
            :
                <button 
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>

            }

            {/* LINKS */}
            <ul className='nav__links'>
                <li><a href='#Clothing & Jewellery'>Clothing & Jewellery</a></li>
                <li><a href='#Electronics & Gadgets'>Electronics & Gadgets</a></li>
                <li><a href='#Toys & Gaming'>Toys & Gaming</a></li>

            </ul>




        </nav>
    );
}

export default Navigation;