import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { Image, ImagesCarouselComponent } from '../../../shared/components/images-carousel/images-carousel.component';
import { PokemonNamePipe } from "../../pipes/pokemon-name.pipe";
import { PokemonTypeColorPipe } from "../../pipes/pokemon-type-color.pipe";
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-view-card',
  templateUrl: './pokemon-view-card.component.html',
  styleUrls: ['./pokemon-view-card.component.css'],
  imports: [ImagesCarouselComponent, PokemonNamePipe, PokemonTypeColorPipe,TitleCasePipe
    ,CommonModule
  ]
})
export class PokemonViewCardComponent {
 private service = inject(PokemonService);
  private activatedRoute = inject(ActivatedRoute);
  private audio=new Audio();

  pokemonName = toSignal(
    this.activatedRoute.paramMap.pipe(
      map((params) => {
        return params.get("name") ?? 'bulbasaur'
      })
    ),
  );

  pokemonResource = rxResource({
    params: () => ({ pokemonName: this.pokemonName() }),
    stream: ({ params }) => this.service.getPokemonByName(params.pokemonName!)
  })

  effects = effect(() => {
      
    }
  );

  playCry(url: string | undefined) {
    if(url){
      this.audio.pause()
      this.audio.src=url;
      this.audio.currentTime=0;
      this.audio.play().catch(()=>{console.log("No se pudo reproducir el audio");})
    }
  }

  pokemonImages = computed(() => {
    const data = this.pokemonResource.value();
    if (!data || !data.sprites) return [];

    return Object.entries(data.sprites)
      .filter(([_, value]) => value !== null)
      .map(([key, value]): Image => ({ key, value }))
    //.map(([key, value]) => ({ key, value } as ImagenPokemon)) //forma directa 
    // .map(({key,value}) => {
    //   let imagen :ImagenPokemon={ 
    //   key,
    //   value
    //   }
    //   return imagen
    // })
  });

  /**📌Object.entries() convierte un objeto así:
     * sprites: {
    front_default: "url1",
    front_shiny: "url2",
    back_default: null
  }
    en un arreglo así:
    [
    ["front_default", "url1"],
    ["front_shiny", "url2"],
    ["back_default", null]

    luego al mapearlo a objetos:
    [
      {"front_default":"www:url/image1.jpg"},
      {"back_default":"www:url/image2.jpg"},
      {"male_default":"www:url/image3.jpg"},
      {"female_default":"www:url/image4.jpg"},
    ]
  ]


   */




}
