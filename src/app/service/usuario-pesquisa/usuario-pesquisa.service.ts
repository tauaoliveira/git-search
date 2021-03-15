import { RepositorioGit } from './../../models/RepositorioGit';
import { GenericService } from 'src/app/commons/generic.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioGit } from 'src/app/models/UsuarioGit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPesquisaService extends GenericService {
  readonly url = environment.urlGit;


  config = new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Accept', 'application/json')

  constructor(
    http: HttpClient) {
     super(http)
    }

  findUserGitByUserName(userGitName: string): Observable<UsuarioGit> {
    return this.getMethod(this.url + `users/${userGitName}`);
  }

  findReposUserGitByUserName(userGitName: string): Observable<Array<RepositorioGit>> {
    return this.getMethod(this.url + `users/${userGitName}/repos`);
  }

  findReposStarUserGitByUserName(userGitName: string): Observable<Array<RepositorioGit>> {
    return this.getMethod(this.url + `users/${userGitName}/starred`);
  }
}
