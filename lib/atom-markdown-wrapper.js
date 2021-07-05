'use babel';
const MDWwrap = require('./mdwrap');

const cb = fn => {
  let editor = atom.workspace.getActiveTextEditor();
  let selection = editor.getSelectedText();
  let clipboard = atom.clipboard.read();

  try {
    return this.mdwrap[fn](editor, selection, clipboard);
  } catch (err) {
    return atom.notifications.addError(err.message, {
      dismissable: true,
      detail: clipboard,
      icon: 'zap'
    });
  }
};

module.exports = {
  config: {},
  activate: () => {
    this.mdwrap = new MDWwrap();

    this.command = atom.commands.add('atom-text-editor', {
      'atom-latex-wrapper:bold': cb.bind(this, 'bold'),
      'atom-latex-wrapper:italic': cb.bind(this, 'italic'),
      'atom-latex-wrapper:emph': cb.bind(this, 'emph')
    });

    return this.command;
  },
  deactivate: () => {
    this.command.dispose();

    return this.mdwrap.destroy();
  }
};
