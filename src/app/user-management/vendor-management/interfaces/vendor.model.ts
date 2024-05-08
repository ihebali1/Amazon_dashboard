import {BusinessAddress} from './business-address'
import { BusinessInfo } from './business-info';
export class VendorModel {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  businessCountry: any;
  adress: any;
  businessType: any;
  businessAdress: BusinessAddress
  businessInfo: BusinessInfo
  businessName: any;
  numberCompany: number;
  businessJurisdiction: any;
  adressLine: string;
  adressLine2: string;
  town: string;
  region: string;
  postalCode: number;
  phone: number;
  favoriteRecieve: string;
  verificationLanguage: any;
  personalCountry: any;
  personalCity: any;
  dateBirth: Date;
  personalCountryBirth: any;
  proofidentity: string;
  dateExpiry: Date;
  checked1: boolean;
  checked2: boolean;
  checked3: boolean;
  numberCreditCard: number;
  nameCard: string;
  monthExpire: number;
  yearExpire: number;
  storeName: string;
  createdAt: string;
  identityFront: any;
  identityBack: any;
  statementDocument: any;
  vendorState: string = "UNVERIFIED" || "VERIFIED" || "SUSPENDED" || "DISABLED";

  constructor(VendorModel) {
    this.id = VendorModel.id;
    this.name = VendorModel.name;
    this.firstName = VendorModel.firstName;
    this.lastName = VendorModel.lastName;
    this.email = VendorModel.email;
    this.businessCountry = VendorModel.businessCountry;
    this.adress = VendorModel.adress;
    this.businessType = VendorModel.businessType;
    this.businessName = VendorModel.businessName;
    this.numberCompany = VendorModel.numberCompany;
    this.businessJurisdiction = VendorModel.businessName;
    this.adressLine = VendorModel.adressLine;
    this.adressLine2 = VendorModel.adressLine2;
    this.town = VendorModel.town;
    this.region = VendorModel.region;
    this.postalCode = VendorModel.postalCode;
    this.phone = VendorModel.phone;
    this.favoriteRecieve = VendorModel.favoriteRecieve;
    this.verificationLanguage = VendorModel.verificationLanguage;
    this.personalCountry = VendorModel.personalCountry;
    this.personalCity = VendorModel.personalCity;
    this.dateBirth = VendorModel.dateBirth;
    this.personalCountryBirth = VendorModel.personalCountryBirth;
    this.proofidentity = VendorModel.proofidentity;
    this.dateExpiry = VendorModel.dateExpiry;
    this.checked1 = VendorModel.checked1;
    this.checked2 = VendorModel.checked2;
    this.checked3 = VendorModel.checked3;
    this.numberCreditCard = VendorModel.numberCreditCard;
    this.nameCard = VendorModel.nameCard;
    this.monthExpire = VendorModel.monthExpire;
    this.yearExpire = VendorModel.yearExpire;
    this.storeName = VendorModel.storeName;
    this.createdAt = VendorModel.createdAt;
    this.identityFront = VendorModel.identityFront;
    this.identityBack = VendorModel.identityBack;
    this.statementDocument = VendorModel.statementDocument;
  }
}
