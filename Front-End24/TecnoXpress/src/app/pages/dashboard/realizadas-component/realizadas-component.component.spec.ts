import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizadasComponent } from './realizadas-component.component';

describe('RealizadasComponent', () => {
  let component: RealizadasComponent;
  let fixture: ComponentFixture<RealizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
