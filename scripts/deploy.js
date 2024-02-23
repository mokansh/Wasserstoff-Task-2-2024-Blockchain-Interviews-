
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  signers = await ethers.getSigners()
  deployer = signers[0]
  owner = signers[1]
  user1 = signers[2]

  console.log("addresses =========== ", owner.address, user1.address)

  LOAD = await ethers.getContractFactory("LoadBalancer")
  load = await LOAD.deploy(deployer.address)
  await load.waitForDeployment()
  // load = await LOAD.attach("0x3933b5cB1c4d9a24917fF5A1d0dD0919679F8385")
  console.log("load address = ", load.target)

  TOKEN = await ethers.getContractFactory("SampleToken")
  token = await TOKEN.deploy("ABC", "ABC")
  await token.waitForDeployment()
  // token = await TOKEN.attach("0x3f3E95c5034a46aB32F45E6C413e7DE0D211dEFA")
  console.log("token address = ", token.target)


  TOKEN_TRANSFER = await ethers.getContractFactory("TokenTransfer")
  tokenFacet = await TOKEN_TRANSFER.deploy()
  await tokenFacet.waitForDeployment()
  // tokenFacet = await TOKEN_TRANSFER.attach("0xBD59D1Be4D08Cf161eD80d248dd45cC803896d53");
  console.log("tokenFacet address = ", tokenFacet.target)



  VOTING = await ethers.getContractFactory("Voting")
  votingFacet = await VOTING.deploy()
  await votingFacet.waitForDeployment()
  // votingFacet = await VOTING.attach("0x27f2f1D8B5Dae19B7d4a0370684f90B96D8F4496");
  console.log("votingFacet address = ", votingFacet.target)



  STAKING = await ethers.getContractFactory("Stake")
  stakingFacet = await STAKING.deploy()
  await stakingFacet.waitForDeployment()
  // stakingFacet = await STAKING.attach("0xbdD9F83d11586d67C0fB1dEC11036Cb03644696F");
  console.log("stakingFacet address = ", stakingFacet.target)



  // loadBalancerToken = await TOKEN_TRANSFER.attach("0x3933b5cB1c4d9a24917fF5A1d0dD0919679F8385")
  // loadBalancerVoting = await VOTING.attach("0x3933b5cB1c4d9a24917fF5A1d0dD0919679F8385")
  // loadBalancerStaking = await STAKING.attach("0x3933b5cB1c4d9a24917fF5A1d0dD0919679F8385")

     // -----------------------------------testnet addresses ---------------------
          // load balancer address = 0x3933b5cB1c4d9a24917fF5A1d0dD0919679F8385
          // token address = 0x3f3E95c5034a46aB32F45E6C413e7DE0D211dEFA
          // tokenFacet address = 0xBD59D1Be4D08Cf161eD80d248dd45cC803896d53
          // votingFacet address = 0x27f2f1D8B5Dae19B7d4a0370684f90B96D8F4496
          // stakingFacet address = 0xbdD9F83d11586d67C0fB1dEC11036Cb03644696F

     // ------------------------ Token Transfer Facet tx ---------------------------------
          // await token.transfer(load.target, 100000000000000000000n)
          // console.log("load balancer balance before token transferring ======= ", await token.balanceOf(loadBalancerToken.target))
          // console.log("user 1 balance before token transfer ======= ", await token.balanceOf(user1.address))
      
      
          // await load.addFunction("0xbeabacc8", tokenFacet.target)     // adding transfer function of Token transfer contract
          
      
          // await loadBalancerToken.transfer(token.target, user1.address, 50000000000000000000n)
      
          // console.log("load balancer balance after token transferring ======= ", await token.balanceOf(loadBalancerToken.target))
      
          // console.log("user 1 balance after token transfer ======= ", await token.balanceOf(user1.address))
  
      // ------------------------ Voting tx ----------------------------------------------

          // await load.addFunction("0x4f78b712", votingFacet.target)
          // sleep(5000)
          // await load.addFunction("0xb67255b8", votingFacet.target)
          // sleep(5000)
          // await load.addFunction("0x8e7ea5b2", votingFacet.target)
          // sleep(5000)
          
          // await loadBalancerVoting.proposeItem("BLOCK")
          // sleep(5000)
          // await loadBalancerVoting.proposeItem("ETHEREUM")
          // sleep(5000)
          // await loadBalancerVoting.voteForItem(1)
          // sleep(5000)
          // await loadBalancerVoting.voteForItem(2)
          // sleep(5000)
          // await loadBalancerVoting.connect(user1).voteForItem(2)
          // sleep(5000)

          // console.log("winner : ", await loadBalancerVoting.getWinner())

      // --------------------------Staking tx ------------------------------------------------

          // await token.transfer(loadBalancerStaking.target, 100000000000000000000n)
          // console.log("load balancer bal ======= ", await token.balanceOf(loadBalancerStaking.target))
          // sleep(5000)

      
          // await load.addFunction("0x485cc955", stakingFacet.target) // adding initialize function of staking
          // await load.addFunction("0x7b0472f0", stakingFacet.target) // adding stake function of staking
          // await load.addFunction("0x379607f5", stakingFacet.target) // adding claim function of staking
          // await load.addFunction("0xb842ec44", stakingFacet.target) // adding userTransactions function of staking to view data
          // await load.addFunction("0xfc0c546a", stakingFacet.target) // adding token function of staking to view token address
      
      
      
  
          // await token.transfer(user1.address, 50000000000000000000n)
          // console.log("user 1 balance before staking ======= ", await token.balanceOf(user1.address))
      
      
          // await loadBalancerStaking.initialize(token.target, owner.address)
      
      
          // await token.connect(user1).approve(loadBalancerStaking.target, 5000000000000000000n)
      
          // await loadBalancerStaking.connect(user1).stake(30, 5000000000000000000n)

          // await loadBalancerStaking.connect(user1).claim(1)

          // await load.removeFunction("0xfc0c546a", stakingFacet.target)
          // await load.updateFunction("0xb842ec44", "0xfc0c546a", stakingFacet.target)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
