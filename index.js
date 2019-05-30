const express = require('express')
const app = express()
const port = 4000
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:secret@localhost:5432/postgres",
  { define: { timestamps: false } }
);
const bodyParser = require("body-parser");

const ad = sequelize.define(
  "ads",
  {
    title: Sequelize.TEXT,
    description: Sequelize.TEXT,
    picture: Sequelize.TEXT,
    price: Sequelize.INTEGER,
    email: Sequelize.TEXT,
    phone_number: Sequelize.TEXT
  },
  {
    tableName: "ads"
  }
);

app.use(bodyParser.json());
ad.sync({force: true}).then(function () {
  // Table created
  return ad.create({
    title: 'Swing',
    description: 'Childrens swing',
    picture: 'abc.com',
    price: 12,
    email: 'hello@at.com',
    phone_number: '123894289'
  });
});
app.get('/ads', function (req, res, next) {
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0
  ad.findAll({limit,offset})
  .then(ads => {
    res.json({ads:ads})
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))