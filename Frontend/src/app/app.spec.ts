import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
// Corrected import statement
import { AppComponent } from './app.component';

describe('AppComponent', () => { // It's good practice to name the test suite after the component
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        AppComponent // Use the corrected component name
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // Use the corrected component name
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent); // Use the corrected component name
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, jobapp-ui');
  });
});
