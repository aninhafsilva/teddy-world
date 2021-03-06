import { CreditCard } from "./card";
import { Devolution } from "./devolution";
import { Teddy } from "./Teddy";

export interface Customer {
  id?: number;
  createdAt?: string;
  deletedAt?: string;
  fullName?: string;
  birthDate?: string;
  email?: string;
  cpf?: string;
  telNumber?: string;
  gender?: number;
  addressList?: Array<Address>;
  creditCardList?: Array<CreditCard>;
  cart?: {
    itemDTOS: Array<{
      teddyItemDTO: {
        id?: string;
        image?: string;
        title?: string;
        subtile?: string;
        priceReal?: number;
        priceFactory?: number;
        size?: string;
        amountAvailable?: number;
      };
      amount: number;
      id?: number;
    }>;
  };
  ordersDTOS?: Array<{
    id: number;
    createdAt: null;
    deletedAt: null;
    deliveryDate: null;
    total: number;
    shippingTax: number;
    status: string;
    itemList: [
      {
        id: number;
        createdAt: string;
        updatedAt: string;
        teddy: Teddy;
        amount: number;
      }
    ];
    hasDevolution?: boolean;
  }>;
  devolutions?: Array<Devolution>;
  wallet?: {
    id?: string;
    value: number;
  };
}

export interface Address {
  id?: string;
  postalCode: string;
  street: string;
  complement: string;
  number: string;
  state: string;
  city: string;
  neighborhood: string;
  country: string;
  addressType: AddressType;
  customer: {
    id: number;
  };
}

export enum AddressType {
  BILLING = 0,
  DELIVERY = 1,
}
