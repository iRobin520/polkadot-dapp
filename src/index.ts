import {HttpProvider} from '@polkadot/rpc-provider/http';
var dsBridge = require("dsbridge")

export class ATokenProvider extends HttpProvider {
    send(method: string, params: any[]): Promise<any> {
        console.log("method:"+method);
        console.log("params:")
        console.log(params);
        return super.send(method, params);
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
    let _this = this;
    _this.callNativeMethod('requestAccounts', 0, {'coinType': coinType}, callback);
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
const provider = new ATokenProvider("https://rpc.polkadot.io/");
window.polkadotHelper = helper;
window.polkadotProvider = provider;




