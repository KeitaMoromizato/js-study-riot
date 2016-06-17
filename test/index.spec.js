import jsdom from 'jsdom';
import { readFileSync } from 'fs';
import { compile } from 'riot';
import assert from 'power-assert';

const riot = readFileSync(require.resolve('riot/riot'), 'utf-8');
const tag = compile(readFileSync('./client/name.tag', 'utf-8'));

describe('riot sample', () => {

  context('name tag', () => {

    it('should rendering', (done) => {

      jsdom.env({
        html: '<div><name /></div>',
        src: [riot, tag],
        done: (err, window) => {
          const names = window.riot.mount('name', {user: {last: 'hoge', first: 'huga'}});

          const document = window.document;

          assert(document.querySelector('h1').innerHTML === 'hoge - huga');
          done();
        }
      });
    });
  });
});
