import { useEffect } from "react";
import ReactDOM from "react-dom";
import type { Movie } from "../../types/movie";
import styles from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; 

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; 
    };
  }, [onClose]);

  const modalContent = (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>{movie.title}</h2>
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
            className={styles.image}
          />
        ) : (
          <p>No image available</p>
        )}
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Release date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average}</p>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

