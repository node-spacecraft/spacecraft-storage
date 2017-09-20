const Component = require('spacecraft/component');
const path = require('path');
const version = require('../package.json').version;
const Sequelize = require('sequelize');
const mkdirp = require('mkdirp');
const fs = require('fs');
const logger = require('spacecraft-logger')();

const defaultUri = "sqlite://" + path.resolve(process.cwd(), './db/database.db');

class Storage extends Component {
  constructor(uri = defaultUri) {
    super();
    this.uri = uri;
    this.options = {
      logging: false,
    }
  }

  getInfo() {
    return {
      name: 'storage',
      version: version
    }
  }

  onMount() {
    super.onMount();
    let dirpath = path.dirname(this.uri.split('://')[1]);
    let dbDirExists = fs.existsSync(dirpath);
    if(!dbDirExists) {
      logger.info('create dir:', dirpath);
      mkdirp.sync(dirpath);
    }
    this.app.storage = new Sequelize(this.uri, this.options);
  }

  onLoad() {

  }

  onUnmount() {
    this.app.storage = undefined;
  }
}

Storage.STRING = Sequelize.STRING;
Storage.TEXT = Sequelize.TEXT;
Storage.INTEGER = Sequelize.INTEGER;
Storage.BIGINT = Sequelize.BIGINT;
Storage.FLOAT = Sequelize.FLOAT;
Storage.REAL = Sequelize.REAL;// PostgreSQL only.
Storage.DOUBLE = Sequelize.DOUBLE;
Storage.DECIMAL = Sequelize.DECIMAL;
Storage.DATE = Sequelize.DATE;
Storage.DATEONLY = Sequelize.DATEONLY;
Storage.BOOLEAN = Sequelize.BOOLEAN;
Storage.ENUM = Sequelize.ENUM;
Storage.ARRAY = Sequelize.ARRAY;// PostgreSQL only.
Storage.JSON = Sequelize.JSON;// PostgreSQL only.
Storage.JSONB = Sequelize.JSONB;// PostgreSQL only.
Storage.BLOB = Sequelize.BLOB;// PostgreSQL only.
Storage.UUID = Sequelize.UUID;
Storage.RANGE = Sequelize.RANGE;// PostgreSQL only.
Storage.ARRAY = Sequelize.ARRAY;// PostgreSQL only.
Storage.GEOMETRY = Sequelize.GEOMETRY;// PostgreSQL (with PostGIS) or MySQL only.

module.exports = Storage;
