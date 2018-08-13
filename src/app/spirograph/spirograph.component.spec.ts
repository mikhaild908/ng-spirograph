import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpirographComponent } from './spirograph.component';

describe('SpirographComponent', () => {
  let component: SpirographComponent;
  let fixture: ComponentFixture<SpirographComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpirographComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpirographComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
