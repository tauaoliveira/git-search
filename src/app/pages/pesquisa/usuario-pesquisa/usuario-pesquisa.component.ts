import { UsuarioGit } from './../../../models/UsuarioGit';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UsuarioPesquisaService } from 'src/app/service/usuario-pesquisa/usuario-pesquisa.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReposDialogComponent } from 'src/app/dialogs/reposDialog/reposDialog.component';



@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.scss']
})
export class UsuarioPesquisaComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    public router: Router,
    private usuarioPesquisaService: UsuarioPesquisaService,
    private toasterService: ToasterService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public activatedRoute: ActivatedRoute) { }

  pesquisaUsuarioFormControl = this.formBuilder.group({
    userNameGit: new FormControl('', Validators.required),
  });

  userNameGit: string;
  userGit: UsuarioGit;

  ngOnInit(): void {
    this.userNameGit = (this.router.url === '/' || this.router.url === '/#/') ? undefined : this.router.url.replace(/[\/|\/#\/]/g, '');

    if (this.userNameGit) {
      this.buscarUsuarioGit();
    }

  }

  buscarUsuarioGit(): void {
    if (this.pesquisaUsuarioFormControl.valid || this.userNameGit) {
      this.blockUI.start();
      this.usuarioPesquisaService.findUserGitByUserName(this.userNameGit)
        .subscribe(retorno => {
          this.userGit = retorno;
          this.blockUI.stop();
        }, error => {
          this.blockUI.stop();
          this.toasterService.pop('error', 'Erro ao buscar usuário.');
        });
    }
  }

  abrirDialogRepositorios(userNameGit: string, isStarred: boolean): void {
    this.dialog.open(ReposDialogComponent, {
      width: '850px',
      data: {
        userNameGit: userNameGit,
        isStarred: isStarred
      }
    });
  }



}
