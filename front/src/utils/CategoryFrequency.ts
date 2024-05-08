import { AllCategories } from "data/Categories";
import { MovieModel } from "models/entities/Movie";

export const findTheMostRepeatedCategory = (movies: MovieModel[], localStorageName: string) => {
    const categoryCount = new Map<number, number>();
    for (const movie of movies) {
      for (const genre of movie.genreIds) {
        const categoryId = AllCategories.find(
          (cat) => cat.id === Number(genre)
        );
        if (categoryId) {
          categoryCount.set(
            categoryId.id,
            (categoryCount.get(categoryId.id) || 0) + 1
          );
        }
      }
    }

    let mostFrequentCategoryCount = 0;
    let maxCount = 0;
    for (const [categoryId, count] of categoryCount.entries()) {
      if (count > maxCount) {
        mostFrequentCategoryCount = categoryId;
        maxCount = count;
      }
    }
    localStorage.setItem(
      localStorageName,
      JSON.stringify(mostFrequentCategoryCount)
    );
    return mostFrequentCategoryCount;
  };