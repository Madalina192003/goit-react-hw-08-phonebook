import React, { useEffect, useState } from 'react';
import { fetchContacts } from '../../services/api';
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import './Contacts.module.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const contactsData = await fetchContacts();
        console.log('Fetched contacts:', contactsData); // Log pentru verificare
        setContacts(contactsData);
      } catch (err) {
        console.error('Error fetching contacts:', err); // Log pentru eroare
        setError('A apărut o eroare la încărcarea contactelor');
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Contacte
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        {contacts.map(contact => (
          <ListItem key={contact.id} className="contactListItem">
            <ListItemText primary={`${contact.name}: ${contact.phone}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Contacts;
