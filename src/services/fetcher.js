// const headers = {
//   "Accept": "application/json",
//   "Content-Type": "application/json"
// };

let server = "";
// const server = "http://localhost:3000/user/" + userId;
// let server = "http://localhost:3000/user/";

async function fetcher(url, options = {}) {
  try {
    // const res = await fetch(server+url, {headers, ...options});
    const res = await fetch(server + url);
    return await res.json();
  } catch (err) {
    console.error("error: ", err);
    throw err;
  }
}

// function setServerBaseUrl(url) {
//   server = url;
// }

export {
  fetcher,
  //  setServerBaseUrl
};
