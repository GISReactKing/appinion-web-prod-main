import axios from "axios";

const bankAccount = async (data) => {
  const bank_account_obj = {
    country: "GB",
    currency: "GBP",
    accountHolderName: data.accountTilte,
    accountHolderType: "individual",
    // routingNumber: "110000000",
    accountNumber: data.accountNo,
  };
  return new Promise(function (resolve, reject) {
    axios({
      method: "POST",
      url: "https://83lqyhf1z5.execute-api.eu-west-2.amazonaws.com/add-account",
      data: JSON.stringify(bank_account_obj),
    })
      .then((response) => {
        if (response?.data?.bank_account) {
          resolve(response?.data);
        } else {
          reject({ message: response?.data?.code || "Invalid bank detail" });
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: bankAccount.js:27 ~ err", err);
        reject(err);
      });
  });
};

export { bankAccount };
