'use strict'
import dotenv from 'dotenv';
import { readdirSync } from 'fs'
import { basename as _basename, join, dirname } from 'path'
import Sequelize, { DataTypes } from 'sequelize';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development'
dotenv.config();

// const config = require(__dirname + '/../config/config.json')[env]
const db = {}
console.log(process.env.DB_NAME);
let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "127.0.0.1",
    dialect: "mysql", });

const files = readdirSync(__dirname)
    .filter(
        (file) => file.indexOf('.') !== 0
            && file !== _basename(__filename)
            && file.slice(-3) === '.js',
    );

for await (const file of files) {
    const model = await import(`./${file}`);
    const namedModel = model.default(sequelize, DataTypes);
    db[namedModel.name] = namedModel;
}
sequelize.sync();

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export { db }