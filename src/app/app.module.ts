import { ReposDialogComponent } from 'src/app/dialogs/reposDialog/reposDialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './pages/template/header/header.component';
import { UsuarioPesquisaComponent } from './pages/pesquisa/usuario-pesquisa/usuario-pesquisa.component';
import { ToasterModule } from 'angular2-toaster';
import { BlockUIModule } from 'ng-block-ui';
import { UsuarioPesquisaService } from './service/usuario-pesquisa/usuario-pesquisa.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntlGerman } from './pages/table-format-page/mat-paginator-int';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsuarioPesquisaComponent,
    ReposDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatTableModule,
    ToasterModule.forRoot(),
    BlockUIModule.forRoot()
  ],
  providers: [UsuarioPesquisaService,{ provide: MatPaginatorIntl, useClass: forwardRef(() => MatPaginatorIntlGerman), },],
  bootstrap: [AppComponent]
})
export class AppModule { }
