# basic-utils [![build status](https://travis-ci.org/simon-p-r/basic-utils.svg?branch=master)](https://travis-ci.org/simon-p-r/basic-utils)

Basic JS utils module

### API

#### Types

###### isObj

 - Returns boolean

###### isString

  - Returns boolean

###### isArray

  - Returns boolean

###### isDate

  - Returns boolean

###### isRegex

  - Returns boolean

###### isFunction

  - Returns boolean

###### isNumber

  - Returns boolean

###### isNan

  - Returns boolean

###### isUndefined

  - Returns boolean

###### isNull

  - Returns boolean

###### isObjectID

  - Returns boolean

###### isIp

  - Returns boolean

###### isIp4

  - Returns boolean

###### isIp6

  - Returns boolean

###### isMac

  - Returns boolean

###### isFQDN

  - Returns boolean

###### isInt8

- Returns boolean

###### isUint8

- Returns boolean

###### isInt16

- Returns boolean

###### isUint16

- Returns boolean

###### isInt32

- Returns boolean

###### isUint32

- Returns boolean

#### Utils

###### iterateObj

   - prints object key pairs with a tilde delimiter

###### format

   - formats a string

###### deepFreeze

   - returns a recursive frozen object

###### serialize

  - Returns either an error object or a json serialized string

###### deserialize

  - Returns either an error object or an js object deserialized from a json string

#### FileSystem

###### dirExists

  - Returns boolean if directory exists

###### fileExists

  - Returns boolean if file exists

###### rmDirSync

 - recursively deletes a directory sync

###### rmDir

 - recursively deletes a directory async

###### mkDirSync

 - recursively makes directory sync

###### mkDir
 - recursively makes directory async


##### Todo

 - improve docs
 - add more tests
