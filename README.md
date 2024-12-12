# donate-crypto-widget-react
A react component website widget that enables accepting donations from a variety of cryptocurrencies

##Supported tokens

The widget supports a handful of cryptocurrencies out-of-the-box:

* Bitcoin
* Etheruem
* US Dollar Coin
* Monero
* Doge

The widget can feature _any_ token, but any logo/icon images must be supplied externally. In addition, this module can validate wallet addresses for supported tokens but NOT for custom tokens.

##Usage

###Props
The cryptocurrency donation widget accepts the following props (shown here as a typescript type definition):

type CryptoDonationWidgetProps = {
    addresses: string[],
    tickers: string[],
    images?: string[],
}

**addresses**(required): An array of wallet addresses as strings. The length of this array must equal the length of the "tickers" array.

**tickers**(required): An array of cryptocurrency tickers as strings and in the same order as their corresponding wallet addresses from the "addresses" field. The length of this array must be equal to the length of "addresses".

**images**(optional): An array of image URLs for _only the non-supported tokens_ in the tickers array. The length of the array should be equal to the number of _non-supported_ tokens from the tickers array; therefore, this field is only optional if the widget only uses supported tokens.

###Examples:
####A simple widget that uses only supported tokens
```
import './App.css';
import CryptoDonationWidget from "donate-crypto-widget-react";
import React from "react";

function App() {
  return (
    <div className="App">
      <CryptoDonationWidget 
            addresses={["address"]}
            images = {[]}
            tickers={['btc']}
      />

    </div>
  );
}

export default App;
```

####A widget using both supported and unsupported tokens
```
import './App.css';
import CryptoDonationWidget from "donate-crypto-widget-react";
import React from "react";
import customCoinImage from './img/custom-coin-image.svg';

function App() {
  return (
    <div className="App">
      <CryptoDonationWidget 
            addresses={["btcAddress", "customCoinAddress", "dogeAddress"]}
            images = {[{customCoinImage}]}
            tickers={['btc', 'cust', 'doge']}
      />

    </div>
  );
}

export default App;
```

##Support the project
_donation wallet QRs will go here_
