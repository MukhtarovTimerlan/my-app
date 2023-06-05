import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiUrl = 'https://localhost:7237/api';
  public accessToken: string= '';;
  helper = new JwtHelperService();
  public decodedToken: any;
  constructor(private http:HttpClient) { }
  public login(login: string, password: string): Observable<boolean> {
    const authData = { login, password };
    return this.http.post<string>(`${this.apiUrl}/Auth`, authData)
        .pipe(
            tap(token => {
                localStorage.setItem("jwt", token);
                this.accessToken = token;
                this.decodedToken = this.helper.decodeToken(token);
            }),
            map(()=>true)
        );
}
public logout() {
  localStorage.removeItem("jwt");
}
}
