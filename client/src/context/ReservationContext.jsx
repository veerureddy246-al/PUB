import React, { createContext, useContext, useState, useCallback } from 'react';

const ReservationContext = createContext(null);

export const ReservationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialParams, setInitialParams] = useState({
    deckZone: 'sky-deck',
    partySize: 2,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '20:00',
    occasion: 'casual'
  });

  const openReservation = useCallback((customParams = {}) => {
    setInitialParams(prev => ({
      ...prev,
      ...customParams
    }));
    setIsOpen(true);
  }, []);

  const closeReservation = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ReservationContext.Provider value={{ isOpen, initialParams, openReservation, closeReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservationModal = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservationModal must be used within a ReservationProvider');
  }
  return context;
};
