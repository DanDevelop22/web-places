export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MenuItem {
  name: string;
  description: string;
  price: number;
}

export interface Event {
  title: string;
  date: string;
  time: string;
  description: string;
  ticketPrice: number;
  availableTickets: number;
}

export interface Hours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
  phone?: string;
  email?: string;
}

export interface Place {
  id: string;
  name: string;
  category: 'restaurant' | 'concert' | 'bar';
  address: string;
  coordinates: Coordinates;
  description: string;
  photos: string[];
  rating: number;
  reviews: Review[];
  menu?: MenuItem[];
  event?: Event;
  hours?: Hours;
  socialMedia?: SocialMedia;
}

export interface PlacesData {
  places: Place[];
}

// Props interfaces
export interface MapViewProps {
  places: Place[];
  onPlaceSelect: (place: Place) => void;
  selectedPlace: Place | null;
  userLocation: [number, number] | null;
}

export interface MarkerCustomProps {
  place: Place;
  isSelected: boolean;
  onClick: () => void;
}

export interface SidePanelProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface PhotoCarouselProps {
  photos: string[];
  placeName: string;
}

export interface ReviewSectionProps {
  reviews: Review[];
  placeId: string;
  onAddReview: (placeId: string, review: { rating: number; comment: string }) => void;
}

export interface CategoryIconProps {
  category: 'restaurant' | 'concert' | 'bar';
  className?: string;
}
