export interface IdentityInfo {

    clientId?: number;
    nationalId: string;
    shahabCode: string;
    isAlive: number;
    firstName: string;
    lastName: string;
    fatherName: string;
    birthDate: number; // jalali int YYYYMMDD
    identityNumber: number;
    identityIssueCityId: number;
    identityAlphabeticPart: string; // سری حرفی
    identityNumericPart: number;    // سری عددی
    identitySerial: number;         // سریال
    gender: number;                    // 1=male,2=female
    isInquiryApproved: number;
    birthCountryId: number;
    birthCityId: number;
    identityIssueRegion: number;    // کد حوزه
    identityTypeId: number;
    identityDate: number;           // jalali int YYYYMMDD
    nationalCardSerial: string;
    residenceType: number;
    religionId: number;
    religionDetailId: number;
    maritalStatus: number;
    enFirstName: string;
    enLastName: string;
    enFatherName: string;
    enbirthDate: number;            // jalali int YYYYMMDD
}
export const IDENTITY_INFO_INITIAL: IdentityInfo = {
    clientId: 0,
    nationalId: '',
    shahabCode: '',
    isAlive: 1,
    firstName: '',
    lastName: '',
    fatherName: '',
    birthDate: 0,
    identityNumber: 0,
    identityIssueCityId: 0,
    identityAlphabeticPart: '',
    identityNumericPart: 0,
    identitySerial: 0,
    gender: 1,
    isInquiryApproved: 0,
    birthCountryId: 0,
    birthCityId: 0,
    identityIssueRegion: 0,
    identityTypeId: 0,
    identityDate: 0,
    nationalCardSerial: '',
    residenceType: 0,
    religionId: 0,
    religionDetailId: 0,
    maritalStatus: 0,
    enFirstName: '',
    enLastName: '',
    enFatherName: '',
    enbirthDate: 0,
};
