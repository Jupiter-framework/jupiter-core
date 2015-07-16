
/**
 * Dependencies
 */
import { join } from 'path';
import { Map } from 'immutable';

let dir;

const entityTypes = {};

function createTypeMap (name, dirPath, formats, requirer) {
  return Map({
    dir: dirPath,
    typeName: name
  });
}

function setTypeToRegistry (type, registry) {
  registry[type.get('typeName')] = type;

  return type;
}

export function registerType (name, dirPath) {
  return setTypeToRegistry(
    createTypeMap.apply(this, arguments), entityTypes
  );
}

export function getType (name) {
  return entityTypes[name];
}

export function get (type, entityPath, requireFunction) {
  let typeOptions = entityTypes[type];

  requireFunction = requireFunction || require;

  return requireFunction(join(typeOptions.get('dir'), entityPath));
}

export function getAs (type) {
  return function (entityPath) {
    return get(type, entityPath);
  }
}

export function setDir (settedDir) {
  if (dir) { return dir; }

  dir = settedDir;

  return dir;
}

export function getDir () {
  return dir;
}
