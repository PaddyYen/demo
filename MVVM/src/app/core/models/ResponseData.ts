export class ResponseData {
    success: boolean;
    message:string;
    errorMessage:string;
    data: any;
    total: number;
    code: number;

    constructor (response : ResponseData = {} as ResponseData) {
        this.success = response.success
        this.message = response.message
        this.errorMessage = response.errorMessage
        this.data = response.data
        this.total = response.total
        this.code = response.code
    }
}
