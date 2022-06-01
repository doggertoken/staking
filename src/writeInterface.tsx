import { contractAbi, stakingAbi } from './ABI/ABI';
const Web3 = require('web3')

let connectedAddress;
let web3;
let ethereum

//MAINNET
const contractAddress = '0xb3cc3d7e656893f22d2372b0ae57106f6b155cbe';
const unlockedStakingAddress = '0xDBcb65F38D0f245Bb4B29e9F2270986025608F63';
const lockedStakingAddress = '0x90D103b0B2A8657F6A1829048e0ED8354BD3D6BB';

let contractObj;
let unlockedStakingObj;
let lockedStakingObj;

const Web3Functions = {

    async connectWallet(eth:any) {
        ethereum = eth;
        try {
            connectedAddress = await ethereum.request({ method: 'eth_accounts' });
            connectedAddress = connectedAddress[0];

            web3 = new Web3(ethereum);
            web3.eth.defaultAccount = web3.eth.accounts[0];

            contractObj = new web3.eth.Contract(JSON.parse(contractAbi), contractAddress);
            unlockedStakingObj = new web3.eth.Contract(JSON.parse(stakingAbi), unlockedStakingAddress);
            lockedStakingObj = new web3.eth.Contract(JSON.parse(stakingAbi), lockedStakingAddress);

        } catch (err) {
            console.log(err);
        }
    },
    async approve(poolId: number) {
        let poolAddress;
        if(poolId == 0) {
            poolAddress = unlockedStakingAddress;
        } else {
            poolAddress = lockedStakingAddress;
        }

        const callData = contractObj.methods.approve(poolAddress, '115792089237316195423570985008687907853269984665640564039457584007913129639935').encodeABI();
        
        try {
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    data: callData,
                    from: connectedAddress,
                    to: contractAddress,
                }]
            }).then((txHash) => {
                return txHash;
            }).catch((err) => {
                return err;
            })
        } catch (err) {
            console.log(err);
        }
    },
    async deposit(poolId: number, amount: number) {
        console.log(amount);
        const depAmount = (amount * 1e18).toLocaleString('fullwide', { useGrouping: false });
        
        let poolObj;
        let poolAddress;
        
        if(poolId == 0) {
            poolObj = unlockedStakingObj;
            poolAddress = unlockedStakingAddress;
        } else {
            poolObj = lockedStakingObj;
            poolAddress = lockedStakingAddress;
        }

        const callData = poolObj.methods.deposit(depAmount).encodeABI();
        try {
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    data: callData,
                    from: connectedAddress,
                    to: poolAddress
                }]
            }).then((txHash) => {
                return txHash;
            }).catch((err) => {
                return err;
            })
        } catch (err) {
            console.log(err);
        }
    },
    async withdraw(poolId: number) {
        let poolObj;
        let poolAddress;
        
        if(poolId == 0) {
            poolObj = unlockedStakingObj;
            poolAddress = unlockedStakingAddress;
        } else {
            poolObj = lockedStakingObj;
            poolAddress = lockedStakingAddress;
        }

        const callData = poolObj.methods.withdraw().encodeABI();
        try {
        console.log('Withdrawing...')
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    data: callData,
                    from: connectedAddress,
                    to: poolAddress
                }]
            }).then((txHash) => {
                return txHash;
            }).catch((err) => {
                return err;
            })
        } catch (err) {
            console.log(err);
        }
    },
    async earlyWithdraw(poolId: number){
        let poolObj;
        let poolAddress;
        
        if(poolId == 0) {
            poolObj = unlockedStakingObj;
            poolAddress = unlockedStakingAddress;
        } else {
            poolObj = lockedStakingObj;
            poolAddress = lockedStakingAddress;
        }

        const callData = poolObj.methods.emergencyWithdraw().encodeABI();
        try {
            console.log('Emergency Withdrawing (Penalty Applied)...')
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    data: callData,
                    from: connectedAddress,
                    to: poolAddress
                }]
            }).then((txHash) => {
                return txHash;
            }).catch((err) => {
                return err;
            })
        } catch (err) {
            console.log(err);
        }
    },
    async claim (poolId: number) {
        let poolObj;
        let poolAddress;
        
        if(poolId == 0) {
            poolObj = unlockedStakingObj;
            poolAddress = unlockedStakingAddress;
        } else {
            poolObj = lockedStakingObj;
            poolAddress = lockedStakingAddress;
        }

        const callData = poolObj.methods.deposit('0').encodeABI();
        try {
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    data: callData,
                    from: connectedAddress,
                    to: poolAddress
                }]
            }).then((txHash) => {
                return txHash;
            }).catch((err) => {
                return err;
            })
        } catch (err) {
            console.log(err);
        }
    },
    async compound (poolId: number) {
        let poolObj;
        let poolAddress;
        
        if(poolId == 0) {
            poolObj = unlockedStakingObj;
            poolAddress = unlockedStakingAddress;
        } else {
            poolObj = lockedStakingObj;
            poolAddress = lockedStakingAddress;
        }

        const callData = poolObj.methods.compound().encodeABI();
        try {
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    data: callData,
                    from: connectedAddress,
                    to: poolAddress
                }]
            }).then((txHash) => {
                return txHash;
            }).catch((err) => {
                return err;
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export default Web3Functions;