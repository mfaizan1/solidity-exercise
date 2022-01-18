pragma solidity ^0.8.1;

import "./Reward.sol";
import "./Tether.sol";

contract Bank {
    string public name = "Decentralized Bank";
    address public owner;
    Tether public tether;
    Reward public reward;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public isStaking;
    mapping(address => bool) public hasStaked;
    address[] public stakers;

    constructor(Tether _thr, Reward _rwd) {
        tether = _thr;
        reward = _rwd;
        owner = msg.sender;
    }

    function depositTokens(uint256 amount) public {
        require(amount > 0, "cannot no deposit 0 tokens");
        tether.transferFrom(msg.sender, address(this), amount);

        stakingBalance[msg.sender] += amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function issueTokens() public {
        require(msg.sender == owner, "caller must be admin");
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9;
            if (balance > 0) {
                reward.transfer(recipient, balance);
            }
        }
    }

    function unstake() public {
        require(
            stakingBalance[msg.sender] > 0,
            "you dont have any balance to unstake"
        );

        tether.transfer(msg.sender, stakingBalance[msg.sender]);
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }
}
