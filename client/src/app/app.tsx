import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Tickets from './components/tickets/tickets';
import { useUsersState } from './state/usersState';
import TicketDetails from './ticket-details/ticket-details';

const App = () => {
  const { getAllUsers } = useUsersState();

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <Routes>
        <Route path="/" element={<Tickets />} />
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
    </div>
  );
};

export default App;
