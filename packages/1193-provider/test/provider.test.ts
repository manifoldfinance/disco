import 'mocha';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import HttpConnection from '@json-rpc-tools/http-connection';
import WsConnection from '@json-rpc-tools/ws-connection';

import JsonRpcProvider from '../src';

chai.use(chaiAsPromised);

const TEST_RANDOM_HOST = 'random.domain.that.does.not.exist';

const TEST_ETH_REQUEST = {
  method: 'eth_chainId',
  params: [],
};
const TEST_ETH_RESULT = '0x2a';

const TEST_URL = {
  http: {
    good: `https://kovan.poa.network`,
    bad: `http://${TEST_RANDOM_HOST}`,
  },
  ws: {
    good: `wss://staging.walletconnect.org`,
    bad: `ws://${TEST_RANDOM_HOST}`,
  },
};

describe('@json-rpc-tools/provider', () => {
  describe('HTTP', () => {
    it('Succesfully connects and requests', async () => {
      const connection = new HttpConnection(TEST_URL.http.good);
      const provider = new JsonRpcProvider(connection);
      await provider.connect();
      const result = await provider.request(TEST_ETH_REQUEST);
      chai.expect(!!result).to.be.true;
      chai.expect(result).to.eql(TEST_ETH_RESULT);
    });
    it('Successfully requests without calling connect', async () => {
      const connection = new HttpConnection(TEST_URL.http.good);
      const provider = new JsonRpcProvider(connection);
      const result = await provider.request(TEST_ETH_REQUEST);
      chai.expect(!!result).to.be.true;
      chai.expect(result).to.eql(TEST_ETH_RESULT);
    });
    it('Throws error when receives json-rpc error', async () => {
      const connection = new HttpConnection(TEST_URL.http.good);
      const provider = new JsonRpcProvider(connection);
      const promise = provider.request({
        ...TEST_ETH_REQUEST,
        method: 'test_method',
      });
      await chai
        .expect(promise)
        .to.eventually.be.rejectedWith(`Method not found`);
    });
    it('Throws when connecting to unavailable host', async () => {
      const connection = new HttpConnection(TEST_URL.http.bad);
      const provider = new JsonRpcProvider(connection);
      const promise = provider.request(TEST_ETH_REQUEST);
      await chai
        .expect(promise)
        .to.eventually.be.rejectedWith(
          `Unavailable HTTP RPC url at ${TEST_URL.http.bad}`,
        );
    });
    it('Reconnect with new provided host url', async () => {
      const connection = new HttpConnection(TEST_URL.http.bad);
      const provider = new JsonRpcProvider(connection);
      chai
        .expect((provider.connection as HttpConnection).url)
        .to.equal(TEST_URL.http.bad);
      await provider.connect(TEST_URL.http.good);
      chai
        .expect((provider.connection as HttpConnection).url)
        .to.equal(TEST_URL.http.good);
      const result = await provider.request(TEST_ETH_REQUEST);
      chai.expect(!!result).to.be.true;
      chai.expect(result).to.eql(TEST_ETH_RESULT);
    });
  });
});
