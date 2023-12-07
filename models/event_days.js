'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventDays extends Model {
    static associate(models) {
      
      // console.log('Starting Event association setup...');
      EventDays.belongsTo(models.Event, { foreignKey: 'id' });
      // console.log('Finished Event association setup');
      // console.log('Starting EventSpeakers association setup...');
      EventDays.hasMany(models.EventSpeakers, { foreignKey: 'day_id',sourceKey:'id' })
      // console.log('Finished EventSpeakers association setup');
    }
  }
  EventDays.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    speakers_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speakers_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue: sequelize.fn('NOW')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue: sequelize.fn('NOW')
    },
  }, {
    sequelize,
    modelName: 'event_days',
    timestamps:false
  });
  return EventDays;
}; 