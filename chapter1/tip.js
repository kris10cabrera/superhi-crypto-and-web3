const web3 = new Web3(Web3.givenProvider);
const form = document.querySelector("form");
const input = form.querySelector("input");

const send = async (amount) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  // eth value's base unit is wei. 10^18 wei = 1 ETH
  const wei = web3.utils.toWei(amount, "ether");
  const hexxxdWei = web3.utils.toHex(wei);

  if (accounts.length > 0) {
    window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0],
          to: "0x8A05fA58d533a6e40C4381E3247Cf4c68ca61cdc",
          value: hexxxdWei,
        },
      ],
    });
  }
};

if (window.ethereum) {
  form.classList.add("has-eth");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (window.ethereum) {
    send(input.value);
  } else {
    alert("Please install a wallet.");
  }
});
