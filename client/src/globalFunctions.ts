import { Ticket, User } from '@acme/shared-models';

export const getAssignedUser = (
  ticket: Ticket,
  users: User[]
): User | undefined => {
  if (ticket.assigneeId == null) {
    return undefined;
  } else {
    return users.find((user) => {
      return user.id === ticket.assigneeId;
    });
  }
};
