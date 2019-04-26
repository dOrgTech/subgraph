import { getWeb3, getContractAddresses, getOptions } from "./util";

const DAOCreator = require('@daostack/arc/build/contracts/DaoCreator.json');
const DAORegistry = require('@daostack/arc-hive/build/contracts/DAORegistry.json');

describe('DAORegistry', () => {
  let web3;
  let addresses;
  let opts;
  let daoCreator;
  let daoRegistry;
  beforeAll(async () => {
    web3 = await getWeb3();
    addresses = getContractAddresses();
    opts = await getOptions(web3);
    daoCreator = new web3.eth.Contract(DAOCreator.abi, addresses.DaoCreator);
    daoRegistry = new web3.eth.Contract(DAORegistry.abi, addresses.DAORegistry);
  });

  it('Sanity', async () => {
    // TODO:
    // - DAOCreator.forgeOrg
    // - do something like add members or something
    // - make sure the DAO doesn't exist in the cache
    // - propose it be added to the DAOregistry
    // - pass proposal
    // - See if the DAO exists in the cache as it should
  });
});