import { contractAbi, stakingAbi } from './ABI/ABI';
const Web3 = require('web3')

let web3;
let connectedAddress;

//MAINNET
const contractAddress = '0xb3cc3d7e656893f22d2372b0ae57106f6b155cbe';
const unlockedStakingAddress = '0xDBcb65F38D0f245Bb4B29e9F2270986025608F63';
const lockedStakingAddress = '0x90D103b0B2A8657F6A1829048e0ED8354BD3D6BB';

let contractObj;
let unlockedStakingObj;
let lockedStakingObj;

const Web3Functions = {

    async setupConnnection(address: string) {
        //MAINNET
        const rpcURL = 'https://cloudflare-eth.com/'

        try {
            connectedAddress = address;

            web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
            web3.eth.defaultAccount = web3.eth.accounts[0];

            contractObj = new web3.eth.Contract(JSON.parse(contractAbi), contractAddress);
            unlockedStakingObj = new web3.eth.Contract(JSON.parse(stakingAbi), unlockedStakingAddress);
            lockedStakingObj = new web3.eth.Contract(JSON.parse(stakingAbi), lockedStakingAddress);

        } catch (err) {
            console.log(err);
        }
    },
    async getAllowance(poolId: number) {
        if (connectedAddress) {

        }
    },
    async getData(poolId: number) {
        let poolObj;

        if (poolId == 0) {
            poolObj = unlockedStakingObj;
        } else {
            poolObj = lockedStakingObj;
        }

        let data = {
            apr: 0,
            exitPenalty: 0,
            totalStaked: 0,
            userStaked: 0,
            unlockTime: 0,
            allowance: 0,
            tokenBalance: 0,
            pendingRewards: 0,
        }

        if (connectedAddress) {
            try {
                data.apr = await poolObj.methods.apr().call();
            } catch {
                data.apr = 0;
            }

            try {
                data.exitPenalty = await poolObj.methods.exitPenaltyPerc().call();
            } catch {
                data.exitPenalty = 0;
            }

            try {
                let totalStaked = await poolObj.methods.totalStaked().call();
                data.totalStaked = totalStaked / 1e18;
            } catch {
                data.totalStaked = 0;
            }

            try {
                let userStaked = await poolObj.methods.userInfo(connectedAddress).call();
                data.userStaked = userStaked.amount / 1e18;
            } catch {
                data.userStaked = 0;
            }

            try {
                data.unlockTime = await poolObj.methods.holderUnlockTime(connectedAddress).call();
            } catch {
                data.unlockTime = 0;
            }

            try {
                let pendingRewards = await poolObj.methods.pendingReward(connectedAddress).call();
                data.pendingRewards = pendingRewards / 1e18;
            } catch {
                data.pendingRewards = 0;
            }

            try {
                let balance = await contractObj.methods.balanceOf(connectedAddress).call();
                data.tokenBalance = balance / 1e18;
            } catch (err) {
                data.tokenBalance = 0;
            }

            try {
                data.allowance = await contractObj.methods.allowance(connectedAddress, (poolId == 0 ? unlockedStakingAddress : lockedStakingAddress)).call();
            } catch (err) {
                data.allowance = 0;
            }
        }
        return data;
    }
}

export default Web3Functions;