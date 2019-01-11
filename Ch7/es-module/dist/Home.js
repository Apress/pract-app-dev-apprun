export default class extends Component {
    constructor() {
        super(...arguments);
        this.state = 'Home';
        this.view = (state) => {
            return app.createElement("div", null,
                app.createElement("h1", null, state));
        };
        this.update = {
            '#Home': state => state,
        };
    }
}
//# sourceMappingURL=Home.js.map