export default class extends Component {
    constructor() {
        super(...arguments);
        this.state = 'Contact';
        this.view = (state) => {
            return app.createElement("div", null,
                app.createElement("h1", null, state));
        };
        this.update = {
            '#Contact': state => state,
        };
    }
}
//# sourceMappingURL=Contact.js.map