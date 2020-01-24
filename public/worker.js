importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
const obj = {
  get: async partial => {
    return fetch(partial).then(response => {
      return response.text();
    });
  }
};

Comlink.expose(obj);
