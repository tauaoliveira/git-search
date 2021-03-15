import { RepositorioGit } from './../../models/RepositorioGit';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioPesquisaService } from 'src/app/service/usuario-pesquisa/usuario-pesquisa.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToasterService } from 'angular2-toaster';

export interface DialogData {
  userNameGit: string;
  isStarred: boolean;
}


@Component({
  selector: 'app-reposDialog',
  templateUrl: './reposDialog.component.html',
  styleUrls: ['./reposDialog.component.css']
})
export class ReposDialogComponent implements OnInit {

  constructor(
    private usuariGitService: UsuarioPesquisaService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<ReposDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  @BlockUI() blockUI: NgBlockUI;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<RepositorioGit>;

  columnDefinitions = [
    { def: 'nome', label: 'Nome', hide: false },
    { def: 'url', label: 'Url', hide: false },
    { def: 'usuario', label: 'Usuário', hide: false },
    { def: 'descricao', label: 'Descrição', hide: false }
  ];

  columns = this.columnDefinitions.filter(cd => !cd.hide).map(cd => cd.def);

  ngOnInit(): void {
    if (this.data.isStarred) {
      this.buscarRepositoriosEstrelados(this.data.userNameGit);
    } else {
      this.buscarRepositorios(this.data.userNameGit);
    }
  }

  buscarRepositorios(userNameGit: string): void {
    this.blockUI.start();
    this.usuariGitService.findReposUserGitByUserName(userNameGit)
      .subscribe(retorno => {
        this.initTable(retorno);
        this.blockUI.stop();
      }, error => {
        this.blockUI.stop();
        this.toasterService.pop('error', 'Erro ao buscar repositórios.');
      });
  }

  buscarRepositoriosEstrelados(userNameGit: string): void {
    this.blockUI.start();
    this.usuariGitService.findReposStarUserGitByUserName(userNameGit)
      .subscribe(retorno => {
        this.initTable(retorno);
        this.blockUI.stop();
      }, error => {
        this.blockUI.stop();
        this.toasterService.pop('error', 'Erro ao buscar repositórios.');
      });
  }


  initTable(listaRepositorios: Array<RepositorioGit>): void {
    console.log(listaRepositorios);
    this.dataSource = new MatTableDataSource(listaRepositorios);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.data.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    this.dataSource._updateChangeSubscription();

  }

  voltar(): void {
    this.dialogRef.close();
  }
}
