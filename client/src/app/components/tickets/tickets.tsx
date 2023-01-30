import { Ticket } from '@acme/shared-models';
import { AddCircle } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Modal,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { getAssignedUser } from 'client/src/globalFunctions';
import { useEffect, useState } from 'react';
import { DEFAULT_SPACING } from '../../constants';
import { useTicketsState } from '../../state/ticketsState';
import { useUsersState } from '../../state/usersState';
import { theme } from '../../styles/theme';
import DefaultSpacer from '../common/spacers/defaultSpacer';
import DefaultVerticalSpacer from '../common/spacers/defaultVerticalSpacer';
import HalfSpacer from '../common/spacers/halfSpacer';
import CardDescriptionText from '../text/cardDescriptionText';
import HeaderText from '../text/headerText';
import SectionHeaderText from '../text/sectionHeaderText';
import TicketCard from './ticketCard';
import TicketsLoader from './ticketsLoader';

export function Tickets() {
  const {
    tickets,
    toggleTicketCompletionIsLoading,
    createTicketIsLoading,
    createTicket,
    getAllTickets,
  } = useTicketsState();
  const { users } = useUsersState();

  const [showTicketInput, setShowTicketInput] = useState(false);
  const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);
  const [uncompletedTickets, setUncompletedTickets] = useState<Ticket[]>([]);
  const [createTicketDescription, setCreateTicketDescription] = useState('');
  const [showCompletedTickets, setShowCompletedTickets] = useState(false);
  const [showUncompletedTickets, setShowUncompletedTickets] = useState(true);

  const handleCreateTicket = () => {
    setShowTicketInput(false);
    createTicket(createTicketDescription);
  };

  const handleCompletedCheckboxClick = () => {
    setShowCompletedTickets(!showCompletedTickets);
  };
  const handleUncompletedCheckboxClick = () => {
    setShowUncompletedTickets(!showUncompletedTickets);
  };

  useEffect(() => {
    if (!toggleTicketCompletionIsLoading && !createTicketIsLoading) {
      setCompletedTickets(
        tickets != null ? tickets.filter((ticket) => ticket.completed) : []
      );
      setUncompletedTickets(
        tickets != null ? tickets.filter((ticket) => !ticket.completed) : []
      );
    }
  }, [tickets, toggleTicketCompletionIsLoading, createTicketIsLoading]);

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <div style={{ width: '40vw' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <HeaderText text="Tickets" color={theme.colors.text} />
        <DefaultVerticalSpacer />

        <IconButton
          color="primary"
          size="large"
          aria-label="Create Ticket"
          onClick={() => setShowTicketInput(true)}
        >
          <AddCircle />
        </IconButton>

        <Modal
          open={showTicketInput}
          onBackdropClick={() => setShowTicketInput(false)}
          onClose={() => setShowTicketInput(false)}
        >
          <Box
            sx={{
              padding: DEFAULT_SPACING,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: theme.colors.surface,
              boxShadow: 24,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '0.25rem',
            }}
          >
            <TextField
              id="ticket-description-input"
              label="Ticket Description"
              variant="outlined"
              multiline
              placeholder="Describe your ticket"
              minRows={4}
              sx={{ width: '20vw' }}
              value={createTicketDescription}
              onChange={(event) =>
                setCreateTicketDescription(event.target.value)
              }
              onSubmit={handleCreateTicket}
            />
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={handleCreateTicket}
              sx={{ marginTop: DEFAULT_SPACING }}
            >
              Create Ticket
            </Button>
          </Box>
        </Modal>
      </div>
      <Divider />
      <DefaultSpacer />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <SectionHeaderText color={theme.colors.text} text="Filters: " />
        <FormControlLabel
          control={
            <Checkbox
              className="completed-checkbox"
              inputProps={{}}
              checked={showCompletedTickets}
              onClick={handleCompletedCheckboxClick}
            />
          }
          label="Completed"
          sx={{ marginLeft: DEFAULT_SPACING }}
        />
        <FormControlLabel
          control={
            <Checkbox
              className="not-completed-checkbox"
              checked={showUncompletedTickets}
              onClick={handleUncompletedCheckboxClick}
            />
          }
          label="Not Completed"
          sx={{ marginLeft: DEFAULT_SPACING }}
        />
      </div>
      <DefaultSpacer />
      <div style={{ padding: '0 0.5rem' }}>
        {tickets != null && users != null ? (
          <>
            {!showCompletedTickets && !showUncompletedTickets && (
              <CardDescriptionText
                color={theme.colors.warning}
                text="You should probably select at least one filter..."
              />
            )}
            {showUncompletedTickets && (
              <>
                <SectionHeaderText
                  text="Not Completed"
                  color={theme.colors.text}
                />
                <HalfSpacer />
                {uncompletedTickets.map((ticket) => (
                  <TicketCard
                    key={`${ticket.id}-${ticket.description}`}
                    ticket={ticket}
                    user={getAssignedUser(ticket, users)}
                    isDetailsCard={false}
                  />
                ))}
                {uncompletedTickets.length === 0 && (
                  <CardDescriptionText
                    color={theme.colors.text}
                    text="Your taskboard is emtpy! Great Job!"
                  />
                )}
              </>
            )}

            {showCompletedTickets && showUncompletedTickets && (
              <DefaultSpacer />
            )}

            {showCompletedTickets && (
              <>
                <SectionHeaderText text="Completed" color={theme.colors.text} />
                <HalfSpacer />
                {completedTickets.map((ticket) => (
                  <TicketCard
                    key={`${ticket.id}-${ticket.description}`}
                    ticket={ticket}
                    user={getAssignedUser(ticket, users)}
                    isDetailsCard={false}
                  />
                ))}
                {completedTickets.length === 0 && (
                  <CardDescriptionText
                    color={theme.colors.text}
                    text="You've completed zero tickets... Lets up that productivity!"
                  />
                )}
              </>
            )}
          </>
        ) : (
          <TicketsLoader />
        )}
      </div>
    </div>
  );
}

export default Tickets;
