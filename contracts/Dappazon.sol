// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon {
    // string public name ;
    address public owner;

    constructor() {
        // name = "Dappazon"; 
        owner = msg.sender;
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

    mapping(uint256 => Item) public items;

    event List(string name, uint256 cost, uint256 quantity);


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
    public
    {

        //Create Item Struct
        Item memory item = Item(_id, _name, _category, _image, _cost, _rating, _stocks);


        //Saving Item struct to blockchain
        items[_id] = item;

        //Emit an Event
        emit List(_name, _cost, _stocks);

    }


    //Buy Product


    //Withdraw Fund
}
