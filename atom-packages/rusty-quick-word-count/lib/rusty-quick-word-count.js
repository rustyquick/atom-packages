'use babel';

import RustyQuickWordCountView from './rusty-quick-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  rustyQuickWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.rustyQuickWordCountView = new RustyQuickWordCountView(state.rustyQuickWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.rustyQuickWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rusty-quick-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.rustyQuickWordCountView.destroy();
  },

  serialize() {
    return {
      rustyQuickWordCountViewState: this.rustyQuickWordCountView.serialize()
    };
  },

  toggle() {
    console.log('RustyQuickWordCount was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
