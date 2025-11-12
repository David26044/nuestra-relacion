export interface Memory {
  id: number;
  date: string;        // Fecha del recuerdo
  title: string;       // Título corto (ej: "Nuestro primer beso")
  shortText: string;   // Texto breve que se muestra en la tarjeta
  longText: string;    // Texto largo (para cuando abramos el modal o detalle)
  photo?: string;      // Ruta de la foto (si existe)
  emoji?: string;      // Emoji si no hay foto
}
