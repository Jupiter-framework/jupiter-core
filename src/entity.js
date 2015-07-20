
/**
 * Dependencies
 */
import { join } from 'path';

let dir;

const entityTypes = {};

function createTypeMap(name, dirPath) {
  return {
    dir: dirPath,
    typeName: name,
  };
}

function setTypeToRegistry(type, registry) {
  registry[type.typeName] = type;

  return type;
}

function getRequierFunction(type) {
  const formats = type.formats;
  if (!formats || !type.requier) {
    return require;
  }

  return type.requier;
}

export function registerRequier(type, formats, requier) {
  if (!entityTypes[type]) {
    throw new Error(`${type} not exist in type registry`);
  }

  entityTypes[type].formats = formats;
  entityTypes[type].requier = requier;

  return entityTypes[type];
}

export function registerType(name, dirPath, formats, requirer) {
  const registryItem = setTypeToRegistry(
    createTypeMap.apply(this, arguments), entityTypes
  );

  if (formats && requirer) {
    return registerRequirer(name, formats, requirer);
  }

  return registryItem;
}

export function getType(name) {
  return entityTypes[name];
}

export function get(type, entityPath) {
  const typeOptions = entityTypes[type];

  return getRequierFunction(entityTypes[type], entityPath)(
    join(typeOptions.dir, entityPath)
  );
}

export function getAs(type) {
  return function(entityPath) {
    return get(type, entityPath);
  };
}

export function setDir(settedDir) {
  if (dir) { return dir; }

  dir = settedDir;

  return dir;
}

export function getDir() {
  return dir;
}
