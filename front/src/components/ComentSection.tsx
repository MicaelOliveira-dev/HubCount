import React, { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import Title from "./Title";
import Button from "./button";
import { useParams } from "react-router-dom";

interface Comment {
  userId: number;
  movieId: number;
  commentText: string;
  commentDate: string;
  name: string; 
  linkFoto: string;
}

interface CommentSectionProps {
  comments: Comment[];
  addComment: (newComment: Comment) => void;
}

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <div className="p-4 rounded flex flex-col">
      <div className="flex items-start mb-2">
        <img
          className="rounded-full w-8 h-8 mr-4"
          src={comment.linkFoto} 
          alt={`Imagem de perfil do usuário`}
        />
        <div>
          <strong>{comment.name}</strong>: {comment.commentText} 
        </div>
      </div>
      <div className="flex items-center text-gray-500 text-sm">
        <small className="text-xs">{comment.commentDate.replace("T", " ").slice(0, 19)}</small>
      </div>
    </div>
  );
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments, addComment }) => {
  const [newComment, setNewComment] = useState({ commentText: "" });
  const { movieId: movieIdParam } = useParams<{ movieId?: string }>();
  const movieId = movieIdParam ? parseInt(movieIdParam) : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setNewComment({ commentText: value });
  };

  const handleAddComment = async () => {
    if (newComment.commentText.trim()) {
      const currentDate = new Date().toISOString();
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName');
      const userPhoto = localStorage.getItem('userPhoto');
      const updatedComment: Comment = {
        userId: userId ? parseInt(userId) : 0,
        movieId: movieId,
        commentText: newComment.commentText.trim(),
        commentDate: currentDate,
        name: userName ? userName : "", 
        linkFoto: userPhoto ? userPhoto : "", 
      };

      try {
        await addComment(updatedComment);
        setNewComment({ commentText: "" });
      } catch (error: any) {
        console.error('Failed to add comment:', error.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-4 pt-[20px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto border-t border-primaryBgBorder">
      <Title bold center={false} green={false} message="Seção de Comentários" />
      <div className="flex flex-col-reverse w-full md:w-3/5">
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <CommentItem key={index} comment={comment} /> // Usando o índice do array como chave
          ))}
        </div>

        <div className="flex items-start mb-3">
          <div className="relative w-full">
            <textarea
              name="commentText"
              placeholder="Escreva seu comentário..."
              className="w-full p-2 rounded-lg bg-primaryBgBorder outline-none text-sm shadow-lg"
              rows={4}
              value={newComment.commentText}
              onChange={handleInputChange}
            />
            <div className="flex flex-wrap gap-2 items-center justify-start md:justify-end ">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-end gap-2">
                <Button
                  green={false}
                  onlyBorder
                  small
                  onClick={() => setNewComment({ commentText: "" })}
                >
                  {" "}
                  Cancelar
                  <FaTimes className="ml-2" />
                </Button>
                <Button
                  green
                  onlyBorder={false}
                  small
                  onClick={handleAddComment}
                >
                  Enviar Comentário
                  <FaPaperPlane className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
