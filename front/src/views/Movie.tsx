import { useState, useEffect } from "react";
import MovieInfo from "components/movieInfo";
import CommentSection from "components/ComentSection";
import { useParams } from "react-router-dom";

interface Comment {
  userId: number;
  movieId: number;
  commentText: string;
  commentDate: string;
  name: string;
  linkFoto: string;
}

const Movie = () => {
  const { movieId } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://localhost:7269/api/comments/GetCommentsMovie/${movieId}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error('Failed to fetch comments:', response.statusText);
        }
      } catch (error: any) {
        console.error('Failed to fetch comments:', error.message);
      }
    };  
    fetchComments();
  }, [movieId]);  

  const addComment = async (newComment: Comment) => {
    try {
      const response = await fetch("https://localhost:7269/api/comments/AddComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
  
      if (response.ok) {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
      } else {
        const errorMessage = await response.text();
        console.error("Failed to add comment. Status:", response.status, "Message:", errorMessage);
      }
    } catch (error: any) {
      console.error("Failed to add comment:", error.message);
    }
  };
  
  return (
    <>
      <main className="flex flex-col gap-y-6">
        <MovieInfo movieId={movieId} />
        <CommentSection comments={comments} addComment={addComment} />
      </main>
    </>
  );
};

export default Movie;
