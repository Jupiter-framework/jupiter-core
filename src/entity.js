
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

export function registerRequier(type, requier) {
  if (!entityTypes[type]) {
    throw new Error(`${type} not exist in type registry`);
  }

  entityTypes[type].requier = requier;

  return entityTypes[type];
}

export function registerType(name, dirPath, requirer) {
  const registryItem = setTypeToRegistry(
    createTypeMap.apply(this, arguments), entityTypes
  );

  if (requirer) {
    return registerRequier(name, requirer);
  }

  return registryItem;
}

export function getType(name) {
  return entityTypes[name];
}

export function get(type, entityPath) {
  const typeOptions = entityTypes[type];

  return (entityTypes[type].requier || require)(
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
