import create from 'zustand'

const useMovieStore = create((set) => ({
    searchQuery: [],
    setSearchQuery: (movie) => set((state) => ({ searchQuery: movie })),
}))

export default useMovieStore