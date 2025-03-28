export enum MessageType {
  URL_CHANGE = "URL_CHANGE",
  TAB_CHANGE = "TAB_CHANGE",
  HIDE_UI = "HIDE_UI",
  SHOW_UI = "SHOW_UI",
}

export enum MessageFrom {
  CONTENT_SCRIPT = "CONTENT_SCRIPT",
  BACKGROUND = "BACKGROUND",
  SIDE_PANEL = "SIDE_PANEL",
}

class ExtMessage {
  content?: string;
  data?: any;
  from?: MessageFrom;

  constructor(messageType: MessageType) {
    this.messageType = messageType;
  }

  messageType: MessageType;
}

export default ExtMessage;

export interface Review {
  title: string;
  content: string;
  rating: number;
  author: string;
  date: string;
}

export interface DetailedProduct {
  title: string;
  price: string;
  rating: string;
  totalReviews: string;
  images: string[];
  description: string;
  bulletPoints: string[];
  specifications: { [key: string]: string };
  availability: string;
  offers: string[];
  reviews: Review[];
}
