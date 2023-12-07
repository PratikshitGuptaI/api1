'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventSpeakers extends Model {
    static associate(models) {
      
      // console.log('Starting EventDays association setup...');
      EventSpeakers.belongsTo(models.EventDays, { foreignKey: 'id' });
      // console.log('Finished EventDays association setup');
    }
  }
  EventSpeakers.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    day_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    speaker_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    speaker_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    speaker_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    speaker_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue: Sequelize.fn('NOW')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue: Sequelize.fn('NOW')
    },
  }, {
    sequelize,
    modelName: 'event_speakers',
    timestamps:false
  });
  return EventSpeakers;
};