import { useMapEvents } from "react-leaflet";

interface UseSelectPositionProps {
  onSelectPosition: (coords: [number, number]) => void;
}

export function UseSelectPosition({ onSelectPosition }: UseSelectPositionProps) {
  useMapEvents({
    click(e) {
      const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
      onSelectPosition(coords);
    },
  });

  return null; // não renderiza nada no mapa, só escuta o evento
}
