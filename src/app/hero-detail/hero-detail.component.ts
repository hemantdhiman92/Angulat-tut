import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() eachHero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }


  getHero(): void{
      const id = +this.route.snapshot.paramMap.get('id')!;
      this.heroService.getHero(id)
      .subscribe((h)=> this.eachHero = h);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.eachHero!)
      .subscribe(() => this.goBack());
  }

  ngOnInit(): void {
    this.getHero();
  }

}
