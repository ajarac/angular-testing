import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { of } from 'rxjs';

import { HeroService } from './../hero.service';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
	let fixture: ComponentFixture<HeroDetailComponent>, mockActivatedRoute, mockHeroService, mockLocation;

	beforeEach(() => {
		mockHeroService = jasmine.createSpyObj([ 'getHero', 'updateHero' ]);
		mockLocation = jasmine.createSpyObj([ 'back' ]);
		mockActivatedRoute = {
			snapshot: {
				paramMap: {
					get: () => {
						return '3';
					}
				}
			}
		};

		TestBed.configureTestingModule({
			imports: [ FormsModule ],
			declarations: [ HeroDetailComponent ],
			providers: [
				{ provide: ActivatedRoute, useValue: mockActivatedRoute },
				{ provide: HeroService, useValue: mockHeroService },
				{ provide: Location, useValue: mockLocation }
			]
		});
		fixture = TestBed.createComponent(HeroDetailComponent);
		mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100 }));
	});

	it('should render hero name in a h2 tag', () => {
		fixture.detectChanges();

		expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
	});

	it(
		'should call updateHero when save is called',
		fakeAsync(() => {
			mockHeroService.updateHero.and.returnValue(of({}));
			fixture.detectChanges();

			fixture.componentInstance.save();
			flush();
			expect(mockHeroService.updateHero).toHaveBeenCalled();
		})
	);

	/*
	it(
		'should call updateHero when save is called',
		async(() => {
			mockHeroService.updateHero.and.returnValue(of({}));
			fixture.detectChanges();

			fixture.componentInstance.save();

			fixture.whenStable().then(() => {
				expect(mockHeroService.updateHero).toHaveBeenCalled();
			});
		})
  );*/
});
