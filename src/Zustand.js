import create from 'zustand'

const useMovieStore = create((set) => ({
    user: {},
    setUser: (newUser) => set(state => ({ user: newUser })),

    searchQuery: [],
    setSearchQuery: (movie) => set((state) => ({ searchQuery: movie })),
}))

export default useMovieStore