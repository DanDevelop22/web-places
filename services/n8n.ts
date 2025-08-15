// TODO: Configurar n8n
// Este archivo contiene las funciones preparadas para integrar con n8n

const N8N_BASE_URL = process.env.NEXT_PUBLIC_N8N_BASE_URL || 'http://localhost:5678';
const N8N_API_KEY = process.env.NEXT_PUBLIC_N8N_API_KEY || '';

// Interfaces para las peticiones a n8n
export interface ReservationRequest {
  placeId: string;
  placeName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface TicketPurchaseRequest {
  eventId: string;
  eventName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  quantity: number;
  totalPrice: number;
}

export interface ReviewSubmissionRequest {
  placeId: string;
  placeName: string;
  customerName: string;
  rating: number;
  comment: string;
}

// Función para enviar reservas a n8n
export const sendReservationToN8n = async (reservation: ReservationRequest) => {
  try {
    const response = await fetch(`${N8N_BASE_URL}/webhook/reservation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${N8N_API_KEY}`,
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Reservation sent to n8n:', result);
    
    return result;
  } catch (error) {
    console.error('Error sending reservation to n8n:', error);
    throw error;
  }
};

// Función para enviar compras de entradas a n8n
export const sendTicketPurchaseToN8n = async (purchase: TicketPurchaseRequest) => {
  try {
    const response = await fetch(`${N8N_BASE_URL}/webhook/ticket-purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${N8N_API_KEY}`,
      },
      body: JSON.stringify(purchase),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Ticket purchase sent to n8n:', result);
    
    return result;
  } catch (error) {
    console.error('Error sending ticket purchase to n8n:', error);
    throw error;
  }
};

// Función para enviar reseñas a n8n
export const sendReviewToN8n = async (review: ReviewSubmissionRequest) => {
  try {
    const response = await fetch(`${N8N_BASE_URL}/webhook/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${N8N_API_KEY}`,
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Review sent to n8n:', result);
    
    return result;
  } catch (error) {
    console.error('Error sending review to n8n:', error);
    throw error;
  }
};

// Función para notificar nuevos lugares a n8n
export const notifyNewPlaceToN8n = async (place: any) => {
  try {
    const response = await fetch(`${N8N_BASE_URL}/webhook/new-place`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${N8N_API_KEY}`,
      },
      body: JSON.stringify(place),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('New place notification sent to n8n:', result);
    
    return result;
  } catch (error) {
    console.error('Error notifying new place to n8n:', error);
    throw error;
  }
};
