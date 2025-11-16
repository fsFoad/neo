import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiGatewayService {

    private approvalStageObjHub = new BehaviorSubject({
        hubId: null,
        dbEngineId: null,
        driverName: null,
        ip: null,
        portNumber: null,
        objectName: null,
        commandTypeId: null,
        userName: null,
        password: null,
        messageId4X: null,
        messageId5X: null,
        dbNam: null,
        isTestConnection: null,
        isTestQuery: null,
        autoCommit: null,
        canCommit: null,
        isFinal: null,
        dataHubStaticElementDomains: [],
        messageId2X: null});
    currentApprovalStageObjHub = this.approvalStageObjHub.asObservable();

    private approvalStageApiIdSeq = new BehaviorSubject(0);
    currentApprovalStageApiIdSeq = this.approvalStageApiIdSeq.asObservable();

    private approvalStageCode = new BehaviorSubject("");
    currentApprovalStageCode = this.approvalStageCode.asObservable();

    private approvalStageEndpointIdHeader = new BehaviorSubject("");
    currentApprovalStageEndpointIdHeader = this.approvalStageEndpointIdHeader.asObservable();

    private approvalStageEndpoint = new BehaviorSubject("");
    currentApprovalStageEndpoint = this.approvalStageEndpoint.asObservable();

    private approvalStageParty = new BehaviorSubject("");
    currentApprovalStageParty = this.approvalStageParty.asObservable();

    private approvalStageModuleId = new BehaviorSubject("");
    currentApprovalStageModuleId = this.approvalStageModuleId.asObservable();

    private approvalStageModuleObject = new BehaviorSubject({});
    currentApprovalStageModuleObject = this.approvalStageModuleObject.asObservable();

    private approvalStageApiId = new BehaviorSubject({});
    currentApprovalStageApiId = this.approvalStageApiId.asObservable();

    private approvalStageApiName = new BehaviorSubject({});
    currentApprovalStageApiName = this.approvalStageApiName.asObservable();

    private approvalStageRuleId = new BehaviorSubject({});
    currentApprovalStageRuleId = this.approvalStageRuleId.asObservable();

    private approvalStageClientId = new BehaviorSubject('');
    currentApprovalStageClientId = this.approvalStageClientId.asObservable();

    private approvalStageApiUrl = new BehaviorSubject({});
    currentApprovalStageApiUrl = this.approvalStageApiUrl.asObservable();


    private approvalStageClientObject= new BehaviorSubject({
        clientId: null,name:"",apikey:"",mobileNo:"",baseClientFlag:null
    });
    currentApprovalStageClientObject = this.approvalStageClientObject.asObservable();

    private approvalStageRequestlogid= new BehaviorSubject("");
    currentApprovalStageRequestlogid = this.approvalStageRequestlogid.asObservable();

   /* private approvalStageDetailsBreadObject= new BehaviorSubject([]);
    currentApprovalStageDetailsBreadObject = this.approvalStageDetailsBreadObject.asObservable();
*/
    private approvalStageDetailsBreadObject = new BehaviorSubject<any[]>([]);
    currentApprovalStageDetailsBreadObject = this.approvalStageDetailsBreadObject.asObservable();


    private approvalStagemoduleBase= new BehaviorSubject([]);
    currentApprovalStagemoduleBase = this.approvalStagemoduleBase.asObservable();

    private approvalStageFoad= new BehaviorSubject([]);
    currentApprovalStageFoad = this.approvalStageFoad.asObservable();

    private approvalStageApiType = new BehaviorSubject(0);
    currentApprovalStageApiType = this.approvalStageApiType.asObservable();

    private selectedApisSource = new BehaviorSubject<any[]>([]);
    selectedApis$ = this.selectedApisSource.asObservable();

    private cacheConfigSource = new BehaviorSubject<any>(null);
    cacheConfig$ = this.cacheConfigSource.asObservable();

    private CacheToCacheListSource = new Subject<any>();
    CacheToCacheListSource$ = this.CacheToCacheListSource.asObservable();

    private resetApisCache = new Subject<void>();
    resetApisCache$ = this.resetApisCache.asObservable();

    private fillForUpdate = new BehaviorSubject<any>(null);
    cacheListToUpdateData$ = this.fillForUpdate.asObservable();

    private fillForUpdateCacheConfig = new BehaviorSubject<any>(null);
    fillForUpdateCacheConfig$ = this.fillForUpdateCacheConfig.asObservable();

    private disableTableSubject = new BehaviorSubject<boolean>(true); // ابتدا غیرفعال است
    disableTable$ = this.disableTableSubject.asObservable();

    private selectionEmptySubject = new Subject<boolean>();
    selectionEmpty$ = this.selectionEmptySubject.asObservable();

    private changeActiveCalledSource = new Subject<any>();
    changeActiveCalled$ = this.changeActiveCalledSource.asObservable();

    constructor() {

    }
    updateApprovalObjHub(hub: any) {
        this.approvalStageObjHub.next(hub)
    }
    updateApprovalEndpointIdHeader(code: string) {
        this.approvalStageEndpointIdHeader.next(code)
    }
    updateApprovalApiIdSeq(apiId: number) {
        this.approvalStageApiIdSeq.next(apiId)
    }
    updateApprovalEndpointIdClient(code: string) {
        this.approvalStageCode.next(code)
    }
    updateApprovalEndpoint(temp: any) {
        this.approvalStageEndpoint.next(temp)
    }
    updateApprovalParty(temp: any) {
        this.approvalStageParty.next(temp)
    }
    updateApprovalModuleId(temp: any) {
        this.approvalStageModuleId.next(temp)
    }
    updateApprovalModuleObject(temp: any) {
        this.approvalStageModuleObject.next(temp)
    }
    updateApprovalmoduleBase(temp: any) {
        this.approvalStagemoduleBase.next(temp)
    }
    updateApprovalApiId(temp: any) {
        this.approvalStageApiId.next(temp)
    }
    updateApprovalApiName(temp: any) {
        this.approvalStageApiName.next(temp)
    }
    updateApprovalApiUrl(temp: any) {
        this.approvalStageApiUrl.next(temp)
    }
    updateApprovalRuleId(temp: any) {
        this.approvalStageRuleId.next(temp)
    }
    updateApprovalClientId(temp: any) {
        this.approvalStageClientId.next(temp)
    }
    updateApprovalClientObject(temp: any) {
        this.approvalStageClientObject.next(temp)
    }
    updateApprovalRequestlogid(temp: any) {
        debugger
        this.approvalStageRequestlogid.next(temp)
    }
    /*updateApprovalDetailsBreadObject(temp: any) {
        this.approvalStageDetailsBreadObject.next(temp)
    }*/
    updateApprovalDetailsBreadObject(data: any): void {
      /*  const breadcrumbObjects = data.map((item: any) => new BreadcrumbService(item));  // تبدیل داده‌ها به شی Breadcrumb
        this.approvalStageDetailsBreadObject.next(breadcrumbObjects);  // ارسال داده‌ها به اشتراک
   */ if (data && Array.isArray(data)) {
            this.approvalStageDetailsBreadObject.next(data);
        } else {
            console.error('Received data is not valid:', data);
        }
    }
    updateApprovalFoad(temp: any) {
        this.approvalStageFoad.next(temp)
    }
    updateApprovalApiType(temp: number) {
        this.approvalStageApiType.next(temp)
    }
    updateSelectedApis(data: any[]) {
        this.selectedApisSource.next(data);
    }

    updateCacheConfig(config: any) {
        this.cacheConfigSource.next(config);
    }
    getSelectedApisSource() {
        return this.selectedApisSource.value;
    }

    getCacheConfigSource() {
        return this.cacheConfigSource.value;
    }
    sendCachToCachelist() {
        const payload = {
            SelectedApisSource: this.getSelectedApisSource(),
            CacheConfig: this.getCacheConfigSource()
        };
        console.log("🚀 payload sent to CacheToCacheListSource:", {
            SelectedApisSource: this.getSelectedApisSource(),
            CacheConfig: this.getCacheConfigSource()
        });
        this.CacheToCacheListSource.next(payload);

    }

    resetApisCacheTriggerReset() {
        this.resetApisCache.next();
    }

    sendCacheToUpdateApiData(data: any) {
        debugger
        this.fillForUpdate.next(data);
    }
    sendCacheToUpdateConfigData(data: any) {
        debugger
        this.fillForUpdateCacheConfig.next(data);
    }

    setDisableTable(value: boolean) {
        this.disableTableSubject.next(value);
    }

    sendSelectionEmptyStatus(isEmpty: boolean) {
        this.selectionEmptySubject.next(isEmpty);
    }
    sendChangeActive(cache: any) {
        this.changeActiveCalledSource.next(cache);
    }
}
