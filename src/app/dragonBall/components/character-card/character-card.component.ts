import { TitleCasePipe } from '@angular/common';
import { Character } from './../../interfaces/character-interface';
import { Component, computed, effect, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
  imports:[TitleCasePipe]
})
export class CharacterCardComponent {

  character=input.required<Character>();

  characterProperties = computed(() => {
    return Object.entries(this.character())
    .map(([key,value])=>{return {key,value}})
    .filter((value)=>value.key!='image' && value.key!='deletedAt');
  });

  image = computed(() => {
    return this.character().image;
  });

  // effects=effect(() => {
  //   console.log(this.characterProperties());
    
  // });

}
