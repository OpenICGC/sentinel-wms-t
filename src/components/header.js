import logoIcgc from "../assets/ICGC_white.svg";
import "./header.css";

export default function createHeader() {
	return `<div class="ui grid">
    <div id="headerPanel" class="row">
        <div class="three wide column">
            <div id="headerLogo">
                <a title="Institut Catogràfic i Geològic de Catalunya" href="https://www.icgc.cat" target="_blank">
                    <img src="${logoIcgc}" class="ui image logo">
                </a>
            </div>
        </div>
        <div class="ten wide column">
            <h2 id="headerTitle" class="ui center  aligned block header">
                <div class="content">
                    Visor WMS-T Sentinel
                </div>
            </h2>
        </div>
        <div class="right floated two wide column">
            <div id="headerInfo">
                <a title="Informació" href="http://betaportal.icgc.cat" target="_blank">
                    <i class="large info circle link white icon"></i>
                </a>
            </div>
        </div>
    </div>
</div>`;
}