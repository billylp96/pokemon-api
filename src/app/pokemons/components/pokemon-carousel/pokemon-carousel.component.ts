import { Component, effect, input, OnInit, Signal } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export interface ImagenPokemon{
  key?:string,
  value?:any
}

@Component({
  selector: 'app-pokemon-carousel',
  templateUrl: './pokemon-carousel.component.html',
  styleUrls: ['./pokemon-carousel.component.css'],
  styles: `
    .swiper {
      width: 30%;
      height: 50%;
    }
  `,
})
export class PokemonCarouselComponent  {
  pokemonImages=input.required<ImagenPokemon[]>();

  swiperEffect = effect(() => {
    const imgs = this.pokemonImages();
    if (imgs.length === 0) return;

    const swiper = new Swiper('.swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: false,
      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
  )
}
