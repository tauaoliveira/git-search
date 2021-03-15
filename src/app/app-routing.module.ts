import { UsuarioPesquisaComponent } from './pages/pesquisa/usuario-pesquisa/usuario-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: ':userName', component: UsuarioPesquisaComponent },
  { path: '**', component: UsuarioPesquisaComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: []
})
export class AppRoutingModule {

}

