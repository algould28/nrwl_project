import { Ticket, User } from '@acme/shared-models';
import {
  Card,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_SPACING, UNASSIGNED_USER } from '../../constants';
import { useTicketsState } from '../../state/ticketsState';
import { useUsersState } from '../../state/usersState';
import { theme } from '../../styles/theme';
import DefaultSpacer from '../common/spacers/defaultSpacer';
import CardDescriptionText from '../text/cardDescriptionText';
import CardHeaderText from '../text/cardHeaderText';
import CardSubheaderText from '../text/cardSubHeaderText';

export interface TicketCardProps {
  ticket: Ticket;
  user: User | undefined;
  isDetailsCard: boolean;
}

export function TicketCard(props: TicketCardProps) {
  const ticket = props.ticket;
  const { users } = useUsersState();
  const navigate = useNavigate();

  const [isCompleted, setIsCompleted] = useState(ticket.completed);
  const [assignedUser, setAssignedUser] = useState<User>(
    props.user ?? UNASSIGNED_USER
  );

  const { markTicketAsComplete, markTicketAsNotComplete, assignUserToTicket } =
    useTicketsState();

  const toggleCompleted = (event: any) => {
    event.stopPropagation();
    isCompleted
      ? markTicketAsNotComplete(ticket.id)
      : markTicketAsComplete(ticket.id);

    setIsCompleted(!isCompleted);
  };

  const handleAssignedUserChange = (event: SelectChangeEvent) => {
    event.stopPropagation();
    const newUserName = event.target.value as string;
    const newAssignedUser = getAssignedUser(newUserName, users);

    if (newUserName === 'Not Assigned') {
      setAssignedUser(UNASSIGNED_USER);
    } else {
      setAssignedUser(newAssignedUser || UNASSIGNED_USER);
    }

    assignUserToTicket(ticket.id, newAssignedUser?.id || UNASSIGNED_USER.id);
  };

  const handleCardClick = () => {
    if (!props.isDetailsCard) {
      navigate(`/${ticket.id}`);
    }
  };

  const getAssignedUser = (
    userName: string,
    users: User[] | undefined
  ): User | undefined => {
    if (users === undefined) {
      return undefined;
    }
    return users.find((user) => {
      return user.name === userName;
    });
  };

  return (
    <Card
      sx={{
        padding: 2,
        width: '100%',
        marginBottom: DEFAULT_SPACING,
        cursor: props.isDetailsCard ? 'default' : 'pointer',
      }}
      onClick={handleCardClick}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CardHeaderText color={theme.colors.text} text={`#${ticket.id}`} />
        {!props.isDetailsCard && (
          <Select
            id="ticket-assignee-select"
            labelId="ticket-assignee-select=label"
            label="Assignee"
            value={assignedUser.name}
            variant="standard"
            onChange={handleAssignedUserChange}
            onClick={(event: any) => event.stopPropagation()}
          >
            <MenuItem value="Not Assigned">Not Assigned</MenuItem>
            {users != null &&
              users.map((user) => (
                <MenuItem key={`${user.name}-${user.id}`} value={user.name}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
        )}
        {props.isDetailsCard && (
          <CardSubheaderText
            color={theme.colors.text}
            text={`Assigned to: ${assignedUser.name}`}
          />
        )}
      </div>
      <DefaultSpacer />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <CardDescriptionText
          text={ticket.description}
          color={theme.colors.text}
        />
        {!props.isDetailsCard && (
          <Switch checked={isCompleted} onClick={toggleCompleted} />
        )}
        {props.isDetailsCard && (
          <CardSubheaderText
            color={
              ticket.completed ? theme.colors.success : theme.colors.warning
            }
            text={`Status: ${ticket.completed ? 'Completed' : 'Not Completed'}`}
          />
        )}
      </div>
    </Card>
  );
}

export default TicketCard;
