import app, { Component } from 'apprun';

class EchoComponent extends Component {

  state = 'World';

  view = (state) => <div>
    <h3>Hello {state}</h3>
    <input oninput={e => this.run("input", e)} />
  </div>;

  update = {
    'input': (state, e) => e.target.value
  }
}

new EchoComponent().start('my-app');