import { Response } from 'express'
import type { TForum, TTopic, TMessage, TMessageReaction } from './models'
import { TRequestWithUserData } from '../authMiddleware/typing'

type TForumAction = 'forum.list' | 'forum.create' | 'forum.delete'
type TTopicAction = 'topic.list' | 'topic.create' | 'topic.delete'
type TMessageAction = 'message.list' | 'message.create' | 'message.delete'

export type TApiAction = TForumAction & TTopicAction & TMessageAction
export type TApiData = TForum & TTopic & TMessage & TMessageReaction

export type TPostData = {
  action: TApiAction
  data: TApiData
}

export type TApiResponseData = {
  reason?: string
  data?: object
}

export type TApi = (req: TRequestWithUserData, res: Response) => Promise<void>
