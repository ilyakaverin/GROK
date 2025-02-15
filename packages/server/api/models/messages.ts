import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'
import { sequelize } from '../sequelize'
import { Users, Topics } from './'

// Модель таблицы Messages
export type TMessage = {
  id: number
  user_id: number
  text: string
  topic_id: number
  parent_message_id?: number
  created_at?: Date
}

const messageOptions = {
  timestamps: false,
  tableName: 'Messages',
  indexes: [
    {
      unique: false,
      fields: ['topic_id'],
    },
    {
      unique: false,
      fields: ['parent_message_id'],
    },
  ],
}

const messageModel: ModelAttributes<Model, TMessage> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  text: {
    type: DataType.TEXT,
    allowNull: false,
  },
  topic_id: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: Topics,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  parent_message_id: {
    type: DataType.INTEGER,
    references: {
      model: 'Messages',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  created_at: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
}

const Messages = sequelize.define('Messages', messageModel, messageOptions)

Messages.belongsTo(Topics, { foreignKey: 'topic_id' })
Topics.hasMany(Messages, { foreignKey: 'topic_id' })
Messages.belongsTo(Users, { foreignKey: 'user_id' })
Messages.belongsTo(Messages, { foreignKey: 'parent_message_id' })
Messages.hasMany(Messages, { foreignKey: 'parent_message_id' })

export { Messages }
