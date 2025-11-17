import { JobInfoList } from './job-info-List.model';
import { ScopWorkList } from './scope-work-List.model';

export interface ActivityInfo {
    scopWorkList: ScopWorkList[];
    jobInfoList: JobInfoList[];
}
