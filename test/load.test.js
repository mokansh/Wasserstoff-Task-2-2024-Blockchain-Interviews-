const { utils } = require('ethers')



describe("Deployment", function () {
  beforeEach(async () => {

    signers = await ethers.getSigners()
    deployer = signers[0]
    owner = signers[1]
    user1 = signers[2]

    LOAD = await ethers.getContractFactory("LoadBalancer")
    load = await LOAD.deploy(deployer.address)

    TOKEN = await ethers.getContractFactory("SampleToken")
    token = await TOKEN.deploy("ABC", "ABC")

    TOKEN_TRANSFER = await ethers.getContractFactory("TokenTransfer")
    tokenFacet = await TOKEN_TRANSFER.deploy();

    VOTING = await ethers.getContractFactory("Voting")
    votingFacet = await VOTING.deploy();

    STAKING = await ethers.getContractFactory("Stake")
    stakingFacet = await STAKING.deploy();

    loadBalancerToken = await TOKEN_TRANSFER.attach(load.target)
    loadBalancerVoting = await VOTING.attach(load.target)
    loadBalancerStaking = await STAKING.attach(load.target)

  });


  it("Token Transfer Facet Test", async function () {

    await token.transfer(load.target, 100000000000000000000n)
    console.log("load balancer balance before token transferring ======= ", await token.balanceOf(loadBalancerToken.target))
    console.log("user 1 balance before token transfer ======= ", await token.balanceOf(user1.address))


    await load.addFunction("0xbeabacc8", tokenFacet.target)     // adding transfer function of Token transfer contract
    

    await loadBalancerToken.transfer(token.target, user1.address, 50000000000000000000n)

    console.log("load balancer balance after token transferring ======= ", await token.balanceOf(loadBalancerToken.target))

    console.log("user 1 balance after token transfer ======= ", await token.balanceOf(user1.address))


  });

  it("Voting Facet Test", async function () {

    await load.addFunction("0x4f78b712", votingFacet.target)
    await load.addFunction("0xb67255b8", votingFacet.target)
    await load.addFunction("0x8e7ea5b2", votingFacet.target)
    
    await loadBalancerVoting.proposeItem("BLOCK")
    await loadBalancerVoting.proposeItem("ETHEREUM")
    await loadBalancerVoting.voteForItem(1)
    await loadBalancerVoting.voteForItem(2)
    await loadBalancerVoting.connect(user1).voteForItem(2)

    console.log("winner : ", await loadBalancerVoting.getWinner())

  });

  it("Staking Test", async function () {

    await token.transfer(loadBalancerStaking.target, 100000000000000000000n)
    console.log("load balancer bal ======= ", await token.balanceOf(loadBalancerStaking.target))


    await load.addFunction("0x485cc955", stakingFacet.target) // adding initialize function of staking
    await load.addFunction("0x7b0472f0", stakingFacet.target) // adding stake function of staking
    await load.addFunction("0x379607f5", stakingFacet.target) // adding claim function of staking
    await load.addFunction("0xb842ec44", stakingFacet.target) // adding userTransactions function of staking to view data
    await load.addFunction("0xfc0c546a", stakingFacet.target) // adding token function of staking to view token address

    await load.removeFunction("0xfc0c546a", stakingFacet.target)
    await load.updateFunction("0xb842ec44", "0xfc0c546a", stakingFacet.target)

    
    
    

    await token.transfer(user1.address, 50000000000000000000n)
    console.log("user 1 balance before staking ======= ", await token.balanceOf(user1.address))


    await loadBalancerStaking.initialize(token.target, owner.address)


    await token.connect(user1).approve(loadBalancerStaking.target, 5000000000000000000n)

    await loadBalancerStaking.connect(user1).stake(30, 5000000000000000000n)


    await network.provider.send("evm_increaseTime", [40])
    await network.provider.send("evm_mine")

    // console.log("user 1 tx ====", await loadBalancerStaking.connect(user1).userTransactions(user1.address, 1))

    // console.log("token address ==== ", await loadBalancerStaking.token())

    console.log("load balancer balance after user 1 stakes ======= ", await token.balanceOf(loadBalancerStaking.target))

    await loadBalancerStaking.connect(user1).claim(1)

    console.log("user1 balance after claiming ======= ", await token.balanceOf(user1.address))

    console.log("load balancer balance after user1 claimed ======= ", await token.balanceOf(loadBalancerStaking.target))

  });


});


