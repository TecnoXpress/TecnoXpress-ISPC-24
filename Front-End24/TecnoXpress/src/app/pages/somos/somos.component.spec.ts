import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomosComponent } from './somos.component';

describe('SomosComponent', () => {
  let component: SomosComponent;
  let fixture: ComponentFixture<SomosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SomosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SomosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
