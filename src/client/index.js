import ReactDOM from 'react-dom/client';

import I18 from './utils/I18.js';
import APP from './APP.js';
import MainLayout from './ui/MainLayout.jsx';

import Storage from './utils/Storage.js';
import {Observer, GLOBAL_EVENT} from './Observer.js';

import languages from './resources/static/localization/languages.json';

import Controller from 'platform/Controller.js';

let app = null;
let root = null;

const STORAGE_LANGUAGE_KEY = "language";

function run() {
    Controller.init();
    if (PLATFORM === "electron") {
        injectCss("static/css/index-electron.css");
    }
    loadLocalization();
}

function loadLocalization() {
    for (let i = 1; i < languages.length; i++) {
        I18.supportedLanguages.push(languages[i].lang);
    }
    I18.path = "static/localization";
    I18.init(Storage.load(STORAGE_LANGUAGE_KEY, false));

    app = new APP();

    I18.load(renderLayout);

    Observer.on(GLOBAL_EVENT.CHANGE_LANG, setLocale);
}

function renderLayout() {
    Controller.updateLocale();
    const rootElement = document.getElementById("root");
    root = ReactDOM.createRoot(rootElement);
    root.render(<MainLayout/>);
}

function injectCss(path) {
    let el = document.createElement("link");
    el.rel = "stylesheet";
    el.type = "text/css";
    el.href = path;
    document.head.appendChild(el);
}

function setLocale(locale) {
    if (!root) return;

    I18.init(locale);
    I18.load(() => {
        Storage.save(STORAGE_LANGUAGE_KEY, I18.currentLocale);
        Controller.updateLocale();
        root.render(<MainLayout/>);
    });
}

window.addEventListener("load", run, false);