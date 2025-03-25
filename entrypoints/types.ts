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
  comment: string;
  rating: number;
}
