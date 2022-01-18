const { assert } = require('chai');

const Tether = artifacts.require('Tether');
const Reward = artifacts.require('Reward');
const Bank = artifacts.require('Bank');

require('chai').use(require('chai-as-promised')).should();

contract('Bank', ([owner, investor]) => {
  let tether;
  let reward;
  let bank;

  const tokensToWei = (tokens) => web3.utils.toWei(tokens, 'ether');
  before(async () => {
    tether = await Tether.new();
    reward = await Reward.new();
    bank = await Bank.new(tether.address, reward.address);

    await reward.transfer(bank.address, tokensToWei('1000000'), {
      from: owner,
    });

    await tether.transfer(investor, tokensToWei('100'), { from: owner });
  });

  describe('Mock tether deployment', async () => {
    it('matches name successfully', async () => {
      const name = await tether.name();
      assert.equal(name, 'Tether');
    });
  });

  describe('Mock Reward deployment', async () => {
    it('matches name successfully', async () => {
      const name = await reward.name();
      assert.equal(name, 'Reward');
    });
  });

  describe('Mock Bank deployment', async () => {
    it('matches name successfully', async () => {
      const name = await bank.name();
      assert.equal(name, 'Decentralized Bank');
    });

    it('has all the reward tokens', async () => {
      const tokens = await reward.balanceOf(bank.address);
      assert.equal(tokens, tokensToWei('1000000'));
    });
  });

  describe('Yield Farming', async () => {
    it('rewards tokens for staking', async () => {
      let result;

      result = await tether.balanceOf(investor);

      assert.equal(
        result.toString(),
        tokensToWei('100'),
        'customer mock wallet address'
      );

      await tether.approve(bank.address, tokensToWei('100'), {
        from: investor,
      });
      await bank.depositTokens(tokensToWei('100'), { from: investor });

      result = await tether.balanceOf(investor);
      assert.equal(result.toString(), '0', 'investor assets after transfer');

      result = await tether.balanceOf(bank.address);
      assert.equal(result.toString(), tokensToWei('100'), 'balance of bank');

      result = await tether.balanceOf(bank.address);
      assert.equal(
        result.toString(),
        tokensToWei('100'),
        'investor should have status of stakings'
      );

      await bank.issueTokens({ from: investor }).should.be.rejected;

      await bank.issueTokens({ from: owner }).should.not.be.rejected;

      result = await reward.balanceOf(investor);
      assert.equal(
        result.toString(),
        '11111111111111111111',
        'investor has recieved reward'
      );

      await bank.unstake({ from: investor });
      result = await tether.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokensToWei('100'),
        'investor got his tokens back'
      );

      result = await tether.balanceOf(bank.address);
      assert.equal(
        result.toString(),
        tokensToWei('0'),
        'balance of bank is empty'
      );
    });
  });
});
