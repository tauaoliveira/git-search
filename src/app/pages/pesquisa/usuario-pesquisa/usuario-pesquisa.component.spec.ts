import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { ToasterService } from 'angular2-toaster';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { UsuarioPesquisaComponent } from './usuario-pesquisa.component';
import { UsuarioPesquisaService } from 'src/app/service/usuario-pesquisa/usuario-pesquisa.service';
import { UsuarioGitMock } from 'src/app/models/mocks/UsuarioGitMock';


describe('UsuarioPesquisaComponent', () => {
  let component: UsuarioPesquisaComponent;
  let fixture: ComponentFixture<UsuarioPesquisaComponent>;
  const toasterServiceSpy = jasmine.createSpyObj('Toaster', ['pop']);
  let usuarioPesquisaServiceSpy: UsuarioPesquisaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        UsuarioPesquisaService,
        { provide: ToasterService, useValue: toasterServiceSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(UsuarioPesquisaComponent);
    component = fixture.componentInstance;
    usuarioPesquisaServiceSpy = TestBed.inject(UsuarioPesquisaService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('buscarUsuarioGit deve chamar o findUserGitByUserName do service', () => {
    component.userNameGit = 'tauaOliveira';
    spyOn(usuarioPesquisaServiceSpy, 'findUserGitByUserName').and.returnValue(Observable.of(new UsuarioGitMock()));
    component.buscarUsuarioGit();
    expect(usuarioPesquisaServiceSpy.findUserGitByUserName).toHaveBeenCalled(); // metodo foi chamado
    expect(component.userGit).toBeTruthy(); // usuario foi criado após retorno do metodo corretamente
  });

  it('buscarUsuarioGit deve chamar o toaster após findUserGitByUserName do service retornar error', () => {
    component.userNameGit = 'tauaOliveira';
    spyOn(usuarioPesquisaServiceSpy, 'findUserGitByUserName').and.returnValue(Observable.throwError({}));
    component.buscarUsuarioGit();
    expect(usuarioPesquisaServiceSpy.findUserGitByUserName).toHaveBeenCalled(); // metodo foi chamado
    expect(component.userGit).toBeFalsy(); // usuario não foi criado após erro do service
    expect(toasterServiceSpy.pop).toHaveBeenCalled(); // toaster com mensagem de erro foi chamado
  });

});
