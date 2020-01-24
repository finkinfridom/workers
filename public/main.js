import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
async function init() {
  const worker = new Worker("worker.js");
  // WebWorkers use `postMessage` and therefore work with Comlink.
  const obj = Comlink.wrap(worker);
  const items = window.config.items || [];
  const promises = [];
  for (let i = 0; i < items.length; i++) {
    promises.push(obj.get(items[i]));
  }
  Promise.all(
    promises.map(p =>
      p.catch(e => {
        console.log(e);
        return undefined;
      })
    )
  ).then(partials => {
    document.querySelector(window.config.root).innerHTML = partials.join("");
  });
}
init();
