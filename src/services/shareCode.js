import axios from "axios";

const shareCode = async (code, status) => {
  const bank_account_obj = {
    code: code,
    status: status,
  };
  return new Promise(function (resolve, reject) {
    axios({
      method: "POST",
      url: "",
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
        console.log("🚀 ~ file: shareCode.js:27 ~ err", err);
        reject(err);
      });
  });
};

export { shareCode };
