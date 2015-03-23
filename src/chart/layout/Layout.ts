import Transform = require('../../chartModel/data/transform/Transform');

interface Layout {
    transform?: Transform;
    layout(selection: D3.Selection);
}

export = Layout;
