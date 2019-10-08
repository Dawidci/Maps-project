import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTypeUpdateComponent } from './resource-type-update.component';

describe('ResourceTypeUpdateComponent', () => {
  let component: ResourceTypeUpdateComponent;
  let fixture: ComponentFixture<ResourceTypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
