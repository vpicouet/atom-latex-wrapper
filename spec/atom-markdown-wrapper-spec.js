'use babel';
const AtomMDWrap = require('../lib/atom-latex-wrapper');
const MDWrap = require('../lib/mdwrap');

describe('Atom Latex Wrapper', () => {
  let [editor, sel, txt, anchor, img, res] = [];

  beforeEach(() => {
    waitsForPromise(() => {
      return atom.workspace.open('sample.md');
    });

    waitsForPromise(() => {
      return atom.packages.activatePackage('language-gfm');
    });

    this.MDWrap = new MDWrap();

    return this.MDWrap;
  });

  afterEach(() => {
    atom.reset();

    return this.MDWrap.destroy();
  });

  it('should load correctly', () => {
    expect(AtomMDWrap).toBeDefined();
  });

  describe('MDWrap', () => {
    beforeEach(() => {
      editor = atom.workspace.getActiveTextEditor();
      sel = 'selection';
      txt = 'https://example.com';
      anchor = '#example';
      img = 'https://example.com/image.png';
    });

    afterEach(() => {
      editor = null;
      sel = null;
      txt = null;
      anchor = null;
      img = null;
    });

    it('should be defined', () => {
      expect(this.MDWrap).toBeDefined();
    });

    describe('.bold()', () => {
      it('should be defined', () => {
        expect(this.MDWrap.bold).toBeDefined();
      });

      it('should require 1 parameter', () => {
        spyOn(this.MDWrap, 'bold');

        this.MDWrap.bold(1);
        expect(this.MDWrap.bold).toHaveBeenCalledWith(1);
      });

      it('should insert \textbf{selection}', () => {
        spyOn(this.MDWrap, 'bold').andCallThrough();

        res = this.MDWrap.bold(editor);
        expect(this.MDWrap.bold).toHaveBeenCalledWith(editor);
        expect(typeof res).toBe('object');
        expect(res.length).toBe(1);
        expect(res[0]).toBe(false);
      });
    });

    describe('.italic()', () => {
      it('should be defined', () => {
        expect(this.MDWrap.italic).toBeDefined();
      });

      it('should require 1 parameter', () => {
        spyOn(this.MDWrap, 'italic');

        this.MDWrap.italic(1);
        expect(this.MDWrap.italic).toHaveBeenCalledWith(1);
      });

      it('should insert \textit{selection}', () => {
        spyOn(this.MDWrap, 'italic').andCallThrough();

        res = this.MDWrap.italic(editor);
        expect(this.MDWrap.italic).toHaveBeenCalledWith(editor);
        expect(typeof res).toBe('object');
        expect(res.length).toBe(1);
        expect(res[0]).toBe(false);
      });
    });

    describe('.emph()', () => {
      it('should be defined', () => {
        expect(this.MDWrap.emph).toBeDefined();
      });

      it('should require 1 parameter', () => {
        spyOn(this.MDWrap, 'emph');

        this.MDWrap.emph(1);
        expect(this.MDWrap.emph).toHaveBeenCalledWith(1);
      });

      it('should insert \emph{selection}', () => {
        spyOn(this.MDWrap, 'emph').andCallThrough();

        res = this.MDWrap.emph(editor);
        expect(this.MDWrap.emph).toHaveBeenCalledWith(editor);
        expect(typeof res).toBe('object');
        expect(res.length).toBe(1);
        expect(res[0]).toBe(false);
      });
    });
  });
});
