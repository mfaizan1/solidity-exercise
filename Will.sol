// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Will {
      address owner;
      uint fortune;
      bool deceased = false;

      constructor() payable {
          owner = msg.sender;
          fortune = msg.value;
      } 

      modifier isOwner() {
          require(msg.sender == owner);
          _;
      }
      modifier isDeceased() {
          require(deceased == true);
          _;
      }
    // list of family address
      address payable[] familyAddress;
    // map of address with inheritance
      mapping(address => uint) inheritance;
    
    function setInheritance (address payable wallet, uint amount) public isOwner {
        familyAddress.push(wallet);
        inheritance[wallet] = amount;
    }

    function payout () private isDeceased  {
        for(uint i = 0; i< familyAddress.length; i++){
            familyAddress[i].transfer(inheritance[familyAddress[i]]);
        }
    }

    function setDeceased() public isOwner {
        deceased = true;
        payout();
    }
}
