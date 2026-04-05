import Filter from './Filter.js';
import Mask from './Mask.js';
import Grayscale from './Grayscale.js';

const list = [
    Filter,
    Mask,
    Grayscale
];

function getFilterByType(type) {
    for(let item of list) {
        if(item.type === type) {
            return item;
        }
    }
    return null;
}

export { getFilterByType };
export default list;