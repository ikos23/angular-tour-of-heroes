import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

import { PokemonService } from '../pokemon.service';
import { SearchCriteria } from '../types';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  model = new SearchCriteria();

  constructor(
    private service: PokemonService,
    private messageService: MessageService,
    private router: Router
  ) {}

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.service.getPokemon(this.model.name as string).subscribe((pokemon) => {
      this.messageService.add('SearchComponent: pokemon found.');
      this.router.navigate([`details/${pokemon.id}`]);
    });
  }

  ngOnInit(): void {}
}
