import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { ParticipantManager } from '../components/ParticipantManager';
import { GameProvider } from '../context/GameContext';
import { v4 as uuidv4 } from 'uuid';

// Mock uuid
jest.mock('uuid', () => {
  let counter = 0;
  return {
    v4: jest.fn().mockImplementation(() => `test-uuid-${counter++}`)
  }
});

describe('ParticipantManager', () => {
  const renderParticipantManager = () => {
    return render(
      <GameProvider>
        <ParticipantManager />
      </GameProvider>
    );
  };

  beforeEach(() => {
    (uuidv4 as jest.Mock).mockClear();
  });

  test('renders the participants section with default players', () => {
    renderParticipantManager();
    
    // Check for heading
    expect(screen.getByText('Players')).toBeInTheDocument();
    
    // Check for input field
    expect(screen.getByPlaceholderText('Enter player name')).toBeInTheDocument();
    
    // Check for default players
    expect(screen.getByText('Vanpe')).toBeInTheDocument();
    expect(screen.getByText('Lin')).toBeInTheDocument();
    expect(screen.getByText('Tien')).toBeInTheDocument();
    
    // Check for ready message (3 default players)
    expect(screen.getByText('3 players ready!')).toBeInTheDocument();
  });

  test('adds a participant when form is submitted', async () => {
    renderParticipantManager();
    
    // Get input and submit button
    const input = screen.getByPlaceholderText('Enter player name');
    const addButton = screen.getByRole('button', { name: 'Add' });
    
    // Enter a name and submit
    fireEvent.change(input, { target: { value: 'Test Player' } });
    fireEvent.click(addButton);
    
    // Check that the player was added
    await waitFor(() => {
      expect(screen.getByText('Test Player')).toBeInTheDocument();
    });
    
    // Input should be cleared
    expect(input).toHaveValue('');
    
    // Should now show 4 players
    expect(screen.getByText('4 players ready!')).toBeInTheDocument();
  });

  test('removes a participant when remove button is clicked', async () => {
    renderParticipantManager();
    
    // Add a custom player first
    const input = screen.getByPlaceholderText('Enter player name');
    const addButton = screen.getByRole('button', { name: 'Add' });
    
    fireEvent.change(input, { target: { value: 'Test Player' } });
    fireEvent.click(addButton);
    
    // Verify player was added
    await waitFor(() => {
      expect(screen.getByText('Test Player')).toBeInTheDocument();
    });
    
    // Find and click the remove button for the player we just added 
    // (need to find by text and then find the button within its parent)
    const playerItem = screen.getByText('Test Player').closest('li');
    const removeButton = playerItem?.querySelector('button') as HTMLElement;
    fireEvent.click(removeButton);
    
    // Verify player was removed
    await waitFor(() => {
      expect(screen.queryByText('Test Player')).not.toBeInTheDocument();
    });
  });

  test('displays a ready message with correct player count', async () => {
    renderParticipantManager();
    
    // Should start with 3 players ready
    expect(screen.getByText('3 players ready!')).toBeInTheDocument();
    
    const input = screen.getByPlaceholderText('Enter player name');
    const addButton = screen.getByRole('button', { name: 'Add' });
    
    // Add another player
    fireEvent.change(input, { target: { value: 'Player Extra' } });
    fireEvent.click(addButton);
    
    // Check for updated ready message
    await waitFor(() => {
      expect(screen.getByText('4 players ready!')).toBeInTheDocument();
    });
  });

  test('does not add a participant with empty name', () => {
    renderParticipantManager();
    
    // Count initial number of players (3 default)
    const initialPlayers = screen.getAllByRole('listitem').length;
    
    const addButton = screen.getByRole('button', { name: 'Add' });
    
    // Try to add with empty name
    fireEvent.click(addButton);
    
    // Player count should remain the same
    expect(screen.getAllByRole('listitem').length).toBe(initialPlayers);
  });

  test('trims whitespace from participant names', async () => {
    renderParticipantManager();
    
    const input = screen.getByPlaceholderText('Enter player name');
    const addButton = screen.getByRole('button', { name: 'Add' });
    
    // Enter a name with whitespace
    fireEvent.change(input, { target: { value: '  Spaced Name  ' } });
    fireEvent.click(addButton);
    
    // Check that the player was added with trimmed name
    await waitFor(() => {
      expect(screen.getByText('Spaced Name')).toBeInTheDocument();
    });
  });
}); 