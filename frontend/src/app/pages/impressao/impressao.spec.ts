import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Impressao } from './impressao';

describe('Impressao', () => {
  let component: Impressao;
  let fixture: ComponentFixture<Impressao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Impressao],
    }).compileComponents();

    fixture = TestBed.createComponent(Impressao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
