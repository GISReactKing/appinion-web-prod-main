import axios from "axios";

const fileUploadToS3 = async (data) => {
  return new Promise(function (resolve, reject) {
    let formData = new FormData();
    formData.append("file", data.file);

    console.log("URL Data =|||=>", data.file, "|||||", data.action);

    axios({
      method: "POST",
      // url: 'http://192.168.1.102:8000/images',
      url: 'https://appiniondev.herokuapp.com/images',
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data; boundary=${form._boundary}",
      },
    })
      .then((response) => {
        console.log("Response ===> ||||", response);
        if (response.data && response.data.status == 200) {
          // dispatch({ type: ActionTypes.USER, payload: response.data.data });
          resolve(response.data.url);
        } else {
          reject("Incorrect email/password!");
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: media.js ~ line 28 ~ error", error.message)
        reject("Something went wrong!");
      });
  });
};
export { fileUploadToS3 };
