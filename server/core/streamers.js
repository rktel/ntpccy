import { stNTPCCY, stXS, stSRVS, stXSKM } from '../../imports/api/streamers'

// Antapaccay
stNTPCCY.allowRead('all');
stNTPCCY.allowWrite('all');

// Exsa
stXS.allowRead('all');
stXS.allowWrite('all');
// ExsaKm
stXSKM.allowRead('all');
stXSKM.allowWrite('all');

// Servosa
stSRVS.allowRead('all');
stSRVS.allowWrite('all');