/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListCaractersByComponent } from './list-caracters-by.component';

describe('ListCaractersByComponent', () => {
  let component: ListCaractersByComponent;
  let fixture: ComponentFixture<ListCaractersByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCaractersByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCaractersByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
