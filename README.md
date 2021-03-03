# polkadot-dapp
It's a helper of polkadot for interacting between dapp and native app.

Usage procedure as below:
1. run:  `npm install`  to install the dependencies;
2. edit the source code if necessary;
3. run: `npm run build` to build the encoded js file;
4. import the polkadot-dapp.min.js file into your project;
5. injected this js file into the webview first, then inject another initializing scripts as below:

```
(function() {
	var config = {
		coinType: "your default coinType",
		address: "your default address"
	};
	window.polkadotHelper.setConfig(config);
})();
```