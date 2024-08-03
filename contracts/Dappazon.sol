// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon {
    // string public name ;
    address public owner;

    constructor() {
        // name = "Dappazon"; 
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can access this");
        _;
    }

    struct Item{
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order{
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256) public  ordersCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    event List(string name, uint256 cost, uint256 quantity);
    event Buy(address buyer, uint256 orderId, uint256 itemId); 


    //List products

    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stocks
    )
    public onlyOwner
    {

        //Create Item Struct
        Item memory item = Item(_id, _name, _category, _image, _cost, _rating, _stocks);


        //Saving Item struct to blockchain
        items[_id] = item;

        //Emit an Event
        emit List(_name, _cost, _stocks);

    }


    //Buy Product
    
    function buy(uint256 _id) public payable{

        //Fetching Order Item
        Item memory item = items[_id];

        //Validation 1 - Out of Stock
        require(item.stock > 0, "Out of Stocks");

        //Validation 2 - Insufficient Amount
        require(msg.value >= item.cost, "Insufficient Amount");

        Order memory order = Order(block.timestamp, item);

        //Next Order ID
        ordersCount[msg.sender]++; //<-- Order ID

        //Assigning the order to new Order ID
        orders[msg.sender][ordersCount[msg.sender]] = order;

        //Subtract Stocks
        items[_id].stock = item.stock - 1;


        //Emitting Buy Event

        emit Buy(msg.sender, ordersCount[msg.sender], item.id);


    }


    //Withdraw Fund
    function withdraw() public onlyOwner(){
        (bool success,) = owner.call{value : address(this).balance}("");
        require(success);
    }   
}
