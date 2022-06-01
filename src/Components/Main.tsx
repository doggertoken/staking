import React from 'react';
import styled from 'styled-components';
import ReadInterface from '../readInterface';
import WriteInterface from '../writeInterface';
import { useWeb3 } from '@3rdweb/hooks';
import Nav from '../Components/Nav';
import Header from '../Components/Header';
import StakingPanel from '../Components/StakingPanel';
import ConnectModal from './ConnectModal';

interface Props {
  theme: string;
}

const Container = styled.div<Pick<Props, 'theme'>>`
  min-width: 100vw;
  display: flex;
  flex-wrap: wrap;
  background: ${props => props.theme.body};
  font-family: 'Roboto Condensed', sans-serif;
  z-index: 1;
  @media screen and (max-width: 1020px) {
    width: 100%;
  }
`

const Wrapper = styled.div`
  min-width: 100%;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
`

const StakeContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1020px) {
    width: 100%;
  }
  @media only screen and (max-width: 900px) {
    margin-bottom: 15px;
}
`
const Footer = styled.div`
  min-width: 100%;
`

const Main: React.FC<Props> = props => {
  const { address, connectWallet, provider, chainId } = useWeb3();
  const [poolId, updatePoolId] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [data, setData] = React.useState({
    apr: 0,
    exitPenalty: 0,
    totalStaked: 0,
    userStaked: 0,
    unlockTime: 0,
    allowance: 0,
    tokenBalance: 0,
    pendingRewards: 0,
  })

  const setupProvider = async (connector: any) => {
    console.log(connector);
    await connectWallet(connector);
  }

  const updateData = async () => {
    let _data = await ReadInterface.getData(poolId);

    setData({
      apr: _data.apr,
      exitPenalty: _data.exitPenalty,
      totalStaked: _data.totalStaked,
      userStaked: _data.userStaked,
      unlockTime: _data.unlockTime,
      allowance: _data.allowance,
      tokenBalance: _data.tokenBalance,
      pendingRewards: _data.pendingRewards
    })
  }

  const setConnection = async () => {
    if (provider) {
      await WriteInterface.connectWallet(provider?.provider);
      await ReadInterface.setupConnnection(address);
      await updateData();
    }
  }

  React.useEffect(() => {
    if (address == null) {
      setupProvider('injected');
    }
  }, [])

  React.useEffect(() => {
    setConnection();
  }, [provider])

  React.useEffect(() => {
    let interval = setInterval(() => {
      if (provider) {
        updateData();
      } else {
        setData({
          apr: 0,
          exitPenalty: 0,
          totalStaked: 0,
          userStaked: 0,
          unlockTime: 0,
          allowance: 0,
          tokenBalance: 0,
          pendingRewards: 0,
        })
      }
    }, 1000)
    return () => clearInterval(interval);
  })

  const manualConnect = (connector: any) => {
    if (address == null) {
      setupProvider(connector);
    }
  }

  const updateModal = () => {
    if (!provider) {
        setModalOpen(!modalOpen);
    }
}

  return (
    <Container theme={props.theme}>
      <Nav openModal={updateModal} address={address} manualConnect={manualConnect} theme={props.theme} />
      <ConnectModal address={address} updateModal={updateModal} provider={provider} connect={manualConnect} open={modalOpen} theme={props.theme} />
      <Wrapper>
      <Header theme={props.theme} />
      <StakeContainer>
        <StakingPanel  data={data} updatePoolId={updatePoolId} theme={props.theme} />
      </StakeContainer>
      <Footer/>
      </Wrapper>
    </Container>
  )
}

export default Main