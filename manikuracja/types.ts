export interface IService {
  flatten_name: string;
  real_name: string;
  price: number;
  duration: number;
  description: string;
  isCustomService: boolean;
}
export interface Payment {
  amount: number;
  date: string;
  result: string;
}
export type PortfolioImage = {
  src: string;
  text: string;
};
export type User = {
  uid: string;
  name: string;
  email: string;
  description: string;
  logo: string;

  seek: boolean;
  emailVerified: boolean;
  configured: boolean;
  active: boolean;
  profileComments: string[];
  password: string;

  portfolioImages: PortfolioImage[];
  payments: Payment[];
  services: IService[];
  location: { lng: number; lat: number; address: string };
  phoneNumber: string;
};

export interface ICity {
  id: string;
  name: string;
  Type: string;
}
export type PostSample = {
  url: string;
  id: string;
  type: string;
  title: string;
  shortDesc: string;
  tags: string;
  image: string;
  text1Title: string;
  text1Desc: string;
  text2Title: string;
  text2Desc: string;
  text3Title: string;
  text3Desc: string;
  text4Title: string;
  text4Desc: string;
  text5Title: string;
  text5Desc: string;
  text6Title: string;
  text6Desc: string;
  text7Title: string;
  text7Desc: string;
};

export type Place = {
  business_status: "OPERATIONAL";
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photos: any[];
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: {
    open_now: boolean;
    periods?: {
      close: {
        day: number;
        time: string;
      };
      open: {
        day: number;
        time: string;
      };
    }[];
    weekday_text?: string[];
  };
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
};
