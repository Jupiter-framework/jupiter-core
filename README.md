# jupiter-core

[![Build Status](https://travis-ci.org/Jupiter-framework/jupiter-core.svg?branch=master)](https://travis-ci.org/Jupiter-framework/jupiter-core)

Core of Jupiter framework for maintaining entity types and create bundles of
components.

## API

### Entity

#### .registerType(typeName, directory, requireFunction)

Register `typeName` module type in `directory`. If `requireFunction` passed,
use it for require module.

**Arguments**
* typeName - { String } Name of type.
* directory - { String } Path of root directory, where located entities of type
* requireFunction - { Function } Optional. Function for require this type module

#### .getType(name)

Return options of `type` module, by name.

**Arguments**
* name - { String } Name of module type

#### .registerRequier(typeName, requireFunction)

Register `requireFunction` for `typeName` modules for require module.

**Arguments**
* type - { Object } Options of type. Use `.getType` for get it.
* requireFunction - { Function } Optional. Function for require this type module

#### .get(typeName, path)

Return `type`-module from `path`, relative `directory` from `type` options.

**Example**
```javascript
registerType('controller', 'path/to/controller/dir');

// return module from path/to/controller/dir/name/controller
get('controller', 'name/controller');
```

**Arguments**
* typeName - { String } Name of type.
* path - { String } Path for module, relative `directory` from `type` options.

### .getAs(typeName)

Return function, with carried first argument.

**Example**
```javascript
registerType('controller', 'path/to/controller/dir');

const getController = getAs('controller');

// return module from path/to/controller/dir/name/controller
getController('name/controller');
```

**Arguments**
* typeName - { String } Name of type module

#### .setDir(directoryPath)

Set root directory by all modules&

**Example**
```javascript
setDir('/project/blog');

registerType('controller', 'path/to/controller/dir');

const getController = getAs('controller');

// return module from /project/blog/path/to/controller/dir/name/controller
getController('name/controller');
```

**Arguments**
* directoryPath - { String } Root path of directory
