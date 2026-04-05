import MaxRectsPacker from "./MaxRectsPacker.js";
import MaxRectsBin from "./MaxRectsBin.js";
import OptimalPacker from "./OptimalPacker.js";

const list = [
    MaxRectsBin,
    MaxRectsPacker,
    OptimalPacker
];

function getPackerByType(type) {
    for(let item of list) {
        if(item.type === type) {
            return item;
        }
    }
    return null;
}

export { getPackerByType };
export default list;