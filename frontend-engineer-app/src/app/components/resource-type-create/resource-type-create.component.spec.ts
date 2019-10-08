import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTypeCreateComponent } from './resource-type-create.component';

describe('ResourceTypeCreateComponent', () => {
  let component: ResourceTypeCreateComponent;
  let fixture: ComponentFixture<ResourceTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
