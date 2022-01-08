// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;



contract Coin {
    address minter;
    mapping(address => uint256) public balances;
    event Sent(address _from , address _to, uint256 _amount);

    constructor(){
        minter = msg.sender;
    }

    function mint(address receiver, uint256 amount) public {
        require(msg.sender  == minter, "only owner can mint new coins");
        balances[receiver] = balances[receiver]+amount;
    }

    error insufficientBalance(uint256 requested, uint256 available);
    function send(address to, uint256 amount) public{
        if(amount >= balances[msg.sender]){
            revert insufficientBalance({
                requested: amount,
                available: balances[msg.sender]
            });
        }
        require(balances[msg.sender] >= amount, "not enough balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Sent(msg.sender, to, amount);
    }

}
