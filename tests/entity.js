
import { join } from 'path';

import { expect } from 'chai';
import { Map as map } from 'immutable';

import { registerType, getType, getAs, get, setDir, getDir } from '../src/entity';

describe('Entity', function() {
  const pathDir = join(__dirname, 'assets');

  describe('api spec', function() {
    it('should have functions', function() {
      [registerType, getType, getAs, get, setDir, getDir].forEach(function(func) {
        expect(func).to.be.ok.and.to.be.a('function');
      });
    });
  });

  describe('directory option', function() {
    it('should return initialy undefined', function() {
      expect(getDir()).to.be.not.ok;
    });

    it('.setDir should return setted dirctory', function() {
      expect(setDir(pathDir)).to.be.equal(pathDir);
    });

    it('.getDir should return setted directory', function() {
      expect(getDir()).to.be.equal(pathDir);
    });
  });

  describe('register', function() {
    const name = 'entity';
    const formats = ['js', 'coffee', 'node'];

    const expectedMap = map({
      dir: pathDir,
      typeName: name,
    });

    it('should be return a correct structure', function() {
      expect(registerType(name, pathDir, formats)).to.be.eql(expectedMap);
    });

    it('should return registred type from registry', function() {
      expect(getType(name)).to.be.eql(expectedMap);
    });
  });

  describe('get entity', function() {
    it('should return module value', function() {
      expect(get('entity', 'module1')).to.be.eql('module1');
    });

    it('should return nesetd module value', function() {
      expect(get('entity', 'nested/module2')).to.be.eql('nested module2');
    });
  });

  describe('getAs generator', function() {
    const getEntity = getAs('entity');

    it('should be return a function', function() {
      expect(getAs('entity')).to.be.a('function');
    });

    it('should be return a moule', function() {
      expect(getEntity('module1')).to.be.eql('module1');
    });

    it('should be return a туыеув moule', function() {
      expect(getEntity('nested/module2')).to.be.eql('nested module2');
    });
  });
});
