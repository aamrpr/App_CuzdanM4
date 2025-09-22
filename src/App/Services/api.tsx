import Http from "../Core/Http"

const ApiLoginOrCreateAccount = async (phoneNumber: any) => {
    try {
        let result = await Http.POST('appc/Clients/LoginOrCreateAccount', { phoneNumber: phoneNumber });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiChickPhoneNumberForChangeNumber = async (phoneNumber: any) => {
    try {
        let result = await Http.POST('appc/Clients/ChickPhoneNumberForChangeNumber', { phoneNumber: phoneNumber });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiCheckOTPCode = async (phoneNumber: any, OTPCode: any) => {
    try {
        let result = await Http.POST('appc/Clients/CheckOTPCode', { phoneNumber: phoneNumber, OTPCode: OTPCode });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}
const ApiCheckOTPCodeForChangeNumber = async (phoneNumber: any, OTPCode: any) => {
    try {
        let result = await Http.POST('appc/Clients/CheckOTPCodeForChangeNumber', { phoneNumber: phoneNumber, OTPCode: OTPCode });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiChickToken = async () => {
    try {
        let result = await Http.POST('appc/Clients/CT', {});
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }

}

const ApiGetCountries = async (LangCode: any = 'EN') => {
    try {
        let result = await Http.POST('appc/Clients/GetCountries', { LangCode: LangCode });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiUpdateProfile = async (ParamUpdate = {}) => {
    try {
        let result = await Http.POST('appc/Clients/UpdateProfile', ParamUpdate);
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}


const ApiGetAllUserInfo = async () => {
    try {
        let result = await Http.POST('appc/Clients/GetAllUserInfo', {});
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}


const ApiGenrateQR = async (Type: string, amount?: number) => {
    try {
        //T:transfer تحويل من محفظتي الى محفظة اخرى 
        //R:receive تحويل من محفظة اخرى الى مخفظتي
        let result = await Http.POST('appc/Clients/GenrateQR', { A: amount, T: Type });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiChickQR = async (qr: string) => {
    try {
        let result = await Http.POST('appc/Clients/ChickQR', { qr: qr });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiChickPhoneNumber = async (phoneNumber: string) => {
    try {
        let result = await Http.POST('appc/Clients/ChickPhoneNumber', { phoneNumber: phoneNumber });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiCreateTransaction = async (phoneNumber: string, amount: string, currency: string, description: string, type: 'transfer' | 'deposit' | 'withdrawal' | 'receive') => {
    try {
        let result = await Http.POST('appc/Clients/CreateTransaction', { phoneNumber: phoneNumber, amount: amount, currency: currency, description: description, type: type });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApigetNewNote = async () => {
    try {
        let result = await Http.POST('appc/Clients/getNewNote', {});
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiGetaNewTransaction = async (startDate?: any, endDate?: any, targetName?: string) => {
    try {
        let result = await Http.POST('appc/Clients/GetaNewTransaction', { startDate: startDate, endDate: endDate, targetName: targetName });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiCreateCardPayments = async (name: string, number: string, expiry: string, cvc: string) => {
    try {
        let result = await Http.POST('appc/Clients/CreateCardPayments', { name: name, number: number, expiry: expiry, cvc: cvc });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApigetAllMyCard = async () => {
    try {
        let result = await Http.POST('appc/Clients/getAllMyCard', {});
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiCreateTransactionByCard = async (CardId: string, amount: string, currency: string, type: "walletToCard" | "cardToWallet") => {
    try {
        let result = await Http.POST('appc/Clients/CreateTransactionByCard', { CardId: CardId, amount: amount, currency: currency, type: type });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiLoginByPass = async (pass: any) => {
    try {
        let result = await Http.POST('appc/Clients/LoginByPass', { pass: pass });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}


const ApiCreateRequests = async (qr: string, amount: string) => {
    try {
        let result = await Http.POST('appc/Clients/CreateRequests', { qr: qr, amount: amount });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiGetAllRequest = async () => {
    try {
        let result = await Http.POST('appc/Clients/GetAllRequest', {});
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiApproveRequest = async (id: string) => {
    try {
        let result = await Http.POST('appc/Clients/ApproveRequest', { id: id });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiGetAllTransactionByCards = async () => {
    try {
        let result = await Http.POST('appc/Clients/GetAllTransactionByCards', {});
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiGetMonthlyMaxAmounts = async () => {
    try {
        let result = await Http.POST('appc/Clients/getMonthlyMaxAmounts', {});
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiUpdateImageProfile = async (TempFile: string) => {
    try {
        let result = await Http.POST('appc/Clients/UpdateImageProfile', { TempFile: TempFile });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiRemoveImageProfile = async () => {
    try {
        let result = await Http.POST('appc/Clients/RemoveImageProfile', {});
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}
const ApiUpdatePassword = async (pass: string) => {
    try {
        let result = await Http.POST('appc/Clients/UpdatePassword', { pass: pass });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiCreateOrUpdateInformation = async (CountryCode: string, IDNumber: string, FirstName: string, LastName: string, DateOfBirth: string) => {
    try {
        let result = await Http.POST('appc/Clients/CreateOrUpdateInformation', { CountryCode: CountryCode, IDNumber: IDNumber, FirstName: FirstName, LastName: LastName, DateOfBirth: DateOfBirth });
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}

const ApiGetAllClientInformation = async () => {
    try {
        let result = await Http.POST('appc/Clients/GetAllClientInformation', {});
        return result;
    } catch (error) {
        return { error: 1, data: error };
    }
}
export default { ApiGetAllUserInfo, ApiCreateOrUpdateInformation, ApiGetAllClientInformation, ApiUpdatePassword, ApiCheckOTPCodeForChangeNumber, ApiChickPhoneNumberForChangeNumber, ApiRemoveImageProfile, ApiUpdateImageProfile, ApiGetMonthlyMaxAmounts, ApiGetAllTransactionByCards, ApiApproveRequest, ApiGetAllRequest, ApiCreateRequests, ApiLoginByPass, ApiCreateTransactionByCard, ApigetAllMyCard, ApiGetaNewTransaction, ApiCreateCardPayments, ApigetNewNote, ApiCreateTransaction, ApiUpdateProfile, ApiGetCountries, ApiLoginOrCreateAccount, ApiCheckOTPCode, ApiChickToken, ApiGenrateQR, ApiChickQR, ApiChickPhoneNumber };