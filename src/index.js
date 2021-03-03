"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATokenProvider = void 0;
const rpc_provider_1 = require("@polkadot/rpc-provider");
var dsBridge = require("dsbridge");
class ATokenProvider extends rpc_provider_1.HttpProvider {
    send(method, params) {
        console.log("method:" + method);
        console.log("params:");
        console.log(params);
        return super.send(method, params);
    }
}
exports.ATokenProvider = ATokenProvider;
var PolkadotDappHelper = function PolkadotDappHelper() { };
PolkadotDappHelper.prototype.setConfig = function (config) {
    this.rpcUrl = config.rpcUrl;
    this.address = config.address;
};
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
                    _this.address = result ? result[0] : null;
                }
                callbackBody = generateCallbackBody(id, result);
            }
            else {
                errMsg = 'there is no response from callback';
            }
            callback(errMsg, callbackBody);
        }
        catch (err) {
            alert(err);
        }
    });
};
/**
 * Request asset address
 * @param {string} coinType
 * @param {function} callback
 */
PolkadotDappHelper.prototype.requestAccounts = function (coinType, callback) {
    this.callNativeMethod('requestAccounts', 0, { 'coinType': coinType }, callback);
};
/**
 * Generate callback body
 * @param {string} id
 * @param {object} response
 */
var generateCallbackBody = function (id, response) {
    return {
        jsonrpc: "2.0",
        id: id,
        result: response
    };
};
const polkadotHelper = new PolkadotDappHelper();
window.polkadotHelper = polkadotHelper;
exports.default = ATokenProvider;
//# sourceMappingURL=helper.js.map