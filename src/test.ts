import PolkadotDappUtil from "./util";

const  util = new PolkadotDappUtil();
util.generateMnemonic('KAR', function (error, result){
    console.log('生成结果：');
    console.log(result);
});