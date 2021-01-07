// Create a class for the element
let overrideDNT = localStorage.getItem("overrideDNT"), beaconURL=undefined;
class Stats extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    if (overrideDNT == null && navigator.doNotTrack == "1") {
      shadow.innerHTML=`<style>*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box;}:after,:before{text-decoration:inherit;vertical-align:inherit;}b{font-weight:bolder;}button{margin:0;}button{overflow:visible;text-transform:none;}button{-webkit-appearance:button;}::-webkit-input-placeholder{color:inherit;opacity:.54;}::-moz-focus-inner{border-style:none;padding:0;}:-moz-focusring{outline:1px dotted ButtonText;}button{-ms-touch-action:manipulation;touch-action:manipulation;}p{margin:0 0 16px;}button{background-color:#007bff;border:#007bff;border-radius:4px;color:#fff;padding:8px 16px;display:inline-block;font-weight:400;text-align:center;white-space:nowrap;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid rgba(0,0,0,0);font-size:1rem;line-height:1.5;-webkit-transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;}button::-moz-focus-inner{padding:0;}button:hover{background-color:#0069d9;border-color:#0062cc;color:#fff;}button:focus{outline:0;-webkit-box-shadow:0 0 0 .2rem rgba(0,123,255,.5);box-shadow:0 0 0 .2rem rgba(0,123,255,.5);}button:disabled{opacity:.65;cursor:not-allowed;background-color:#007bff;border-color:#007bff;color:#fff;}</style><div class="box" style="background: white;position: fixed;bottom: 0;left: 0;margin: 1rem;padding: 0.5rem;max-width: 25rem;border: 1px solid #333;border-radius: 4px;min-height: 8rem;display: flex;flex-direction: column;width: calc(100% - 2rem);box-sizing: border-box;"><p><b>Hello!</b> I like to see how much traffic my site is getting, so I collect some statistics. I don't track you, or collect any identifying information, but since you use Do Not Track, I figured I should ask before I collect anything.</p><div style="display: flex;justify-content: space-evenly;"><button class="nothanks">No Thanks</button> <button class="allow">Allow</button></div></div>`
      let e = shadow.querySelector(`.box`);
      e.querySelector(`.nothanks`).addEventListener("click", () => {
        localStorage.setItem("overrideDNT", (overrideDNT = "1"));
        e.remove();
      });
      e.querySelector(`.allow`).addEventListener("click", () => {
        localStorage.setItem("overrideDNT", (overrideDNT = "0"));
        e.remove();
      });
    }
  }
  connectedCallback() {
    this._updateData();
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this._updateData();
  }
  _updateData() {
    let h=this.getAttribute("href");
    beaconURL = undefined;
    if (h) try {
      beaconURL = new URL(h).href;
    } catch(e) {}
  }
}
// Define the new element
customElements.define("stats-control", Stats);
export default site => event => {
  if (beaconURL&&((overrideDNT || navigator.doNotTrack) != "1"))
    navigator.sendBeacon(
      beaconURL,
      JSON.stringify({ event, site })
    );
};
