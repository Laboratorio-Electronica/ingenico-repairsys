import { text } from "stream/consumers";

export const profile = {
  hero: {
    title: '',
    subtitle: '',
    cta: '',

    quote: {
      text: '',
      author: ''
    }
  }
};

export type ProfileLocale = typeof profile;