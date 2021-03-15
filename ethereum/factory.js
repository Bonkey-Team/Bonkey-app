import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
    '0x8cf0cb67fe29fab66ec380ff7ca26dacfd1bf781'
);

export default instance;
