import {Tva} from "./tva";
import {Gain} from "./gain";
import {Subscription} from "./subscription";
import {Shipping} from "./shipping";


export interface Settings{
  tva?: Tva[];
  gain?: Gain;
  subscription?: Subscription[];
  shipping?: Shipping[];
}
