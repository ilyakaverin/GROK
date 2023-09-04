import React from 'react';
import styles from './Content.module.scss';
import { Comment } from '@api/forum/types';
import { CommentItem } from '../comment';

interface IContent {
  comments?: Comment[];
}

export const Content: React.FC<IContent> = ({ comments }) => {
  if (!comments) {
    return (
      <div className={styles.content__wrap}>
        <div className={styles.content__content}>
          <p className={styles.content__text}>Нет комментариев</p>
        </div>
      </div>
    );
  }

  return (
    <ul>
      {comments?.map((comment) => (
        <li key={comment.id}>
          <CommentItem comment={comment} />
        </li>
      ))}
    </ul>
  );
};
