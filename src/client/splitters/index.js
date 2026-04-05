import Grid from './Grid.js';
import JsonHash from './JsonHash.js';
import JsonArray from './JsonArray.js';
import XML from './XML.js';
import UIKit from './UIKit.js';
import Spine from './Spine.js';

const list = [
    Grid,
    JsonHash,
    JsonArray,
    XML,
    UIKit,
    Spine
];

function getSplitterByType(type) {
    for(let item of list) {
        if(item.type === type) {
            return item;
        }
    }
    return null;
}

function getSplitterByData(data, cb) {
    for(let item of list) {
        if(item.type !== Grid.type) {
            item.check(data, (checked) => {
                if(checked) {
                    if(cb) {
                        cb(item);
                        cb = null;
                    }
                }
            });
        }
    }
    
    return getDefaultSplitter();
}

function getDefaultSplitter() {
    return Grid;
}

export { getSplitterByType, getSplitterByData, getDefaultSplitter };
export default list;