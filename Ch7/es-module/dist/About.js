// import app, { Component } from 'apprun';
export default class extends Component {
    constructor() {
        super(...arguments);
        this.state = 'About';
        this.view = (state) => {
            return app.createElement("div", null,
                app.createElement("h1", null, state));
        };
        this.update = {
            '#About': state => state,
        };
    }
}
//# sourceMappingURL=About.js.map