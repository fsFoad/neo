import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import { MainInfoActions } from './identity-information.actions';
import { IdentityInfo } from '../../domain/models/identity-info.model';

export const mainInfoFeatureKey = 'citizenMainInfo';

// State = Required (بدون فیلد اختیاری)
export type MainInfoState = Readonly<Required<IdentityInfo>>;

// ❶ نرمال‌ساز: دامین ناقص => State کامل
export function ensureIdentityDefaults(src?: Partial<IdentityInfo>): MainInfoState {
    const s = src ?? {};
    return {
        clientId: s.clientId ?? 0,
        nationalId: s.nationalId ?? '',
        shahabCode: s.shahabCode ?? '',
        isAlive: s.isAlive ?? 1,
        firstName: s.firstName ?? '',
        lastName: s.lastName ?? '',
        fatherName: s.fatherName ?? '',
        birthDate: s.birthDate ?? 0,
        identityNumber: s.identityNumber ?? 0,
        identityIssueCityId: s.identityIssueCityId ?? 0,
        identityAlphabeticPart: s.identityAlphabeticPart ?? '',
        identityNumericPart: s.identityNumericPart ?? 0,
        identitySerial: s.identitySerial ?? 0,
        gender: s.gender ?? 1,
        isInquiryApproved: s.isInquiryApproved ?? 0,
        birthCountryId: s.birthCountryId ?? 0,
        birthCityId: s.birthCityId ?? 0,
        identityIssueRegion: s.identityIssueRegion ?? 0,
        identityTypeId: s.identityTypeId ?? 0,
        identityDate: s.identityDate ?? 0,
        nationalCardSerial: s.nationalCardSerial ?? '',
        residenceType: s.residenceType ?? 0,
        religionId: s.religionId ?? 0,
        religionDetailId: s.religionDetailId ?? 0,
        maritalStatus: s.maritalStatus ?? 0,
        enFirstName: s.enFirstName ?? '',
        enLastName: s.enLastName ?? '',
        enFatherName: s.enFatherName ?? '',
        enbirthDate: s.enbirthDate ?? 0,
    };
}

// ❷ initialState کاملاً پر (با defaults)
export const initialState: MainInfoState = ensureIdentityDefaults();

// ❸ reducer همیشه خروجی نهایی را normalize می‌کند
const reducer = createReducer(
    initialState,
    on(MainInfoActions.patch, (s, { changes }) => ensureIdentityDefaults({ ...s, ...changes })),
    on(MainInfoActions.reset, () => initialState),
    on(MainInfoActions.loadSuccess, (_, { data }) => ensureIdentityDefaults(data)),
);

export const mainInfoFeature = createFeature({
    name: mainInfoFeatureKey,
    reducer,
    extraSelectors: ({ selectCitizenMainInfoState }) => ({
        // سِلِکتورهای کامل (بدون ...)
        selectCitizenMainInfoState,
        selectClientId:              createSelector(selectCitizenMainInfoState, s => s.clientId),
        selectNationalId:            createSelector(selectCitizenMainInfoState, s => s.nationalId),
        selectShahabCode:            createSelector(selectCitizenMainInfoState, s => s.shahabCode),
        selectIsAlive:               createSelector(selectCitizenMainInfoState, s => s.isAlive),
        selectFirstName:             createSelector(selectCitizenMainInfoState, s => s.firstName),
        selectLastName:              createSelector(selectCitizenMainInfoState, s => s.lastName),
        selectFatherName:            createSelector(selectCitizenMainInfoState, s => s.fatherName),
        selectBirthDate:             createSelector(selectCitizenMainInfoState, s => s.birthDate),
        selectIdentityNumber:        createSelector(selectCitizenMainInfoState, s => s.identityNumber),
        selectIdentityIssueCityId:   createSelector(selectCitizenMainInfoState, s => s.identityIssueCityId),
        selectIdentityAlphabeticPart:createSelector(selectCitizenMainInfoState, s => s.identityAlphabeticPart),
        selectIdentityNumericPart:   createSelector(selectCitizenMainInfoState, s => s.identityNumericPart),
        selectIdentitySerial:        createSelector(selectCitizenMainInfoState, s => s.identitySerial),
        selectGender:                createSelector(selectCitizenMainInfoState, s => s.gender),
        selectIsInquiryApproved:     createSelector(selectCitizenMainInfoState, s => s.isInquiryApproved),
        selectBirthCountryId:        createSelector(selectCitizenMainInfoState, s => s.birthCountryId),
        selectBirthCityId:           createSelector(selectCitizenMainInfoState, s => s.birthCityId),
        selectResidenceType:         createSelector(selectCitizenMainInfoState, s => s.residenceType),
        selectIdentityIssueRegion:   createSelector(selectCitizenMainInfoState, s => s.identityIssueRegion),
        selectIdentityTypeId:        createSelector(selectCitizenMainInfoState, s => s.identityTypeId),
        selectIdentityDate:          createSelector(selectCitizenMainInfoState, s => s.identityDate),
        selectNationalCardSerial:    createSelector(selectCitizenMainInfoState, s => s.nationalCardSerial),
        selectReligionId:            createSelector(selectCitizenMainInfoState, s => s.religionId),
        selectReligionDetailId:      createSelector(selectCitizenMainInfoState, s => s.religionDetailId),
        selectMaritalStatus:         createSelector(selectCitizenMainInfoState, s => s.maritalStatus),
        selectEnFirstName:           createSelector(selectCitizenMainInfoState, s => s.enFirstName),
        selectEnLastName:            createSelector(selectCitizenMainInfoState, s => s.enLastName),
        selectEnFatherName:          createSelector(selectCitizenMainInfoState, s => s.enFatherName),
        selectEnBirthDate:           createSelector(selectCitizenMainInfoState, s => s.enbirthDate),

        selectFullName:              createSelector(selectCitizenMainInfoState, s => [s.firstName, s.lastName].filter(Boolean).join(' ')),
        selectIsMale:                createSelector(selectCitizenMainInfoState, s => s.gender === 1),
        selectHasNationalId:         createSelector(selectCitizenMainInfoState, s => !!(s.nationalId && s.nationalId.length === 10)),
        selectHasIdentityInfo:       createSelector(selectCitizenMainInfoState, s => !!(s.identityNumber || s.identitySerial || s.identityAlphabeticPart || s.identityNumericPart)),
    }),
});
