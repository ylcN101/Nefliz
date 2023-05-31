import { create } from 'zustand'

export interface ModalStoreInterface {
  movieId?: string
  isOpen: boolean
  openModal: (movieId: string) => void
  closeModal: () => void
  openSearchModal: (search: string) => void
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId: string) => set({ isOpen: true, movieId }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
  openSearchModal: () => set({ isOpen: true, movieId: undefined }),
}))

export default useInfoModal
