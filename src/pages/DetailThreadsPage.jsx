import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncCreateComment,
  asyncDownVoteComment,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteComment,
  asyncNeutralizeVoteThreadDetail,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
  asyncUpVoteThreadDetail,
} from '../states/threadDetail/action';
import Card from '../components/elements/card/Card';
import ThreadDetail from '../components/fragments/ThreadDetail';
import CommentInput from '../components/fragments/CommentInput';
import CommentList from '../components/fragments/CommentList';

export default function DetailThreads() {
  const { threadId } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [threadId, dispatch]);

  const onUpVoteThreadDetail = () => {
    dispatch(asyncUpVoteThreadDetail());
  };

  const onDownVoteThreadDetail = () => {
    dispatch(asyncDownVoteThreadDetail());
  };

  const onNeutralizeVoteThreadDetail = () => {
    dispatch(asyncNeutralizeVoteThreadDetail());
  };

  const onCommentSubmit = (content) => {
    dispatch(asyncCreateComment({ content }));
  };

  const onUpVoteComment = (id) => {
    dispatch(asyncUpVoteComment(id));
  };

  const onDownVoteComment = (id) => {
    dispatch(asyncDownVoteComment(id));
  };

  const onNeutralizeVoteComment = (id) => {
    dispatch(asyncNeutralizeVoteComment(id));
  };

  if (!threadDetail) {
    return null;
  }
  return (
    <div className="container mx-auto max-w-3xl p-5 flex flex-col gap-5">
      <Card>
        <ThreadDetail
          {...threadDetail}
          authUser={authUser.id}
          upVoteThreadDetail={onUpVoteThreadDetail}
          downVoteThreadDetail={onDownVoteThreadDetail}
          neutralizeVoteThreadDetail={onNeutralizeVoteThreadDetail}
        />
        <CommentInput addComment={onCommentSubmit} />
      </Card>

      <CommentList
        comments={threadDetail.comments}
        authUser={authUser.id}
        upVoteComment={onUpVoteComment}
        downVoteComment={onDownVoteComment}
        neutralizeVoteComment={onNeutralizeVoteComment}
      />
    </div>
  );
}
