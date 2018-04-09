import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
/// @Author: Jose Humberto Ibarra Riestra
// Generic Class For Rest Services
export abstract class RestService<TModel> {

    private baseURL = "http://localhost:54659/api/";

    constructor(private http: Http) {}

    findAll(methodUrl: string) : Observable<TModel[]> {
        return this.http.get(this.baseURL + methodUrl)
        .map((response: Response) => {
            return<TModel[]>response.json() as TModel[];
        })
        .catch(this.handleError);
    }


    findAllById(id: number, methodUrl: string) : Observable<TModel[]> {
        return this.http.get(this.baseURL + methodUrl + "/" + id)
        .map((response: Response) => {
            return<TModel[]>response.json() as TModel[];
        })
        .catch(this.handleError);
    }

    findById(id: number, methodUrl: string) : Observable<TModel> {
        return this.http.get(this.baseURL + methodUrl + id)
        .map((response: Response) => {
            return <TModel>response.json() as TModel;
        })
        .catch(this.handleError);
    }

    save(model: TModel, methodUrl: string) : Observable<TModel> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: "POST" });
        let body = JSON.stringify(model);
        return this.http.post(this.baseURL + methodUrl, body, options)
        .map((response: Response) => {
            response.json();
        })
        .catch(this.handleError);
    }

    update(model: TModel, methodUrl: string) : Observable<TModel> {
        return this.http.put(this.baseURL + methodUrl, model)
        .map((response: Response) => {
            response.json();
        })
        .catch(this.handleError);
    }

    delete(id: number, methodUrl: string) : Observable<TModel> {
        return this.http.delete(this.baseURL + methodUrl + id)
        .map((response: Response) => {
            response.json();
        })
        .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.status);
    }
}