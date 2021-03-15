import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { ToasterService } from 'angular2-toaster';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { UsuarioPesquisaService } from 'src/app/service/usuario-pesquisa/usuario-pesquisa.service';
import { ReposDialogComponent } from './reposDialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepositorioGitMock } from 'src/app/models/mocks/RepositorioGitMock';


fdescribe('ReposDialogComponent', () => {
  let component: ReposDialogComponent;
  let fixture: ComponentFixture<ReposDialogComponent>;
  const toasterServiceSpy = jasmine.createSpyObj('Toaster', ['pop']);
  let usuarioPesquisaServiceSpy: UsuarioPesquisaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        UsuarioPesquisaService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: ToasterService, useValue: toasterServiceSpy },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ReposDialogComponent);
    component = fixture.componentInstance;
    usuarioPesquisaServiceSpy = TestBed.inject(UsuarioPesquisaService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init chama buscarRepositoriosEstrelados e findReposStarUserGitByUserName quando isStarred true ', () => {
    spyOn(component, 'buscarRepositoriosEstrelados').and.callThrough();
    const listaRepositorios = new Array<RepositorioGitMock>();
    listaRepositorios.push(new RepositorioGitMock());
    spyOn(usuarioPesquisaServiceSpy, 'findReposStarUserGitByUserName').and.returnValue(Observable.of(listaRepositorios));
    component.data.isStarred = true;
    component.ngOnInit();
    expect(component.buscarRepositoriosEstrelados).toHaveBeenCalled();
    expect(usuarioPesquisaServiceSpy.findReposStarUserGitByUserName).toHaveBeenCalled();
  });

  it('init chama buscarRepositorios e findReposUserGitByUserName quando isStarred false', () => {
    spyOn(component, 'buscarRepositorios').and.callThrough();
    const listaRepositorios = new Array<RepositorioGitMock>();
    listaRepositorios.push(new RepositorioGitMock());
    spyOn(usuarioPesquisaServiceSpy, 'findReposUserGitByUserName').and.returnValue(Observable.of(listaRepositorios));
    component.data.isStarred = false;
    component.ngOnInit();
    expect(component.buscarRepositorios).toHaveBeenCalled();
    expect(usuarioPesquisaServiceSpy.findReposUserGitByUserName).toHaveBeenCalled();
  });

  it('findReposStarUserGitByUserName deve chamar o toaster ao retornar error', () => {
    spyOn(usuarioPesquisaServiceSpy, 'findReposStarUserGitByUserName').and.returnValue(Observable.throwError({}));
    component.buscarRepositoriosEstrelados('nome');
    expect(toasterServiceSpy.pop).toHaveBeenCalled();
  });

  it('findReposUserGitByUserName deve chamar o toaster ao retornar error', () => {
    spyOn(usuarioPesquisaServiceSpy, 'findReposUserGitByUserName').and.returnValue(Observable.throwError({}));
    component.buscarRepositorios('nome');
    expect(toasterServiceSpy.pop).toHaveBeenCalled();
  });

});
