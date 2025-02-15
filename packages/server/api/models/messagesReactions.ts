import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'
import { sequelize } from '../sequelize'
import { Users, Messages } from './'

// Модель таблицы MessagesReactions
export type TMessageReaction = {
  message_id: number
  user_id: number
  reaction_id: number
}

const messageReactionOptions = {
  timestamps: false,
  tableName: 'MessagesReactions',
}

const messageReactionModel: ModelAttributes<Model, TMessageReaction> = {
  message_id: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: Messages,
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  user_id: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  reaction_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}

const MessagesReactions = sequelize.define(
  'MessagesReactions',
  messageReactionModel,
  messageReactionOptions
)

export { MessagesReactions }
