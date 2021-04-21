import {WsProvider} from '@polkadot/rpc-provider';
import { Keyring } from '@polkadot/keyring';
var dsBridge = require("dsbridge")

interface SubscriptionHandler {
    callback: (error: Error | null, result: any) => void;
    type: string;
}

export default class ATokenProvider extends WsProvider {

    send(method: string, params: any[], subscription?: SubscriptionHandler): Promise<any> {
        console.log("----method:"+method);
        console.log("----params:")
        console.log(params);
        return super.send(method, params, subscription);
    }
}

var PolkadotDappHelper = function PolkadotDappHelper() {}

PolkadotDappHelper.prototype.setConfig = function(config){
    this.coinType = config.coinType;
    this.address = config.address;
}

/**
 * Call app native method
 * @param {string} method
 * @param {string} id
 * @param {object} params
 * @param {function} callback
 */
PolkadotDappHelper.prototype.callNativeMethod = function (method, id, params, callback) {
    let _this = this;
    let methodName = 'dot.' + method;
    var parameters = {};
    parameters['name'] = method;
    parameters['id'] = id;
    parameters['object'] = params;
    dsBridge.call(methodName, parameters, function (response) {
        var errMsg = null;
        var callbackBody = null;
        try {
            if (response) {
                let data = JSON.parse(response);
                let result = data['result'];
                if (method === 'requestAccounts') {
                    _this.coinType = params['coinType'];
                    _this.address = result ? result : null;
                }
                callbackBody = generateCallbackBody(id,result);
            } else {
                errMsg = 'there is no response from callback';
            }
            callback(errMsg,callbackBody);
        }
        catch(err){
            alert(err);
        }
    });
}

/**
 * Request asset address
 * @param {string} coinType
 * @param {function} callback
 */
PolkadotDappHelper.prototype.requestAccounts = function (coinType, callback) {
    this.callNativeMethod('requestAccounts', 0, {'coinType': coinType}, callback);
}

/**
 * Request Keyring Pair
 * @param {function} callback
 */
PolkadotDappHelper.prototype.requestKeyringPair = function (callback) {
    this.callNativeMethod('requestKeyring', 0, {}, function (error, result) {
        if (!error) {
            const keyring = new Keyring({ ss58Format: 42, type: 'sr25519' });
            const keyringPair = keyring.createFromUri(result['result']);
            callback(null, keyringPair);
        } else {
            callback(error, null);
        }
    });
}

/**
 * Send Transaction
 * @param {object} params
 * examples: {'coinType':'DOT/KSM','actionType':'TRANSFER/CONTRIBUTE/STAKING/WITHDRAW','amount':'1','estimatedFee':'0.05','paraId':'1','projectName':'Karura'}
 * @param {function} callback
 */
PolkadotDappHelper.prototype.sendTransaction = function (params, callback) {
    this.callNativeMethod('sendTransaction', 1, params, callback);
}


/**
 * Generate callback body
 * @param {string} id
 * @param {object} response
 */
var generateCallbackBody = function (id,response) {
    return {
        jsonrpc: "2.0",
        id: id,
        result: response
    };
}
const helper = new PolkadotDappHelper();
window.polkadotHelper = helper;





