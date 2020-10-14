const template = document.createElement("template");
template.innerHTML = `
<style>
span {
  font-family: 'Courier New', Courier, monospace;
}
</style>
  <span>[<span id="værdi"></span>]</span>
`;
class Terning extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.options = {};
    this.options.værdi = this.getAttribute("værdi");
    this.options.debug = this.getAttribute("debug");
    this.options.snyd = this.getAttribute("snyd");
    this.options.sekserbaggrundsfarve = this.getAttribute("sekserbaggrundsfarve");
    this.options.sekserforgrundsfarve = this.getAttribute("sekserforgrundsfarve");
    this.log("Terning oprettet med...", this.options);
    if (this.options.værdi == null || this.options.værdi < 1 || this.options.værdi > 6) {
      this.options.værdi = this.tilfældigtTal();
    }
    this.visVærdi();
  }

  visVærdi() {
    this.log("Retter shadow DOM til værdien: " + this.options.værdi);
    let v = this.shadowRoot.querySelector("span#værdi");
    v.innerHTML = this.options.værdi;
    if (
      (this.options.sekserforgrundsfarve || this.options.sekserbaggrundsfarve) &&
      this.options.værdi == 6
    ) {
      this.log("Tilretter farve");
      v.style.color = this.options.sekserforgrundsfarve;
      v.style.backgroundColor = this.options.sekserbaggrundsfarve;
    } else {
      v.style.color = "black";
      v.style.backgroundColor = "white";
    }
  }

  ryst() {
    this.log("Ryster terning fra " + this.options.værdi);
    this.options.værdi = this.tilfældigtTal();
    this.log("Terning rystet til " + this.options.værdi);
    this.visVærdi();
  }

  tilfældigtTal() {
    this.log("Finder tilfældig værdi");
    if (this.options.snyd) {
      let n = Math.random();
      this.log("Det er en snydeterning så hvis " + n + " er mindre en 0.5 bliver det en sekser");
      if (n < 0.5) {
        this.log("Returnerer 6 som et 'tilfældigt' tal");
        return 6;
      }
    }
    let t = Math.floor(Math.random() * 6) + 1;
    this.log("Tilfældigt tal fundet til " + t);
    return t;
  }

  log(txt, o) {
    if (this.options.debug) {
      if (!o) console.log(txt);
      else console.log(txt, o);
    }
  }
}

window.customElements.define("cronberg-terning", Terning);
