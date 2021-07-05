'use babel';
const {CompositeDisposable} = require('atom');

const addMarker = (editor, marker) => {
  // abort early
  if (!editor.replaceSelectedText) {
    return '';
  }

  return editor.replaceSelectedText(null, text => {
    return (text === '') ? '' : `${marker}$selection${'}'}`.replace('$selection', text);
  });
};

class mdwrap {
  constructor() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'atom-latex-wrapper:bold': this.bold,
        'atom-latex-wrapper:italic': this.italic,
        'atom-latex-wrapper:emph': this.emph
      })
    );
  }

  destroy() {
    this.subscriptions.dispose();
  }

  paste(editor, selection, clipboard) {
    // abort early
    if (!editor.insertText || !clipboard) {
      return;
    }

    let insert;

    if (editor && selection && clipboard) {
      insert = '[$selection]($href)'
        .replace('$selection', selection)
        .replace('$href', clipboard);
    }

    if (!validUrl.isWebUri(clipboard) && !clipboard.match(/^#/)) {
      throw new Error('Not a valid URL or #anchor');
    }

    editor.insertText(insert);

    return insert;
  }

  image(editor, selection, clipboard) {
    // abort early
    if (!editor.insertText || !clipboard) {
      return;
    }

    let insert;

    if (editor && clipboard) {
      insert = '![$selection]($href)'
        .replace('$selection', selection || '')
        .replace('$href', clipboard);
    }

    if (!validUrl.isWebUri(clipboard)) {
      throw new Error('Not a valid image URL');
    }

    editor.insertText(insert);

    return insert;
  }

  bold(editor) {
    return addMarker(editor, '\\textbf{');
  }

  italic(editor) {
    return addMarker(editor, '\\textit{');
  }

  strikethrough(editor) {
    return addMarker(editor, '\\emph{');
  }
}

module.exports = mdwrap;
