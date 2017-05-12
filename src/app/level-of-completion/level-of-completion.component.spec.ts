import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelOfCompletionComponent } from './level-of-completion.component';

describe('LevelOfCompletionComponent', () => {
  let component: LevelOfCompletionComponent;
  let fixture: ComponentFixture<LevelOfCompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelOfCompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelOfCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
