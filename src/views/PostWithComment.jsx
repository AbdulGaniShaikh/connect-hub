import useErrorBehavior from 'hooks/useErrorBehavior';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from 'service';
import Post from 'components/shared/Post';
import BackButton from 'components/buttons/BackButton';

const PostWithComment = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const defaultErrorBehavior = useErrorBehavior();

  const fetchPost = async () => {
    try {
      const res = await postService.getPost(postId);
      setPost(res.data.payload);
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  useEffect(() => {
    if (!postId) return;
    fetchPost();
  }, [postId]);

  return (
    <div className="w-full">
      <div className="pl-3 mt-3 text-[#acacac]">
        <BackButton />
        Go back
      </div>
      <Post {...post} />
    </div>
  );
};

export default PostWithComment;
