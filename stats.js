// Create a class for the element
let overrideDNT = localStorage.getItem("overrideDNT"), beaconURL=undefined, site;
class Stats extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    if (overrideDNT == null && navigator.doNotTrack == "1") {
      shadow.innerHTML=`<style>.cleanslate{font-size:medium !important;line-height:1 !important;direction:ltr !important;text-align:left !important;text-align:start !important;font-family:"Times New Roman", Times, serif !important;color:black !important;font-style:normal !important;font-weight:normal !important;text-decoration:none !important;list-style-type:disc !important}
*:not(:root),:after:not(:root),:before:not(:root){-webkit-box-sizing:border-box !important;box-sizing:border-box !important}:after:not(:root),:before:not(:root){text-decoration:inherit !important;vertical-align:inherit !important}b:not(:root){font-weight:bolder !important}button:not(:root){margin:0 !important}button:not(:root){overflow:visible !important;text-transform:none !important}button:not(:root){-webkit-appearance:button !important}::-webkit-input-placeholder:not(:root){color:inherit !important;opacity:0.54 !important}::-moz-focus-inner:not(:root){border-style:none !important;padding:0 !important}:-moz-focusring:not(:root){outline:1px dotted ButtonText !important}button:not(:root){-ms-touch-action:manipulation !important;touch-action:manipulation !important}p:not(:root){margin:0 0 16px !important}button:not(:root){background-color:#007bff !important;border:#007bff !important;border-radius:4px !important;color:#fff !important;padding:8px 16px !important;display:inline-block !important;font-weight:400 !important;text-align:center !important;white-space:nowrap !important;vertical-align:middle !important;-webkit-user-select:none !important;-moz-user-select:none !important;-ms-user-select:none !important;user-select:none !important;border:1px solid rgba(0,0,0,0) !important;font-size:1rem !important;line-height:1.5 !important;-webkit-transition:color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,-webkit-box-shadow 0.15s ease-in-out !important;transition:color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,-webkit-box-shadow 0.15s ease-in-out !important;transition:color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out !important;transition:color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out,-webkit-box-shadow 0.15s ease-in-out !important}button::-moz-focus-inner:not(:root){padding:0 !important}button:hover:not(:root){background-color:#0069d9 !important;border-color:#0062cc !important;color:#fff !important}button:focus:not(:root){outline:0 !important;-webkit-box-shadow:0 0 0 0.2rem rgba(0,123,255,.5) !important;box-shadow:0 0 0 0.2rem rgba(0,123,255,.5) !important}button:disabled:not(:root){opacity:0.65 !important;cursor:not-allowed !important;background-color:#007bff !important;border-color:#007bff !important;color:#fff !important}
.box:not(:root){background:white !important;position:fixed !important;bottom:0 !important;left:0 !important;margin:1rem !important;padding:0.5rem !important;max-width:25rem !important;border:1px solid #333 !important;border-radius:4px !important;min-height:8rem !important;display:flex !important;flex-direction:column !important;width:calc(100% - 2rem) !important;box-sizing:border-box !important}</style><div class="box cleanslate" part="box"><p><b>Hello!</b> I like to see how much traffic my site is getting, so I collect some statistics. I don't track you, or collect any identifying information, but since you use Do Not Track, I figured I should ask before I collect anything.</p><div style="display: flex;justify-content: space-evenly;"><button class="nothanks" part="no-button">No Thanks</button> <button class="allow" part="yes-button">Allow</button></div></div>`
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
    h=this.getAttribute("site");
    site = undefined;
    if (typeof h == "string" && h.length>0) try {
      site = h;
    } catch(e) {}
    site
  }
}
// Define the new element
customElements.define("stats-control", Stats);
export default event => {
  if (beaconURL&&((overrideDNT || navigator.doNotTrack) != "1"))
    navigator.sendBeacon(
      beaconURL,
      JSON.stringify({ event, site: site||"" })
    );
  }
