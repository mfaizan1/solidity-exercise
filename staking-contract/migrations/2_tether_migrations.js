const Tether = artifacts.require("Tether");
const Reward = artifacts.require("Reward");
const Bank = artifacts.require("Bank");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  await deployer.deploy(Reward);
  const reward = await Reward.deployed();

  await deployer.deploy(Bank, tether.address, reward.address);
  const bank = await Bank.deployed();

  await reward.transfer(bank.address, "1000000000000000000000000");
  await tether.transfer(accounts[1], "100000000000000000000");
};
