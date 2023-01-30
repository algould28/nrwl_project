import { User } from '@acme/shared-models';
import { create } from 'zustand';

export interface UsersState {
  users: User[] | undefined;
  usersIsLoading: boolean;

  getAllUsers: () => void;
  clearUsersState: () => void;
}

export const useUsersState = create<UsersState>((set: any) => ({
  users: undefined,
  usersIsLoading: false,

  getAllUsers: async () => {
    set({ usersIsLoading: true });
    const usersResponse = await fetch('/api/users');

    if (usersResponse.ok) {
      set({ users: await usersResponse.json() });
    } else {
      set({ users: [] });
    }
    set({ usersIsLoading: false });
  },

  clearUsersState: () => {
    set({
      users: undefined,
      usersIsLoading: false,
    });
  },
}));
