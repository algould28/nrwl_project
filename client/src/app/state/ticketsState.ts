import { Ticket } from '@acme/shared-models';
import { create } from 'zustand';

export interface TicketsState {
  tickets: Ticket[] | undefined;
  getTicketsIsLoading: boolean;
  getTicketByIdIsLoading: boolean;
  createTicketIsLoading: boolean;
  toggleTicketCompletionIsLoading: boolean;
  assignUserToTicketIsLoading: boolean;

  getAllTickets: () => void;
  getTicketById: (ticketId: number) => Promise<Ticket | undefined>;
  createTicket: (description: string) => void;
  markTicketAsComplete: (ticketId: number) => void;
  markTicketAsNotComplete: (ticketId: number) => void;
  assignUserToTicket: (ticketId: number, userId: number) => void;
  clearTicketsState: () => void;
}

export const useTicketsState = create<TicketsState>((set: any, get: any) => ({
  tickets: undefined,
  getTicketsIsLoading: false,
  getTicketByIdIsLoading: false,
  createTicketIsLoading: false,
  toggleTicketCompletionIsLoading: false,
  assignUserToTicketIsLoading: false,

  getAllTickets: async () => {
    set({ getTicketsIsLoading: true, tickets: undefined });
    const ticketsResponse = await fetch('/api/tickets');

    if (ticketsResponse.ok) {
      set({ tickets: await ticketsResponse.json() });
    } else {
      set({ tickets: [] });
    }
    set({ getTicketsIsLoading: false });
  },

  getTicketById: async (ticketId: number): Promise<Ticket | undefined> => {
    set({ getTicketsIsLoading: true });
    const getTicketByIdResponse = await fetch(`/api/tickets/${ticketId}`);
    set({ getTicketsIsLoading: false });

    if (getTicketByIdResponse.ok) {
      return await getTicketByIdResponse.json();
    } else {
      return undefined;
    }
  },

  createTicket: async (description: string) => {
    set({ createTicketIsLoading: true });
    const createTicketResponse = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });

    const responseJSON = await createTicketResponse.json();

    if (responseJSON?.id != null) {
      let tickets = get().tickets;
      tickets.push(responseJSON);
      set({ tickets });
    }

    set({ createTicketIsLoading: false });
  },

  markTicketAsComplete: async (ticketId: number) => {
    set({ toggleTicketCompletionIsLoading: true });
    const markTicketAsCompleteResponse = await fetch(
      `api/tickets/${ticketId}/complete`,
      {
        method: 'PUT',
      }
    );

    if (markTicketAsCompleteResponse.ok) {
      let tickets: Ticket[] = get().tickets;

      const completedTicketIndex = tickets.findIndex(
        (ticket) => ticket.id === ticketId
      );

      if (completedTicketIndex >= 0) {
        const completedTicket = tickets[completedTicketIndex];

        tickets[completedTicketIndex] = { ...completedTicket, completed: true };

        set({ tickets });
      }
    }

    set({ toggleTicketCompletionIsLoading: false });
  },

  markTicketAsNotComplete: async (ticketId: number) => {
    set({ toggleTicketCompletionIsLoading: true });
    const markTicketAsNotCompleteResponse = await fetch(
      `api/tickets/${ticketId}/complete`,
      {
        method: 'DELETE',
      }
    );

    if (markTicketAsNotCompleteResponse.ok) {
      let tickets: Ticket[] = get().tickets;

      const notCompletedTicketIndex = tickets.findIndex(
        (ticket) => ticket.id === ticketId
      );

      if (notCompletedTicketIndex >= 0) {
        const notCompletedTicket = tickets[notCompletedTicketIndex];

        tickets[notCompletedTicketIndex] = {
          ...notCompletedTicket,
          completed: false,
        };

        set({ tickets });
      }
    }

    set({ toggleTicketCompletionIsLoading: false });
  },

  assignUserToTicket: async (ticketId: number, userId: number) => {
    set({ assignUserToTicketIsLoading: true });
    const isUnassign = userId === -1;

    const url = `/api/tickets/${ticketId}/${
      isUnassign ? 'unassign' : `assign/${userId}`
    }`;

    const assignUserToTicketResponse = await fetch(url, {
      method: 'PUT',
    });

    if (assignUserToTicketResponse.ok) {
      let tickets: Ticket[] = get().tickets;

      const assignedTicketIndex = tickets.findIndex(
        (ticket) => ticket.id === ticketId
      );

      if (assignedTicketIndex >= 0) {
        const assignedTicket = tickets[assignedTicketIndex];

        tickets[assignedTicketIndex] = {
          ...assignedTicket,
          assigneeId: isUnassign ? null : userId,
        };

        set({ tickets });
      }
    }

    set({ assignUserToTicketIsLoading: false });
  },

  clearTicketsState: () => {
    set({
      tickets: undefined,
      getTicketsIsLoading: false,
      getTicketByIdIsLoading: false,
      createTicketIsLoading: false,
      toggleTicketCompletionIsLoading: false,
      assignUserToTicketIsLoading: false,
    });
  },
}));
